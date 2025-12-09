import CollectionCard from './CollectionCard';

interface Collection {
  id: number;
  name: string;
  slug: string;
  image: string;
  productCount: number;
}

interface CollectionsSectionProps {
  collections: Collection[];
  title?: string;
}

export default function CollectionsSection({ collections, title = "Our Collections" }: CollectionsSectionProps) {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-card" data-testid="collections-section">
      <div className="max-w-7xl mx-auto px-4">
        <h2 
          className="font-serif text-2xl md:text-3xl lg:text-4xl text-center mb-8 md:mb-12"
          data-testid="text-collections-title"
        >
          {title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {collections.map(collection => (
            <CollectionCard key={collection.id} {...collection} />
          ))}
        </div>
      </div>
    </section>
  );
}
