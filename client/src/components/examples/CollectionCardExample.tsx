import CollectionCard from '../CollectionCard';
import { collections } from '@/lib/mockData';

export default function CollectionCardExample() {
  const collection = collections[0];
  return (
    <div className="max-w-md">
      <CollectionCard {...collection} />
    </div>
  );
}
