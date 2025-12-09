import { useEffect } from 'react';
import CartDrawer from '../CartDrawer';
import { CartProvider, useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { products } from '@/lib/mockData';

function CartDemo() {
  const { addItem, setIsOpen } = useCart();

  useEffect(() => {
    // todo: remove mock functionality - add sample items for demo
    addItem({
      id: products[0].id,
      name: products[0].name,
      price: products[0].price,
      salePrice: products[0].salePrice,
      image: products[0].image
    });
    addItem({
      id: products[1].id,
      name: products[1].name,
      price: products[1].price,
      image: products[1].image
    });
  }, []);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} data-testid="button-open-cart">
        Open Cart
      </Button>
      <CartDrawer />
    </>
  );
}

export default function CartDrawerExample() {
  return (
    <CartProvider>
      <CartDemo />
    </CartProvider>
  );
}
