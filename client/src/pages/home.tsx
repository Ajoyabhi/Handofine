import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
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
import { Skeleton } from '@/components/ui/skeleton';
import type { Product, Collection, Banner } from '@shared/schema';

export default function Home() {
  const [, navigate] = useLocation();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  
  const { data: products = [], isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const { data: collections = [], isLoading: collectionsLoading } = useQuery<Collection[]>({
    queryKey: ['/api/collections'],
  });

  const { data: banners = [] } = useQuery<Banner[]>({
    queryKey: ['/api/banners'],
  });

  const heroBanner = banners.find(b => b.type === 'hero' && b.isActive);
  const promotionalBannerData = banners.find(b => b.type === 'promotional' && b.isActive);

  const featuredProducts = products.filter(p => p.isBestSeller || p.isNew).slice(0, 4);
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);

  const ProductGridSkeleton = () => (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <Skeleton className="h-10 w-48 mb-8" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-square rounded-md" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-background" data-testid="page-home">
      <TopBar />
      <Header />
      
      <main>
        <HeroSection
          image={heroBanner?.image || '/placeholder-hero.jpg'}
          title={heroBanner?.title || 'Transform Your Space'}
          subtitle={heroBanner?.subtitle || 'Discover our collection of premium scented candles and home decor'}
          ctaText={heroBanner?.ctaText || 'Shop Now'}
          onCtaClick={() => navigate(heroBanner?.ctaLink || '/shop')}
        />

        {productsLoading ? (
          <ProductGridSkeleton />
        ) : featuredProducts.length > 0 ? (
          <ProductGrid 
            products={featuredProducts}
            title="Featured Products"
            sectionId="featured"
            showViewAll
            onViewAll={() => navigate('/shop')}
          />
        ) : null}

        {collectionsLoading ? (
          <section className="py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4">
              <Skeleton className="h-10 w-48 mx-auto mb-8" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <Skeleton key={i} className="aspect-[4/3] rounded-md" />
                ))}
              </div>
            </div>
          </section>
        ) : collections.length > 0 ? (
          <CollectionsSection collections={collections.map(c => ({
            id: c.id,
            name: c.name,
            slug: c.slug,
            image: c.image || '/placeholder-collection.jpg',
            productCount: c.productCount || 0,
          }))} />
        ) : null}

        {promotionalBannerData && (
          <PromotionalBanner
            image={promotionalBannerData.image || '/placeholder-promo.jpg'}
            title={promotionalBannerData.title}
            subtitle={promotionalBannerData.subtitle || ''}
            ctaText={promotionalBannerData.ctaText || 'Explore Offers'}
            onCtaClick={() => navigate(promotionalBannerData.ctaLink || '/sale')}
          />
        )}

        {productsLoading ? (
          <ProductGridSkeleton />
        ) : newArrivals.length > 0 ? (
          <ProductGrid 
            products={newArrivals}
            title="New Arrivals"
            sectionId="new-arrivals"
            showViewAll
            onViewAll={() => navigate('/new-arrivals')}
          />
        ) : null}

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
