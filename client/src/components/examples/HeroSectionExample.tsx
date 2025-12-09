import HeroSection from '../HeroSection';
import { heroData } from '@/lib/mockData';

export default function HeroSectionExample() {
  return (
    <HeroSection
      image={heroData.image}
      title={heroData.title}
      subtitle={heroData.subtitle}
      ctaText={heroData.cta}
    />
  );
}
