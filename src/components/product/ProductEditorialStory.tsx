import Image from 'next/image';
import type { Product } from '@/types/product';

interface ProductEditorialStoryProps {
  product: Product;
}

const EDITORIAL_ASSETS: Record<string, string> = {
  'cote-dazur-suit':
    'https://images.unsplash.com/photo-1594938298603-c8148c4b4a9f?w=1400&auto=format&fit=crop&q=80',
  'riviera-blazer':
    'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=1400&auto=format&fit=crop&q=80',
  default:
    'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1400&auto=format&fit=crop&q=80',
};

export function ProductEditorialStory({ product }: ProductEditorialStoryProps) {
  const editorialImage =
    EDITORIAL_ASSETS[product.slug] ?? EDITORIAL_ASSETS['default'] ?? 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1400&auto=format&fit=crop&q=80';

  const category = product.facetValues.find((fv) => fv.facet.code === 'category')?.name ?? 'Tailoring';

  return (
    <section className="border-t border-border pt-16 pb-8">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="relative aspect-[4/5] overflow-hidden bg-surface">
          <Image
            src={editorialImage}
            alt={`${product.name} — Editorial`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div className="flex flex-col justify-center">
          <span className="text-label-luxury text-muted-foreground block mb-4">
            The Atelier Perspective
          </span>
          <h2 className="font-serif text-3xl lg:text-4xl font-light leading-tight mb-6">
            {category} as a{' '}
            <em className="italic">Practice</em>
          </h2>
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed font-light">
            <p>
              At ATELIER GROUPE, we regard each garment not as a product but as a proposal — a
              considered argument for how a man might choose to present himself to the world. The{' '}
              {product.name.replace('The ', '')} represents this philosophy in concentrated form.
            </p>
            <p>
              Every cloth is selected from mills that share our conviction that authenticity of
              material cannot be substituted. Every stitch is placed by hands trained across
              generations of European tailoring tradition.
            </p>
            <p className="font-serif text-base text-foreground italic">
              &ldquo;The suit is the ultimate expression of masculine restraint.
              It is architecture for the body.&rdquo;
            </p>
          </div>
          {product.customFields?.madeIn && (
            <div className="mt-8 pt-6 border-t border-border">
              <span className="text-label-luxury text-muted-foreground block mb-1">Provenance</span>
              <span className="text-sm text-foreground font-light">{product.customFields.madeIn}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
