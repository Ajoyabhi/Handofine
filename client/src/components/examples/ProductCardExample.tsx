import ProductCard from '../ProductCard';
import { products } from '@/lib/mockData';

export default function ProductCardExample() {
  const product = products[0];
  return (
    <div className="max-w-xs">
      <ProductCard
        id={product.id}
        name={product.name}
        price={product.price}
        salePrice={product.salePrice}
        image={product.image}
        isNew={product.isNew}
        isBestSeller={product.isBestSeller}
        inStock={product.inStock}
      />
    </div>
  );
}
