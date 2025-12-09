import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  image: string;
  title: string;
  subtitle: string;
  ctaText: string;
  onCtaClick?: () => void;
}

export default function HeroSection({ image, title, subtitle, ctaText, onCtaClick }: HeroSectionProps) {
  return (
    <section 
      className="relative min-h-[500px] md:min-h-[600px] lg:min-h-[700px] flex items-center justify-center"
      data-testid="hero-section"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h2 
          className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-white mb-4 md:mb-6"
          data-testid="text-hero-title"
        >
          {title}
        </h2>
        <p 
          className="text-lg md:text-xl lg:text-2xl text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto"
          data-testid="text-hero-subtitle"
        >
          {subtitle}
        </p>
        <Button 
          size="lg"
          className="backdrop-blur-md bg-white/20 border border-white/30 text-white hover:bg-white/30"
          onClick={() => {
            onCtaClick?.();
            console.log('Hero CTA clicked');
          }}
          data-testid="button-hero-cta"
        >
          {ctaText}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </section>
  );
}
