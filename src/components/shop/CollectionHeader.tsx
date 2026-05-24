import Image from 'next/image';
import type { Collection } from '@/types/product';

interface CollectionHeaderProps {
  collection: Collection;
  productCount: number;
}

export function CollectionHeader({ collection, productCount }: CollectionHeaderProps) {
  return (
    <div className="mb-12">
      {collection.featuredAsset && (
        <div className="relative w-full h-64 lg:h-96 overflow-hidden mb-10">
          <Image
            src={collection.featuredAsset.preview}
            alt={collection.featuredAsset.alt ?? collection.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
            <span className="text-label-luxury text-accent/80 block mb-2">The Collection</span>
            <h1 className="font-serif text-headline font-light text-background leading-tight">
              {collection.name}
            </h1>
          </div>
        </div>
      )}

      {!collection.featuredAsset && (
        <div className="pb-8 border-b border-border mb-8">
          <span className="text-label-luxury text-muted-foreground block mb-3">The Collection</span>
          <div className="flex items-end justify-between gap-4">
            <h1 className="font-serif text-headline font-light">{collection.name}</h1>
            <p className="text-sm text-muted-foreground">
              {productCount} {productCount === 1 ? 'piece' : 'pieces'}
            </p>
          </div>
        </div>
      )}

      {collection.description && (
        <div className="max-w-2xl">
          <p className="text-sm text-muted-foreground leading-relaxed font-light">
            {collection.description}
          </p>
        </div>
      )}

      {collection.featuredAsset && (
        <div className="flex items-center justify-between mt-8 pb-8 border-b border-border">
          {collection.description && (
            <p className="text-sm text-muted-foreground leading-relaxed font-light max-w-2xl">
              {collection.description}
            </p>
          )}
          <p className="text-sm text-muted-foreground ml-auto flex-none">
            {productCount} {productCount === 1 ? 'piece' : 'pieces'}
          </p>
        </div>
      )}
    </div>
  );
}
