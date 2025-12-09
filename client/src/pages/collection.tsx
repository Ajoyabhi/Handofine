import { useState } from 'react';
import { useRoute } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/CartDrawer';
import ProductCard from '@/components/ProductCard';
import QuickViewModal from '@/components/QuickViewModal';
import { useCart } from '@/context/CartContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronRight } from 'lucide-react';
import { Link } from 'wouter';
import { Skeleton } from '@/components/ui/skeleton';
import type { Product, Collection as CollectionType } from '@shared/schema';

export default function Collection() {
  const [, params] = useRoute('/collections/:slug');
  const { addItem } = useCart();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [sortBy, setSortBy] = useState('featured');

  const slug = params?.slug || '';

  const { data: collection, isLoading: collectionLoading } = useQuery<CollectionType>({
    queryKey: ['/api/collections', slug],
    enabled: !!slug,
  });

  const { data: collectionProducts = [], isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ['/api/collections', slug, 'products'],
    enabled: !!slug,
  });

  const sortedProducts = [...collectionProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return (a.salePrice ?? a.price) - (b.salePrice ?? b.price);
      case 'price-high':
        return (b.salePrice ?? b.price) - (a.salePrice ?? a.price);
      case 'newest':
        return a.isNew ? -1 : 1;
      default:
        return a.isBestSeller ? -1 : 1;
    }
  });

  if (collectionLoading) {
    return (
      <div className="min-h-screen bg-background">
        <TopBar />
        <Header />
        <div className="relative h-48 md:h-64 bg-muted" />
        <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-square rounded-md" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="min-h-screen bg-background">
        <TopBar />
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="font-serif text-3xl mb-4">Collection Not Found</h1>
          <p className="text-muted-foreground mb-6">The collection you're looking for doesn't exist.</p>
          <Link href="/collections">
            <span className="text-primary hover:underline cursor-pointer">View all collections</span>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" data-testid="page-collection">
      <TopBar />
      <Header />
      
      <div 
        className="relative h-48 md:h-64 flex items-end"
        style={{ 
          backgroundImage: collection.image ? `url(${collection.image})` : undefined, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          backgroundColor: collection.image ? undefined : 'hsl(var(--muted))'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 pb-6 md:pb-8 w-full">
          <nav className="flex items-center gap-2 text-sm text-white/80 mb-2" data-testid="breadcrumb">
            <Link href="/">
              <span className="hover:text-white cursor-pointer">Home</span>
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/collections">
              <span className="hover:text-white cursor-pointer">Collections</span>
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{collection.name}</span>
          </nav>
          <h1 className="font-serif text-3xl md:text-4xl text-white" data-testid="text-collection-title">
            {collection.name}
          </h1>
          {collection.description && (
            <p className="text-white/80 mt-2 max-w-2xl">{collection.description}</p>
          )}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="flex items-center justify-between gap-4 mb-6">
          <p className="text-sm text-muted-foreground" data-testid="text-collection-count">
            {sortedProducts.length} products
          </p>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]" data-testid="select-sort">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {productsLoading ? (
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

        {!productsLoading && sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products in this collection yet.</p>
            <Link href="/shop">
              <span className="text-primary hover:underline cursor-pointer">Browse all products</span>
            </Link>
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
