import Header from '../layout/Header';
import { CartProvider } from '@/context/CartContext';
import { ThemeProvider } from '@/context/ThemeContext';

export default function HeaderExample() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Header />
      </CartProvider>
    </ThemeProvider>
  );
}
