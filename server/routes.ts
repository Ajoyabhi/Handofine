import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProductSchema, insertCollectionSchema, insertCartItemSchema, insertOrderSchema, insertBannerSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // =====================
  // PRODUCTS
  // =====================
  
  // Get all products (with optional filters)
  app.get("/api/products", async (req: Request, res: Response) => {
    try {
      const { category, isNew, onSale, search } = req.query;
      const products = await storage.getProducts({
        category: category as string | undefined,
        isNew: isNew === "true",
        onSale: onSale === "true",
        search: search as string | undefined,
      });
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  // Get single product by ID
  app.get("/api/products/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid product ID" });
      }
      const product = await storage.getProduct(id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  // Get product by slug
  app.get("/api/products/slug/:slug", async (req: Request, res: Response) => {
    try {
      const product = await storage.getProductBySlug(req.params.slug);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  // Create product
  app.post("/api/products", async (req: Request, res: Response) => {
    try {
      const validatedData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(validatedData);
      res.status(201).json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid product data", details: error.errors });
      }
      console.error("Error creating product:", error);
      res.status(500).json({ error: "Failed to create product" });
    }
  });

  // Update product
  app.put("/api/products/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid product ID" });
      }
      const validatedData = insertProductSchema.partial().parse(req.body);
      const product = await storage.updateProduct(id, validatedData);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid product data", details: error.errors });
      }
      console.error("Error updating product:", error);
      res.status(500).json({ error: "Failed to update product" });
    }
  });

  // Delete product
  app.delete("/api/products/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid product ID" });
      }
      await storage.deleteProduct(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ error: "Failed to delete product" });
    }
  });

  // =====================
  // COLLECTIONS
  // =====================

  // Get all collections
  app.get("/api/collections", async (_req: Request, res: Response) => {
    try {
      const collections = await storage.getCollections();
      res.json(collections);
    } catch (error) {
      console.error("Error fetching collections:", error);
      res.status(500).json({ error: "Failed to fetch collections" });
    }
  });

  // Get collection by slug
  app.get("/api/collections/:slug", async (req: Request, res: Response) => {
    try {
      const collection = await storage.getCollectionBySlug(req.params.slug);
      if (!collection) {
        return res.status(404).json({ error: "Collection not found" });
      }
      res.json(collection);
    } catch (error) {
      console.error("Error fetching collection:", error);
      res.status(500).json({ error: "Failed to fetch collection" });
    }
  });

  // Get products in a collection
  app.get("/api/collections/:slug/products", async (req: Request, res: Response) => {
    try {
      const collection = await storage.getCollectionBySlug(req.params.slug);
      if (!collection) {
        return res.status(404).json({ error: "Collection not found" });
      }
      const products = await storage.getProducts({ category: req.params.slug });
      res.json(products);
    } catch (error) {
      console.error("Error fetching collection products:", error);
      res.status(500).json({ error: "Failed to fetch collection products" });
    }
  });

  // Create collection
  app.post("/api/collections", async (req: Request, res: Response) => {
    try {
      const validatedData = insertCollectionSchema.parse(req.body);
      const collection = await storage.createCollection(validatedData);
      res.status(201).json(collection);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid collection data", details: error.errors });
      }
      console.error("Error creating collection:", error);
      res.status(500).json({ error: "Failed to create collection" });
    }
  });

  // Update collection
  app.put("/api/collections/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid collection ID" });
      }
      const validatedData = insertCollectionSchema.partial().parse(req.body);
      const collection = await storage.updateCollection(id, validatedData);
      if (!collection) {
        return res.status(404).json({ error: "Collection not found" });
      }
      res.json(collection);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid collection data", details: error.errors });
      }
      console.error("Error updating collection:", error);
      res.status(500).json({ error: "Failed to update collection" });
    }
  });

  // Delete collection
  app.delete("/api/collections/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid collection ID" });
      }
      await storage.deleteCollection(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting collection:", error);
      res.status(500).json({ error: "Failed to delete collection" });
    }
  });

  // =====================
  // CART (Session-based)
  // =====================

  // Get cart items
  app.get("/api/cart", async (req: Request, res: Response) => {
    try {
      const sessionId = req.session?.id || req.sessionID;
      if (!sessionId) {
        return res.json([]);
      }
      const items = await storage.getCartItems(sessionId);
      res.json(items);
    } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ error: "Failed to fetch cart" });
    }
  });

  // Add to cart
  app.post("/api/cart", async (req: Request, res: Response) => {
    try {
      const sessionId = req.session?.id || req.sessionID;
      if (!sessionId) {
        return res.status(400).json({ error: "No session available" });
      }
      
      // Validate with Zod schema - productId and quantity are required
      const addToCartSchema = z.object({
        productId: z.number().int().positive(),
        quantity: z.number().int().positive().default(1),
        variant: z.string().nullable().optional(),
      });
      
      const parseResult = addToCartSchema.safeParse(req.body);
      if (!parseResult.success) {
        return res.status(400).json({ error: "Invalid cart data", details: parseResult.error.errors });
      }
      
      const { productId, quantity, variant } = parseResult.data;
      
      const cartItem = await storage.addToCart({
        sessionId,
        productId,
        quantity,
        variant: variant || null,
      });
      
      res.status(201).json(cartItem);
    } catch (error) {
      console.error("Error adding to cart:", error);
      res.status(500).json({ error: "Failed to add to cart" });
    }
  });

  // Update cart item quantity
  app.put("/api/cart/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid cart item ID" });
      }
      
      // Validate quantity with Zod
      const updateCartSchema = z.object({
        quantity: z.number().int().min(0),
      });
      
      const parseResult = updateCartSchema.safeParse(req.body);
      if (!parseResult.success) {
        return res.status(400).json({ error: "Invalid quantity", details: parseResult.error.errors });
      }
      
      const { quantity } = parseResult.data;
      
      const cartItem = await storage.updateCartItem(id, quantity);
      if (quantity === 0) {
        return res.status(204).send();
      }
      if (!cartItem) {
        return res.status(404).json({ error: "Cart item not found" });
      }
      res.json(cartItem);
    } catch (error) {
      console.error("Error updating cart item:", error);
      res.status(500).json({ error: "Failed to update cart item" });
    }
  });

  // Remove from cart
  app.delete("/api/cart/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid cart item ID" });
      }
      await storage.removeFromCart(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error removing from cart:", error);
      res.status(500).json({ error: "Failed to remove from cart" });
    }
  });

  // Clear cart
  app.delete("/api/cart", async (req: Request, res: Response) => {
    try {
      const sessionId = req.session?.id || req.sessionID;
      if (!sessionId) {
        return res.status(204).send();
      }
      await storage.clearCart(sessionId);
      res.status(204).send();
    } catch (error) {
      console.error("Error clearing cart:", error);
      res.status(500).json({ error: "Failed to clear cart" });
    }
  });

  // =====================
  // ORDERS
  // =====================

  // Get all orders (admin)
  app.get("/api/orders", async (_req: Request, res: Response) => {
    try {
      const orders = await storage.getOrders();
      res.json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });

  // Get order by order number
  app.get("/api/orders/:orderNumber", async (req: Request, res: Response) => {
    try {
      const order = await storage.getOrderByNumber(req.params.orderNumber);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      console.error("Error fetching order:", error);
      res.status(500).json({ error: "Failed to fetch order" });
    }
  });

  // Create order
  app.post("/api/orders", async (req: Request, res: Response) => {
    try {
      const { items, ...orderData } = req.body;
      
      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: "Order must contain at least one item" });
      }
      
      const validatedOrder = insertOrderSchema.parse(orderData);
      const order = await storage.createOrder(validatedOrder, items);
      
      // Clear cart after successful order
      const sessionId = req.session?.id || req.sessionID;
      if (sessionId) {
        await storage.clearCart(sessionId);
      }
      
      res.status(201).json(order);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid order data", details: error.errors });
      }
      console.error("Error creating order:", error);
      res.status(500).json({ error: "Failed to create order" });
    }
  });

  // Update order status (admin)
  app.patch("/api/orders/:id/status", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid order ID" });
      }
      
      const { status } = req.body;
      if (!status || typeof status !== "string") {
        return res.status(400).json({ error: "Status is required" });
      }
      
      const order = await storage.updateOrderStatus(id, status);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      console.error("Error updating order status:", error);
      res.status(500).json({ error: "Failed to update order status" });
    }
  });

  // =====================
  // BANNERS
  // =====================

  // Get banners
  app.get("/api/banners", async (req: Request, res: Response) => {
    try {
      const { type } = req.query;
      const banners = await storage.getBanners(type as string | undefined);
      res.json(banners);
    } catch (error) {
      console.error("Error fetching banners:", error);
      res.status(500).json({ error: "Failed to fetch banners" });
    }
  });

  // Get single banner
  app.get("/api/banners/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid banner ID" });
      }
      const banner = await storage.getBanner(id);
      if (!banner) {
        return res.status(404).json({ error: "Banner not found" });
      }
      res.json(banner);
    } catch (error) {
      console.error("Error fetching banner:", error);
      res.status(500).json({ error: "Failed to fetch banner" });
    }
  });

  // Create banner
  app.post("/api/banners", async (req: Request, res: Response) => {
    try {
      const validatedData = insertBannerSchema.parse(req.body);
      const banner = await storage.createBanner(validatedData);
      res.status(201).json(banner);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid banner data", details: error.errors });
      }
      console.error("Error creating banner:", error);
      res.status(500).json({ error: "Failed to create banner" });
    }
  });

  // Update banner
  app.put("/api/banners/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid banner ID" });
      }
      const validatedData = insertBannerSchema.partial().parse(req.body);
      const banner = await storage.updateBanner(id, validatedData);
      if (!banner) {
        return res.status(404).json({ error: "Banner not found" });
      }
      res.json(banner);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid banner data", details: error.errors });
      }
      console.error("Error updating banner:", error);
      res.status(500).json({ error: "Failed to update banner" });
    }
  });

  // Delete banner
  app.delete("/api/banners/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid banner ID" });
      }
      await storage.deleteBanner(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting banner:", error);
      res.status(500).json({ error: "Failed to delete banner" });
    }
  });

  return httpServer;
}
