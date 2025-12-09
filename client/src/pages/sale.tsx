import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/CartDrawer';
import ProductCard from '@/components/ProductCard';
import QuickViewModal from '@/components/QuickViewModal';
import { useCart } from '@/context/CartContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import type { Product, Banner } from '@shared/schema';

export default function Sale() {
  const { addItem } = useCart();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [sortBy, setSortBy] = useState('discount');

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const { data: banners = [] } = useQuery<Banner[]>({
    queryKey: ['/api/banners'],
  });

  const saleBanner = banners.find(b => b.type === 'promotional' && b.isActive);

  const saleProducts = products.filter(p => p.salePrice);

  const sortedProducts = [...saleProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return (a.salePrice ?? a.price) - (b.salePrice ?? b.price);
      case 'price-high':
        return (b.salePrice ?? b.price) - (a.salePrice ?? a.price);
      case 'discount':
        const discountA = a.salePrice ? ((a.price - a.salePrice) / a.price) : 0;
        const discountB = b.salePrice ? ((b.price - b.salePrice) / b.price) : 0;
        return discountB - discountA;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-background" data-testid="page-sale">
      <TopBar />
      <Header />
      
      <div 
        className="relative h-48 md:h-64 flex items-center justify-center"
        style={{ 
          backgroundImage: saleBanner?.image ? `url(${saleBanner.image})` : undefined, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          backgroundColor: saleBanner?.image ? undefined : 'hsl(var(--muted))'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        <div className="relative z-10 text-center">
          <Badge variant="destructive" className="mb-3">Limited Time</Badge>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-2" data-testid="text-sale-title">
            Sale
          </h1>
          <p className="text-white/90 text-lg">
            {saleBanner?.subtitle || 'Up to 30% off on selected items'}
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="flex items-center justify-between gap-4 mb-6">
          <p className="text-sm text-muted-foreground" data-testid="text-sale-count">
            {sortedProducts.length} items on sale
          </p>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]" data-testid="select-sort">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="discount">Biggest Discount</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-square rounded-md" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {sortedProducts.map(product => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                salePrice={product.salePrice ?? undefined}
                image={product.image || '/placeholder-product.jpg'}
                isNew={product.isNew ?? false}
                isBestSeller={product.isBestSeller ?? false}
                inStock={product.inStock ?? true}
                onAddToCart={() => addItem({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  salePrice: product.salePrice ?? undefined,
                  image: product.image || '/placeholder-product.jpg'
                })}
                onQuickView={() => setQuickViewProduct(product)}
              />
            ))}
          </div>
        )}

        {!isLoading && sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No items on sale right now. Check back soon!</p>
          </div>
        )}
      </main>

      <Footer />
      <CartDrawer />
      <QuickViewModal 
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        product={quickViewProduct}
      />
    </div>
  );
}
