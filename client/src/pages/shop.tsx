import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/CartDrawer';
import ProductCard from '@/components/ProductCard';
import QuickViewModal from '@/components/QuickViewModal';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Grid3X3, LayoutGrid, SlidersHorizontal } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import type { Product, Collection } from '@shared/schema';

export default function Shop() {
  const { addItem } = useCart();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [sortBy, setSortBy] = useState('featured');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [gridCols, setGridCols] = useState<3 | 4>(4);

  const { data: products = [], isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const { data: collections = [], isLoading: collectionsLoading } = useQuery<Collection[]>({
    queryKey: ['/api/collections'],
  });

  const filteredProducts = selectedCategories.length > 0
    ? products.filter(p => p.category && selectedCategories.includes(p.category))
    : products;

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return (a.salePrice ?? a.price) - (b.salePrice ?? b.price);
      case 'price-high':
        return (b.salePrice ?? b.price) - (a.salePrice ?? a.price);
      case 'newest':
        return a.isNew ? -1 : 1;
      default:
        return a.isBestSeller ? -1 : 1;
    }
  });

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium mb-3">Categories</h4>
        {collectionsLoading ? (
          <div className="space-y-2">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="h-5 w-32" />
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {collections.map(collection => (
              <div key={collection.slug} className="flex items-center gap-2">
                <Checkbox 
                  id={collection.slug}
                  checked={selectedCategories.includes(collection.slug)}
                  onCheckedChange={() => toggleCategory(collection.slug)}
                  data-testid={`checkbox-category-${collection.slug}`}
                />
                <Label htmlFor={collection.slug} className="text-sm cursor-pointer">
                  {collection.name} ({products.filter(p => p.category === collection.slug).length})
                </Label>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <Separator />
      
      <div>
        <h4 className="font-medium mb-3">Availability</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Checkbox id="in-stock" data-testid="checkbox-in-stock" />
            <Label htmlFor="in-stock" className="text-sm cursor-pointer">
              In Stock ({products.filter(p => p.inStock).length})
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="on-sale" data-testid="checkbox-on-sale" />
            <Label htmlFor="on-sale" className="text-sm cursor-pointer">
              On Sale ({products.filter(p => p.salePrice).length})
            </Label>
          </div>
        </div>
      </div>

      {selectedCategories.length > 0 && (
        <>
          <Separator />
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => setSelectedCategories([])}
            data-testid="button-clear-filters"
          >
            Clear Filters
          </Button>
        </>
      )}
    </div>
  );

  const ProductSkeleton = () => (
    <div className="space-y-3">
      <Skeleton className="aspect-square rounded-md" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );

  return (
    <div className="min-h-screen bg-background" data-testid="page-shop">
      <TopBar />
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="hidden md:block w-64 flex-shrink-0">
            <h2 className="font-serif text-xl mb-6">Filters</h2>
            <FilterContent />
          </aside>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="font-serif text-2xl md:text-3xl" data-testid="text-shop-title">
                  All Products
                </h1>
                <p className="text-sm text-muted-foreground mt-1" data-testid="text-product-count">
                  {sortedProducts.length} products
                </p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="md:hidden" data-testid="button-mobile-filters">
                      <SlidersHorizontal className="w-4 h-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]" data-testid="select-sort">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>

                <div className="hidden sm:flex items-center gap-1">
                  <Button 
                    variant={gridCols === 3 ? "secondary" : "ghost"} 
                    size="icon"
                    onClick={() => setGridCols(3)}
                    data-testid="button-grid-3"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant={gridCols === 4 ? "secondary" : "ghost"} 
                    size="icon"
                    onClick={() => setGridCols(4)}
                    data-testid="button-grid-4"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {productsLoading ? (
              <div className={`grid grid-cols-2 ${gridCols === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-4 md:gap-6`}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                  <ProductSkeleton key={i} />
                ))}
              </div>
            ) : (
              <div className={`grid grid-cols-2 ${gridCols === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-4 md:gap-6`}>
                {sortedProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    salePrice={product.salePrice ?? undefined}
                    image={product.image || '/placeholder-product.jpg'}
                    isNew={product.isNew ?? false}
                    isBestSeller={product.isBestSeller ?? false}
                    inStock={product.inStock ?? true}
                    sectionId="shop"
                    onAddToCart={() => addItem({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      salePrice: product.salePrice ?? undefined,
                      image: product.image || '/placeholder-product.jpg'
                    })}
                    onQuickView={() => setQuickViewProduct(product)}
                  />
                ))}
              </div>
            )}

            {!productsLoading && sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No products found matching your filters.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setSelectedCategories([])}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <CartDrawer />
      <QuickViewModal 
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        product={quickViewProduct}
      />
    </div>
  );
}
