import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Eye } from 'lucide-react';
import { formatPrice, getDiscountPercentage } from '@/lib/utils';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  inStock?: boolean;
  onAddToCart?: () => void;
  onQuickView?: () => void;
}

export default function ProductCard({
  id,
  name,
  price,
  salePrice,
  image,
  isNew,
  isBestSeller,
  inStock = true,
  onAddToCart,
  onQuickView
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const discount = salePrice ? getDiscountPercentage(price, salePrice) : 0;

  return (
    <div 
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`card-product-${id}`}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-muted">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          data-testid={`img-product-${id}`}
        />
        
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {isNew && (
            <Badge variant="default" className="text-xs" data-testid={`badge-new-${id}`}>
              New
            </Badge>
          )}
          {isBestSeller && (
            <Badge variant="secondary" className="text-xs" data-testid={`badge-bestseller-${id}`}>
              Best Seller
            </Badge>
          )}
          {discount > 0 && (
            <Badge variant="destructive" className="text-xs" data-testid={`badge-sale-${id}`}>
              -{discount}%
            </Badge>
          )}
        </div>

        {!inStock && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <span className="text-muted-foreground font-medium">Out of Stock</span>
          </div>
        )}

        <div 
          className="absolute bottom-0 left-0 right-0 p-3 flex gap-2 transition-all duration-200"
          style={{ 
            visibility: isHovered ? 'visible' : 'hidden',
            opacity: isHovered ? 1 : 0
          }}
        >
          <Button 
            className="flex-1"
            size="sm"
            disabled={!inStock}
            onClick={() => {
              onAddToCart?.();
              console.log(`Added ${name} to cart`);
            }}
            data-testid={`button-add-to-cart-${id}`}
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
          <Button 
            variant="secondary"
            size="icon"
            onClick={() => {
              onQuickView?.();
              console.log(`Quick view ${name}`);
            }}
            data-testid={`button-quick-view-${id}`}
          >
            <Eye className="w-4 h-4" />
          </Button>
        </div>

        <div 
          className="md:hidden absolute bottom-0 left-0 right-0 p-3"
        >
          <Button 
            className="w-full"
            size="sm"
            disabled={!inStock}
            onClick={() => {
              onAddToCart?.();
              console.log(`Added ${name} to cart`);
            }}
            data-testid={`button-add-to-cart-mobile-${id}`}
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>
      </div>

      <div className="mt-3">
        <h3 
          className="font-medium text-foreground truncate"
          data-testid={`text-product-name-${id}`}
        >
          {name}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          {salePrice ? (
            <>
              <span 
                className="font-semibold text-foreground"
                data-testid={`text-sale-price-${id}`}
              >
                {formatPrice(salePrice)}
              </span>
              <span 
                className="text-sm text-muted-foreground line-through"
                data-testid={`text-original-price-${id}`}
              >
                {formatPrice(price)}
              </span>
            </>
          ) : (
            <span 
              className="font-semibold text-foreground"
              data-testid={`text-price-${id}`}
            >
              {formatPrice(price)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
