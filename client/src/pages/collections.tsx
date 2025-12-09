import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/CartDrawer';
import CollectionCard from '@/components/CollectionCard';
import { collections } from '@/lib/mockData';

export default function Collections() {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {collections.map(collection => (
            <CollectionCard key={collection.id} {...collection} />
          ))}
        </div>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
}
