// todo: remove mock functionality - replace with real API data
import heroImage from '@assets/generated_images/hero_banner_candles_lifestyle.png';
import giftSetImage from '@assets/generated_images/gift_set_collection_image.png';
import jarCandlesImage from '@assets/generated_images/jar_candles_collection.png';
import homeDecorImage from '@assets/generated_images/home_decor_collection.png';
import amberCandleImage from '@assets/generated_images/product_candle_amber_jar.png';
import lavenderCandleImage from '@assets/generated_images/product_candle_lavender.png';
import roseCandleImage from '@assets/generated_images/product_candle_rose.png';
import vanillaCandleImage from '@assets/generated_images/product_candle_vanilla.png';
import diwaliImage from '@assets/generated_images/diwali_festival_banner.png';

export const heroData = {
  image: heroImage,
  title: 'Transform Your Space',
  subtitle: 'Discover our collection of premium scented candles and home decor',
  cta: 'Shop Now'
};

export const promotionalBanner = {
  image: diwaliImage,
  title: 'Festive Season Sale',
  subtitle: 'Up to 30% off on select gift sets',
  cta: 'Explore Offers'
};

export const collections = [
  {
    id: 1,
    name: 'Gift Sets',
    slug: 'gift-sets',
    image: giftSetImage,
    productCount: 24
  },
  {
    id: 2,
    name: 'Jar Candles',
    slug: 'jar-candles',
    image: jarCandlesImage,
    productCount: 48
  },
  {
    id: 3,
    name: 'Home Decor',
    slug: 'home-decor',
    image: homeDecorImage,
    productCount: 36
  }
];

export const products = [
  {
    id: 1,
    name: 'Amber Woods Candle',
    slug: 'amber-woods-candle',
    price: 899,
    salePrice: 699,
    image: amberCandleImage,
    category: 'jar-candles',
    description: 'A warm, woody fragrance with notes of sandalwood and amber.',
    inStock: true,
    isNew: false,
    isBestSeller: true
  },
  {
    id: 2,
    name: 'Lavender Dreams',
    slug: 'lavender-dreams',
    price: 799,
    image: lavenderCandleImage,
    category: 'jar-candles',
    description: 'Calming lavender essence for peaceful relaxation.',
    inStock: true,
    isNew: true,
    isBestSeller: false
  },
  {
    id: 3,
    name: 'Rose Garden',
    slug: 'rose-garden',
    price: 849,
    salePrice: 749,
    image: roseCandleImage,
    category: 'jar-candles',
    description: 'Romantic floral notes of fresh roses and petals.',
    inStock: true,
    isNew: false,
    isBestSeller: true
  },
  {
    id: 4,
    name: 'Vanilla Bliss',
    slug: 'vanilla-bliss',
    price: 699,
    image: vanillaCandleImage,
    category: 'jar-candles',
    description: 'Sweet and comforting vanilla fragrance.',
    inStock: true,
    isNew: true,
    isBestSeller: false
  },
  {
    id: 5,
    name: 'Amber Woods Large',
    slug: 'amber-woods-large',
    price: 1299,
    salePrice: 999,
    image: amberCandleImage,
    category: 'jar-candles',
    description: 'Large version of our signature amber woods candle.',
    inStock: true,
    isNew: false,
    isBestSeller: false
  },
  {
    id: 6,
    name: 'Lavender Gift Set',
    slug: 'lavender-gift-set',
    price: 1999,
    salePrice: 1599,
    image: giftSetImage,
    category: 'gift-sets',
    description: 'Beautiful gift set featuring lavender products.',
    inStock: true,
    isNew: true,
    isBestSeller: true
  },
  {
    id: 7,
    name: 'Rose Ceramic Holder',
    slug: 'rose-ceramic-holder',
    price: 599,
    image: roseCandleImage,
    category: 'home-decor',
    description: 'Elegant ceramic candle holder with rose motif.',
    inStock: false,
    isNew: false,
    isBestSeller: false
  },
  {
    id: 8,
    name: 'Vanilla Mini Set',
    slug: 'vanilla-mini-set',
    price: 499,
    image: vanillaCandleImage,
    category: 'gift-sets',
    description: 'Mini candle set perfect for gifting.',
    inStock: true,
    isNew: true,
    isBestSeller: false
  }
];

export const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Shop All', href: '/shop' },
  { name: 'Collections', href: '/collections' },
  { name: 'New Arrivals', href: '/new-arrivals' },
  { name: 'Sale', href: '/sale' }
];

export const footerLinks = {
  shop: [
    { name: 'All Products', href: '/shop' },
    { name: 'Gift Sets', href: '/collections/gift-sets' },
    { name: 'Jar Candles', href: '/collections/jar-candles' },
    { name: 'Home Decor', href: '/collections/home-decor' }
  ],
  about: [
    { name: 'Our Story', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'FAQs', href: '/faqs' }
  ],
  policies: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Shipping Policy', href: '/shipping' },
    { name: 'Returns', href: '/returns' }
  ]
};

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}

export function getDiscountPercentage(price: number, salePrice: number): number {
  return Math.round(((price - salePrice) / price) * 100);
}
