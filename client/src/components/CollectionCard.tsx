import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';

interface CollectionCardProps {
  id: number;
  name: string;
  slug: string;
  image: string;
  productCount: number;
}

export default function CollectionCard({ id, name, slug, image, productCount }: CollectionCardProps) {
  return (
    <Link href={`/collections/${slug}`}>
      <div 
        className="group relative aspect-[4/3] overflow-hidden rounded-md cursor-pointer"
        data-testid={`card-collection-${id}`}
      >
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          data-testid={`img-collection-${id}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
          <h3 
            className="font-serif text-xl md:text-2xl text-white mb-1"
            data-testid={`text-collection-name-${id}`}
          >
            {name}
          </h3>
          <div className="flex items-center gap-2 text-white/80">
            <span className="text-sm" data-testid={`text-product-count-${id}`}>
              {productCount} Products
            </span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}
