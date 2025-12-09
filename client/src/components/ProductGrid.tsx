import ProductCard from './ProductCard';
import { useCart } from '@/context/CartContext';

interface Product {
  id: number;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  inStock?: boolean;
}

interface ProductGridProps {
  products: Product[];
  title?: string;
  sectionId?: string;
  showViewAll?: boolean;
  onViewAll?: () => void;
}

export default function ProductGrid({ products, title, sectionId, showViewAll, onViewAll }: ProductGridProps) {
  const { addItem } = useCart();

  return (
    <section className="py-12 md:py-16 lg:py-20" data-testid={`product-grid-section${sectionId ? `-${sectionId}` : ''}`}>
      <div className="max-w-7xl mx-auto px-4">
        {title && (
          <div className="flex items-center justify-between gap-4 mb-8">
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl" data-testid="text-grid-title">
              {title}
            </h2>
            {showViewAll && (
              <button 
                onClick={() => {
                  onViewAll?.();
                  console.log('View all clicked');
                }}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                data-testid="button-view-all"
              >
                View All
              </button>
            )}
          </div>
        )}
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {products.map(product => (
            <ProductCard
              key={product.id}
              {...product}
              sectionId={sectionId}
              onAddToCart={() => addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                salePrice: product.salePrice,
                image: product.image
              })}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
