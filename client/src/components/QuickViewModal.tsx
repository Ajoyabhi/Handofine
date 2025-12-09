import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus, ShoppingBag } from 'lucide-react';
import { formatPrice, getDiscountPercentage } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

interface QuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: number;
    name: string;
    price: number;
    salePrice?: number;
    image: string;
    description?: string;
    isNew?: boolean;
    isBestSeller?: boolean;
    inStock?: boolean;
  } | null;
}

export default function QuickViewModal({ isOpen, onClose, product }: QuickViewModalProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  if (!product) return null;

  const discount = product.salePrice ? getDiscountPercentage(product.price, product.salePrice) : 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        salePrice: product.salePrice,
        image: product.image
      });
    }
    onClose();
    setQuantity(1);
    console.log(`Added ${quantity} x ${product.name} to cart`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl" data-testid="quick-view-modal">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="aspect-square rounded-md overflow-hidden bg-muted">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
              data-testid="img-quick-view"
            />
          </div>
          
          <div className="flex flex-col">
            <DialogHeader>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {product.isNew && <Badge variant="default">New</Badge>}
                {product.isBestSeller && <Badge variant="secondary">Best Seller</Badge>}
                {discount > 0 && <Badge variant="destructive">-{discount}%</Badge>}
              </div>
              <DialogTitle className="font-serif text-2xl md:text-3xl" data-testid="text-quick-view-name">
                {product.name}
              </DialogTitle>
              <DialogDescription className="sr-only">
                Quick view of {product.name} - {product.description || 'View product details and add to cart'}
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex items-center gap-3 mt-4">
              {product.salePrice ? (
                <>
                  <span className="text-2xl font-bold" data-testid="text-quick-view-sale-price">
                    {formatPrice(product.salePrice)}
                  </span>
                  <span className="text-lg text-muted-foreground line-through" data-testid="text-quick-view-original-price">
                    {formatPrice(product.price)}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold" data-testid="text-quick-view-price">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            {product.description && (
              <p className="text-muted-foreground mt-4" data-testid="text-quick-view-description">
                {product.description}
              </p>
            )}

            <div className="flex items-center gap-4 mt-6">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  data-testid="button-quick-view-decrease"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center font-medium" data-testid="text-quick-view-quantity">
                  {quantity}
                </span>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  data-testid="button-quick-view-increase"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex-1" />

            <Button 
              size="lg" 
              className="w-full mt-6"
              disabled={!product.inStock}
              onClick={handleAddToCart}
              data-testid="button-quick-view-add-to-cart"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
