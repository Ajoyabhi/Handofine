import PromotionalBanner from '../PromotionalBanner';
import { promotionalBanner } from '@/lib/mockData';

export default function PromotionalBannerExample() {
  return (
    <PromotionalBanner
      image={promotionalBanner.image}
      title={promotionalBanner.title}
      subtitle={promotionalBanner.subtitle}
      ctaText={promotionalBanner.cta}
    />
  );
}
