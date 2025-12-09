import { db } from "./db";
import { collections, products, banners } from "@shared/schema";
import { sql } from "drizzle-orm";

const imagePath = (name: string) => `/assets/generated_images/${name}`;

async function seed() {
  console.log("Seeding database...");

  // Clear existing data
  await db.delete(products);
  await db.delete(collections);
  await db.delete(banners);

  // Seed collections
  console.log("Seeding collections...");
  const collectionData = [
    {
      name: "Gift Sets",
      slug: "gift-sets",
      description: "Beautiful curated gift sets perfect for any occasion",
      image: imagePath("gift_set_collection_image.png"),
      productCount: 0,
    },
    {
      name: "Jar Candles",
      slug: "jar-candles",
      description: "Premium scented candles in elegant glass jars",
      image: imagePath("jar_candles_collection.png"),
      productCount: 0,
    },
    {
      name: "Home Decor",
      slug: "home-decor",
      description: "Stylish decor pieces to enhance your living space",
      image: imagePath("home_decor_collection.png"),
      productCount: 0,
    },
  ];

  const insertedCollections = await db.insert(collections).values(collectionData).returning();
  console.log(`Inserted ${insertedCollections.length} collections`);

  const collectionMap = insertedCollections.reduce((acc, col) => {
    acc[col.slug] = col.id;
    return acc;
  }, {} as Record<string, number>);

  // Seed products
  console.log("Seeding products...");
  const productData = [
    {
      name: "Amber Woods Candle",
      slug: "amber-woods-candle",
      price: 899,
      salePrice: 699,
      image: imagePath("product_candle_amber_jar.png"),
      category: "jar-candles",
      description: "A warm, woody fragrance with notes of sandalwood and amber. Perfect for cozy evenings at home.",
      inStock: true,
      isNew: false,
      isBestSeller: true,
      collectionId: collectionMap["jar-candles"],
    },
    {
      name: "Lavender Dreams",
      slug: "lavender-dreams",
      price: 799,
      salePrice: null,
      image: imagePath("product_candle_lavender.png"),
      category: "jar-candles",
      description: "Calming lavender essence for peaceful relaxation. Ideal for meditation and bedtime rituals.",
      inStock: true,
      isNew: true,
      isBestSeller: false,
      collectionId: collectionMap["jar-candles"],
    },
    {
      name: "Rose Garden",
      slug: "rose-garden",
      price: 849,
      salePrice: 749,
      image: imagePath("product_candle_rose.png"),
      category: "jar-candles",
      description: "Romantic floral notes of fresh roses and petals. A timeless fragrance for any room.",
      inStock: true,
      isNew: false,
      isBestSeller: true,
      collectionId: collectionMap["jar-candles"],
    },
    {
      name: "Vanilla Bliss",
      slug: "vanilla-bliss",
      price: 699,
      salePrice: null,
      image: imagePath("product_candle_vanilla.png"),
      category: "jar-candles",
      description: "Sweet and comforting vanilla fragrance. A classic scent loved by everyone.",
      inStock: true,
      isNew: true,
      isBestSeller: false,
      collectionId: collectionMap["jar-candles"],
    },
    {
      name: "Amber Woods Large",
      slug: "amber-woods-large",
      price: 1299,
      salePrice: 999,
      image: imagePath("product_candle_amber_jar.png"),
      category: "jar-candles",
      description: "Large version of our signature amber woods candle. Burns for up to 60 hours.",
      inStock: true,
      isNew: false,
      isBestSeller: false,
      collectionId: collectionMap["jar-candles"],
    },
    {
      name: "Lavender Gift Set",
      slug: "lavender-gift-set",
      price: 1999,
      salePrice: 1599,
      image: imagePath("gift_set_collection_image.png"),
      category: "gift-sets",
      description: "Beautiful gift set featuring lavender candle, room spray, and bath salts.",
      inStock: true,
      isNew: true,
      isBestSeller: true,
      collectionId: collectionMap["gift-sets"],
    },
    {
      name: "Rose Ceramic Holder",
      slug: "rose-ceramic-holder",
      price: 599,
      salePrice: null,
      image: imagePath("product_candle_rose.png"),
      category: "home-decor",
      description: "Elegant ceramic candle holder with rose motif. Perfect for tea lights.",
      inStock: false,
      isNew: false,
      isBestSeller: false,
      collectionId: collectionMap["home-decor"],
    },
    {
      name: "Vanilla Mini Set",
      slug: "vanilla-mini-set",
      price: 499,
      salePrice: null,
      image: imagePath("product_candle_vanilla.png"),
      category: "gift-sets",
      description: "Mini candle set perfect for gifting. Includes 3 vanilla scented votives.",
      inStock: true,
      isNew: true,
      isBestSeller: false,
      collectionId: collectionMap["gift-sets"],
    },
    {
      name: "Jasmine Nights",
      slug: "jasmine-nights",
      price: 849,
      salePrice: null,
      image: imagePath("product_candle_lavender.png"),
      category: "jar-candles",
      description: "Intoxicating jasmine fragrance that blooms at night. Exotic and sensual.",
      inStock: true,
      isNew: true,
      isBestSeller: false,
      collectionId: collectionMap["jar-candles"],
    },
    {
      name: "Sandalwood Serenity",
      slug: "sandalwood-serenity",
      price: 949,
      salePrice: 799,
      image: imagePath("product_candle_amber_jar.png"),
      category: "jar-candles",
      description: "Rich sandalwood essence for a grounding and calming atmosphere.",
      inStock: true,
      isNew: false,
      isBestSeller: true,
      collectionId: collectionMap["jar-candles"],
    },
    {
      name: "Premium Gift Box",
      slug: "premium-gift-box",
      price: 2999,
      salePrice: 2499,
      image: imagePath("gift_set_collection_image.png"),
      category: "gift-sets",
      description: "Luxury gift box with 4 scented candles and decorative holder.",
      inStock: true,
      isNew: false,
      isBestSeller: true,
      collectionId: collectionMap["gift-sets"],
    },
    {
      name: "Decorative Tray Set",
      slug: "decorative-tray-set",
      price: 899,
      salePrice: null,
      image: imagePath("home_decor_collection.png"),
      category: "home-decor",
      description: "Beautiful tray set for displaying your candle collection.",
      inStock: true,
      isNew: true,
      isBestSeller: false,
      collectionId: collectionMap["home-decor"],
    },
  ];

  const insertedProducts = await db.insert(products).values(productData).returning();
  console.log(`Inserted ${insertedProducts.length} products`);

  // Update collection product counts
  for (const slug of Object.keys(collectionMap)) {
    await db.execute(sql`
      UPDATE collections 
      SET product_count = (SELECT COUNT(*) FROM products WHERE category = ${slug})
      WHERE slug = ${slug}
    `);
  }
  console.log("Updated collection product counts");

  // Seed banners
  console.log("Seeding banners...");
  const bannerData = [
    {
      title: "Transform Your Space",
      subtitle: "Discover our collection of premium scented candles and home decor",
      ctaText: "Shop Now",
      ctaLink: "/shop",
      image: imagePath("hero_banner_candles_lifestyle.png"),
      type: "hero",
      isActive: true,
      sortOrder: 1,
    },
    {
      title: "Festive Season Sale",
      subtitle: "Up to 30% off on select gift sets",
      ctaText: "Explore Offers",
      ctaLink: "/sale",
      image: imagePath("diwali_festival_banner.png"),
      type: "promotional",
      isActive: true,
      sortOrder: 1,
    },
    {
      title: "New Arrivals",
      subtitle: "Discover our latest fragrances",
      ctaText: "Shop New",
      ctaLink: "/new-arrivals",
      image: imagePath("jar_candles_collection.png"),
      type: "promotional",
      isActive: true,
      sortOrder: 2,
    },
  ];

  const insertedBanners = await db.insert(banners).values(bannerData).returning();
  console.log(`Inserted ${insertedBanners.length} banners`);

  console.log("Seeding complete!");
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  });
