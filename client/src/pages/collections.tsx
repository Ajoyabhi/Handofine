import { useQuery } from '@tanstack/react-query';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/CartDrawer';
import CollectionCard from '@/components/CollectionCard';
import { Skeleton } from '@/components/ui/skeleton';
import type { Collection } from '@shared/schema';

export default function Collections() {
  const { data: collections = [], isLoading } = useQuery<Collection[]>({
    queryKey: ['/api/collections'],
  });

  return (
    <div className="min-h-screen bg-background" data-testid="page-collections">
      <TopBar />
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4" data-testid="text-collections-page-title">
            Our Collections
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our carefully curated collections of premium candles, gift sets, and home decor items.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-[4/3] rounded-md" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            ))}
          </div>
        ) : collections.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {collections.map(collection => (
              <CollectionCard 
                key={collection.id} 
                id={collection.id}
                name={collection.name}
                slug={collection.slug}
                image={collection.image || '/placeholder-collection.jpg'}
                productCount={collection.productCount || 0}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No collections available yet.</p>
          </div>
        )}
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
}
