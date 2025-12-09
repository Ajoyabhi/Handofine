import { useState } from 'react';
import QuickViewModal from '../QuickViewModal';
import { Button } from '@/components/ui/button';
import { products } from '@/lib/mockData';
import { CartProvider } from '@/context/CartContext';

function QuickViewDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const product = products[0];

  return (
    <>
      <Button onClick={() => setIsOpen(true)} data-testid="button-open-quick-view">
        Open Quick View
      </Button>
      <QuickViewModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        product={product}
      />
    </>
  );
}

export default function QuickViewModalExample() {
  return (
    <CartProvider>
      <QuickViewDemo />
    </CartProvider>
  );
}
