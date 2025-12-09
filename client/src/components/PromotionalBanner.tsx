import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface PromotionalBannerProps {
  image: string;
  title: string;
  subtitle: string;
  ctaText: string;
  onCtaClick?: () => void;
}

export default function PromotionalBanner({ image, title, subtitle, ctaText, onCtaClick }: PromotionalBannerProps) {
  return (
    <section 
      className="relative h-64 md:h-80 lg:h-96 flex items-center justify-center overflow-hidden"
      data-testid="promotional-banner"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
        <div className="max-w-lg">
          <h2 
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-3"
            data-testid="text-promo-title"
          >
            {title}
          </h2>
          <p 
            className="text-lg md:text-xl text-white/90 mb-6"
            data-testid="text-promo-subtitle"
          >
            {subtitle}
          </p>
          <Button 
            size="lg"
            className="backdrop-blur-md bg-white/20 border border-white/30 text-white hover:bg-white/30"
            onClick={() => {
              onCtaClick?.();
              console.log('Promo CTA clicked');
            }}
            data-testid="button-promo-cta"
          >
            {ctaText}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
