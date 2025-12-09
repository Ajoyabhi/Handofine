import { Truck, Shield, RefreshCw, Headphones } from 'lucide-react';

const badges = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On orders above Rs. 999'
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description: '100% secure checkout'
  },
  {
    icon: RefreshCw,
    title: 'Easy Returns',
    description: '7-day return policy'
  },
  {
    icon: Headphones,
    title: 'Customer Support',
    description: 'We are here to help'
  }
];

export default function TrustBadges() {
  return (
    <section className="py-12 md:py-16 border-t" data-testid="trust-badges">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {badges.map((badge, index) => (
            <div 
              key={badge.title} 
              className="flex flex-col items-center text-center"
              data-testid={`trust-badge-${index}`}
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <badge.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-medium mb-1" data-testid={`text-badge-title-${index}`}>
                {badge.title}
              </h3>
              <p className="text-sm text-muted-foreground" data-testid={`text-badge-description-${index}`}>
                {badge.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
