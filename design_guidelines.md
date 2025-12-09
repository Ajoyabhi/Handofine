# Design Guidelines: Premium Home Decor E-Commerce Platform

## Design Approach

**Selected Approach:** Reference-Based Design inspired by AuraDecor.co.in, Shopify stores, and premium lifestyle e-commerce platforms.

**Key Design Principles:**
- Image-first aesthetic showcasing product beauty and lifestyle ambiance
- Clean, spacious layouts that let products breathe
- Premium feel through refined typography and generous whitespace
- Trust-building through organized structure and professional polish

---

## Typography

**Font Families:**
- Primary (Headers): 'Playfair Display' or 'Cormorant Garamond' (elegant serif for luxury feel)
- Secondary (Body): 'Inter' or 'DM Sans' (clean sans-serif for readability)
- Accent (Prices/CTA): 'Inter' medium/semibold

**Hierarchy:**
- H1 (Hero): text-5xl md:text-6xl lg:text-7xl, font-serif
- H2 (Section Headers): text-3xl md:text-4xl, font-serif
- H3 (Product/Collection Titles): text-xl md:text-2xl, font-sans
- Body: text-base md:text-lg, font-sans
- Small (Prices/Labels): text-sm md:text-base, font-sans font-medium

---

## Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24
- Component padding: p-4 md:p-8
- Section vertical spacing: py-12 md:py-20 lg:py-24
- Grid gaps: gap-4 md:gap-6 lg:gap-8
- Container max-width: max-w-7xl with px-4 md:px-8

**Grid Structures:**
- Product grids: grid-cols-2 md:grid-cols-3 lg:grid-cols-4
- Collection showcase: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Hero content: Single column centered, max-w-4xl

---

## Component Library

### Navigation & Header
**Top Bar:** Promotional message center-aligned, social icons right-aligned, h-12, text-sm
**Main Navigation:** Sticky header with logo left, menu center, cart/account right, h-20, with subtle shadow on scroll

### Hero Section
Full-width container (min-h-[600px] md:min-h-[700px]) with large background image, centered overlay content with blurred-background buttons (backdrop-blur-md bg-white/30), heading + subheading + CTA button arrangement

### Product Cards
Aspect ratio 3:4 for product images, hover lift effect (hover:-translate-y-2 transition-transform), title below image, price display with strikethrough for sale prices, "Add to Cart" button appears on hover (desktop) / always visible (mobile)

### Collection Sections
Large category tiles (aspect-ratio 4:3 or 16:9), overlay text with category name, grid layout 2-3 columns, clear visual hierarchy

### Featured/Promotional Banners
Full-width sections between content blocks, background images with text overlay, h-64 md:h-96, centered content with backdrop-blur buttons

### Product Detail Page
Two-column layout (lg:grid-cols-2), left: image gallery with thumbnails, right: product info (title, price, description, variant selector, quantity, add-to-cart), sticky on desktop

### Cart & Checkout
Sidebar cart (slide-in from right) or dedicated cart page, line items with thumbnail + details + quantity selector, subtotal/shipping/total breakdown, prominent checkout button

### Footer
Multi-column layout (grid-cols-2 md:grid-cols-4), sections for: Collections, About/Policy, Social Media, Newsletter signup, copyright and payment icons at bottom

---

## Images

**Hero Section:**
Large lifestyle image (1920x800px minimum) showing candles/home decor in styled setting - warm, inviting ambiance with soft lighting. Position: Full-width background, overlay gradient for text readability.

**Product Images:**
Square format (1:1 ratio), clean white or minimal background, 800x800px minimum. Show product clearly with soft shadows.

**Collection Thumbnails:**
Lifestyle scenes for each collection category (e.g., "Jar Candles" shows styled shelf with candles, "Gift Sets" shows wrapped presents). Size: 800x600px, overlay text with category name.

**Promotional Banners:**
Seasonal/festival themed images (1920x600px), featuring products in context. Examples: Diwali decorations with candles, cozy winter scene with candles and blankets.

**Additional Content:**
Behind-the-scenes workshop images, lifestyle mood boards showing products in use, social media-style product photography for variety.

---

## Key UX Patterns

- Breadcrumb navigation on all interior pages
- "Quick View" modal for products from grid view
- Persistent cart icon with item count badge
- Clear sale/discount indicators with percentage badges
- Trust badges (secure checkout, shipping info) near CTAs
- Smooth page transitions, minimal decorative animations
- Mobile: hamburger menu, bottom sticky cart bar
- Filter/sort controls on collection pages (sidebar desktop, dropdown mobile)

---

**Visual Mood:** Warm, inviting, premium but accessible - think cozy lifestyle magazine meets high-end boutique. Emphasize product quality through clean presentation and professional photography.