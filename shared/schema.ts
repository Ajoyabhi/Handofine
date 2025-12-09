import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  isAdmin: boolean("is_admin").default(false),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Collections table
export const collections = pgTable("collections", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  image: text("image"),
  productCount: integer("product_count").default(0),
});

export const insertCollectionSchema = createInsertSchema(collections).omit({
  id: true,
  productCount: true,
});

export type InsertCollection = z.infer<typeof insertCollectionSchema>;
export type Collection = typeof collections.$inferSelect;

// Products table
export const products = pgTable("products", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  price: integer("price").notNull(),
  salePrice: integer("sale_price"),
  image: text("image"),
  category: text("category"),
  inStock: boolean("in_stock").default(true),
  isNew: boolean("is_new").default(false),
  isBestSeller: boolean("is_best_seller").default(false),
  collectionId: integer("collection_id").references(() => collections.id),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
});

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

// Cart items table
export const cartItems = pgTable("cart_items", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  sessionId: text("session_id").notNull(),
  productId: integer("product_id").references(() => products.id).notNull(),
  quantity: integer("quantity").notNull().default(1),
  variant: text("variant"),
});

export const insertCartItemSchema = createInsertSchema(cartItems).omit({
  id: true,
});

export type InsertCartItem = z.infer<typeof insertCartItemSchema>;
export type CartItem = typeof cartItems.$inferSelect;

// Orders table
export const orders = pgTable("orders", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  orderNumber: text("order_number").notNull().unique(),
  status: text("status").notNull().default("pending"),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone"),
  shippingAddress: text("shipping_address").notNull(),
  shippingCity: text("shipping_city").notNull(),
  shippingState: text("shipping_state").notNull(),
  shippingPincode: text("shipping_pincode").notNull(),
  subtotal: integer("subtotal").notNull(),
  shippingCost: integer("shipping_cost").notNull().default(0),
  total: integer("total").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  orderNumber: true,
  createdAt: true,
});

export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;

// Order items table
export const orderItems = pgTable("order_items", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  orderId: integer("order_id").references(() => orders.id).notNull(),
  productId: integer("product_id").references(() => products.id).notNull(),
  productName: text("product_name").notNull(),
  productImage: text("product_image"),
  price: integer("price").notNull(),
  quantity: integer("quantity").notNull(),
  variant: text("variant"),
});

export const insertOrderItemSchema = createInsertSchema(orderItems).omit({
  id: true,
});

export type InsertOrderItem = z.infer<typeof insertOrderItemSchema>;
export type OrderItem = typeof orderItems.$inferSelect;

// Site settings / promotional banners
export const banners = pgTable("banners", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  ctaText: text("cta_text"),
  ctaLink: text("cta_link"),
  image: text("image"),
  type: text("type").notNull().default("promotional"),
  isActive: boolean("is_active").default(true),
  sortOrder: integer("sort_order").default(0),
});

export const insertBannerSchema = createInsertSchema(banners).omit({
  id: true,
});

export type InsertBanner = z.infer<typeof insertBannerSchema>;
export type Banner = typeof banners.$inferSelect;
