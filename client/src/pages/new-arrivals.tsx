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
import { Skeleton } from '@/components/ui/skeleton';
import type { Product } from '@shared/schema';

export default function NewArrivals() {
  const { addItem } = useCart();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [sortBy, setSortBy] = useState('newest');

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const newProducts = products.filter(p => p.isNew);

  const sortedProducts = [...newProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return (a.salePrice ?? a.price) - (b.salePrice ?? b.price);
      case 'price-high':
        return (b.salePrice ?? b.price) - (a.salePrice ?? a.price);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-background" data-testid="page-new-arrivals">
      <TopBar />
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4" data-testid="text-new-arrivals-title">
            New Arrivals
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our latest additions to the collection. Fresh scents and new designs just for you.
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 mb-6">
          <p className="text-sm text-muted-foreground" data-testid="text-new-arrivals-count">
            {sortedProducts.length} new products
          </p>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]" data-testid="select-sort">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
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
                sectionId="new-arrivals-page"
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
            <p className="text-muted-foreground">No new arrivals at the moment. Check back soon!</p>
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
