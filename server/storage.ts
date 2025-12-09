import { 
  type User, type InsertUser, 
  type Collection, type InsertCollection,
  type Product, type InsertProduct,
  type CartItem, type InsertCartItem,
  type Order, type InsertOrder,
  type OrderItem, type InsertOrderItem,
  type Banner, type InsertBanner,
  users, collections, products, cartItems, orders, orderItems, banners
} from "@shared/schema";
import { db } from "./db";
import { eq, and, ilike, or, desc, asc, sql } from "drizzle-orm";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Collections
  getCollections(): Promise<Collection[]>;
  getCollection(id: number): Promise<Collection | undefined>;
  getCollectionBySlug(slug: string): Promise<Collection | undefined>;
  createCollection(collection: InsertCollection): Promise<Collection>;
  updateCollection(id: number, collection: Partial<InsertCollection>): Promise<Collection | undefined>;
  deleteCollection(id: number): Promise<boolean>;
  
  // Products
  getProducts(options?: { category?: string; isNew?: boolean; onSale?: boolean; search?: string }): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;
  
  // Cart
  getCartItems(sessionId: string): Promise<(CartItem & { product: Product })[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: number, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: number): Promise<boolean>;
  clearCart(sessionId: string): Promise<boolean>;
  
  // Orders
  getOrders(): Promise<Order[]>;
  getOrder(id: number): Promise<Order | undefined>;
  getOrderByNumber(orderNumber: string): Promise<Order | undefined>;
  createOrder(order: InsertOrder, items: Omit<InsertOrderItem, 'orderId'>[]): Promise<Order>;
  updateOrderStatus(id: number, status: string): Promise<Order | undefined>;
  
  // Banners
  getBanners(type?: string): Promise<Banner[]>;
  getBanner(id: number): Promise<Banner | undefined>;
  createBanner(banner: InsertBanner): Promise<Banner>;
  updateBanner(id: number, banner: Partial<InsertBanner>): Promise<Banner | undefined>;
  deleteBanner(id: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Collections
  async getCollections(): Promise<Collection[]> {
    return db.select().from(collections);
  }

  async getCollection(id: number): Promise<Collection | undefined> {
    const [collection] = await db.select().from(collections).where(eq(collections.id, id));
    return collection;
  }

  async getCollectionBySlug(slug: string): Promise<Collection | undefined> {
    const [collection] = await db.select().from(collections).where(eq(collections.slug, slug));
    return collection;
  }

  async createCollection(collection: InsertCollection): Promise<Collection> {
    const [created] = await db.insert(collections).values(collection).returning();
    return created;
  }

  async updateCollection(id: number, collection: Partial<InsertCollection>): Promise<Collection | undefined> {
    const [updated] = await db.update(collections).set(collection).where(eq(collections.id, id)).returning();
    return updated;
  }

  async deleteCollection(id: number): Promise<boolean> {
    const result = await db.delete(collections).where(eq(collections.id, id));
    return true;
  }

  // Products
  async getProducts(options?: { category?: string; isNew?: boolean; onSale?: boolean; search?: string }): Promise<Product[]> {
    let query = db.select().from(products);
    
    const conditions = [];
    
    if (options?.category) {
      conditions.push(eq(products.category, options.category));
    }
    if (options?.isNew) {
      conditions.push(eq(products.isNew, true));
    }
    if (options?.onSale) {
      conditions.push(sql`${products.salePrice} IS NOT NULL`);
    }
    if (options?.search) {
      conditions.push(ilike(products.name, `%${options.search}%`));
    }
    
    if (conditions.length > 0) {
      return db.select().from(products).where(and(...conditions));
    }
    
    return db.select().from(products);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.slug, slug));
    return product;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [created] = await db.insert(products).values(product).returning();
    
    // Update collection product count
    if (product.category) {
      await db.execute(sql`
        UPDATE collections 
        SET product_count = (SELECT COUNT(*) FROM products WHERE category = ${product.category})
        WHERE slug = ${product.category}
      `);
    }
    
    return created;
  }

  async updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined> {
    const [updated] = await db.update(products).set(product).where(eq(products.id, id)).returning();
    return updated;
  }

  async deleteProduct(id: number): Promise<boolean> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    if (product) {
      await db.delete(products).where(eq(products.id, id));
      
      // Update collection product count
      if (product.category) {
        await db.execute(sql`
          UPDATE collections 
          SET product_count = (SELECT COUNT(*) FROM products WHERE category = ${product.category})
          WHERE slug = ${product.category}
        `);
      }
    }
    return true;
  }

  // Cart
  async getCartItems(sessionId: string): Promise<(CartItem & { product: Product })[]> {
    const items = await db
      .select()
      .from(cartItems)
      .innerJoin(products, eq(cartItems.productId, products.id))
      .where(eq(cartItems.sessionId, sessionId));
    
    return items.map(item => ({
      ...item.cart_items,
      product: item.products
    }));
  }

  async addToCart(item: InsertCartItem): Promise<CartItem> {
    // Check if item already exists
    const [existing] = await db.select().from(cartItems)
      .where(and(
        eq(cartItems.sessionId, item.sessionId),
        eq(cartItems.productId, item.productId),
        item.variant ? eq(cartItems.variant, item.variant) : sql`${cartItems.variant} IS NULL`
      ));
    
    if (existing) {
      const [updated] = await db.update(cartItems)
        .set({ quantity: existing.quantity + (item.quantity || 1) })
        .where(eq(cartItems.id, existing.id))
        .returning();
      return updated;
    }
    
    const [created] = await db.insert(cartItems).values(item).returning();
    return created;
  }

  async updateCartItem(id: number, quantity: number): Promise<CartItem | undefined> {
    if (quantity <= 0) {
      await this.removeFromCart(id);
      return undefined;
    }
    const [updated] = await db.update(cartItems).set({ quantity }).where(eq(cartItems.id, id)).returning();
    return updated;
  }

  async removeFromCart(id: number): Promise<boolean> {
    await db.delete(cartItems).where(eq(cartItems.id, id));
    return true;
  }

  async clearCart(sessionId: string): Promise<boolean> {
    await db.delete(cartItems).where(eq(cartItems.sessionId, sessionId));
    return true;
  }

  // Orders
  async getOrders(): Promise<Order[]> {
    return db.select().from(orders).orderBy(desc(orders.createdAt));
  }

  async getOrder(id: number): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order;
  }

  async getOrderByNumber(orderNumber: string): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.orderNumber, orderNumber));
    return order;
  }

  async createOrder(order: InsertOrder, items: Omit<InsertOrderItem, 'orderId'>[]): Promise<Order> {
    const orderNumber = `AH-${Date.now().toString(36).toUpperCase()}`;
    
    const [created] = await db.insert(orders).values({
      ...order,
      orderNumber
    }).returning();
    
    // Insert order items
    for (const item of items) {
      await db.insert(orderItems).values({
        ...item,
        orderId: created.id
      });
    }
    
    return created;
  }

  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const [updated] = await db.update(orders).set({ status }).where(eq(orders.id, id)).returning();
    return updated;
  }

  // Banners
  async getBanners(type?: string): Promise<Banner[]> {
    if (type) {
      return db.select().from(banners).where(and(eq(banners.type, type), eq(banners.isActive, true))).orderBy(asc(banners.sortOrder));
    }
    return db.select().from(banners).where(eq(banners.isActive, true)).orderBy(asc(banners.sortOrder));
  }

  async getBanner(id: number): Promise<Banner | undefined> {
    const [banner] = await db.select().from(banners).where(eq(banners.id, id));
    return banner;
  }

  async createBanner(banner: InsertBanner): Promise<Banner> {
    const [created] = await db.insert(banners).values(banner).returning();
    return created;
  }

  async updateBanner(id: number, banner: Partial<InsertBanner>): Promise<Banner | undefined> {
    const [updated] = await db.update(banners).set(banner).where(eq(banners.id, id)).returning();
    return updated;
  }

  async deleteBanner(id: number): Promise<boolean> {
    await db.delete(banners).where(eq(banners.id, id));
    return true;
  }
}

export const storage = new DatabaseStorage();
