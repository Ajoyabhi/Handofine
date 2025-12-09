import ProductGrid from '../ProductGrid';
import { products } from '@/lib/mockData';
import { CartProvider } from '@/context/CartContext';

export default function ProductGridExample() {
  return (
    <CartProvider>
      <ProductGrid 
        products={products.slice(0, 4)} 
        title="Featured Products"
        showViewAll
      />
    </CartProvider>
  );
}
