import { useState } from 'react';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/HeroSection';
import ProductGrid from '@/components/ProductGrid';
import CollectionsSection from '@/components/CollectionsSection';
import PromotionalBanner from '@/components/PromotionalBanner';
import TrustBadges from '@/components/TrustBadges';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/CartDrawer';
import QuickViewModal from '@/components/QuickViewModal';
import { heroData, promotionalBanner, collections, products } from '@/lib/mockData';

export default function Home() {
  const [quickViewProduct, setQuickViewProduct] = useState<typeof products[0] | null>(null);
  
  // todo: remove mock functionality - filter products from API
  const featuredProducts = products.filter(p => p.isBestSeller || p.isNew).slice(0, 4);
  const newArrivals = products.filter(p => p.isNew);

  return (
    <div className="min-h-screen bg-background" data-testid="page-home">
      <TopBar />
      <Header />
      
      <main>
        <HeroSection
          image={heroData.image}
          title={heroData.title}
          subtitle={heroData.subtitle}
          ctaText={heroData.cta}
          onCtaClick={() => console.log('Navigate to shop')}
        />

        <ProductGrid 
          products={featuredProducts}
          title="Featured Products"
          showViewAll
          onViewAll={() => console.log('Navigate to all products')}
        />

        <CollectionsSection collections={collections} />

        <PromotionalBanner
          image={promotionalBanner.image}
          title={promotionalBanner.title}
          subtitle={promotionalBanner.subtitle}
          ctaText={promotionalBanner.cta}
          onCtaClick={() => console.log('Navigate to sale')}
        />

        {newArrivals.length > 0 && (
          <ProductGrid 
            products={newArrivals}
            title="New Arrivals"
            showViewAll
            onViewAll={() => console.log('Navigate to new arrivals')}
          />
        )}

        <TrustBadges />
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
