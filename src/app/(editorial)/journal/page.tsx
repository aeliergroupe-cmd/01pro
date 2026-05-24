import type { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/seo';
import { MOCK_ARTICLES } from '@/lib/vendure/mock-data';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = genMeta({
  title: 'The Journal',
  description: 'Essays on tailoring, craft, and the considered wardrobe from ATELIER GROUPE.',
  path: '/journal',
});

export default function JournalPage() {
  const featured = MOCK_ARTICLES.filter((a) => a.featured)[0];
  const rest = MOCK_ARTICLES.filter((a) => !a.featured || a !== featured);

  return (
    <div className="gutter-x py-12 max-w-screen-xl mx-auto">
      {/* Header */}
      <div className="mb-12 pb-8 border-b border-border">
        <span className="text-label-luxury text-muted-foreground block mb-3">The Atelier Perspective</span>
        <h1 className="font-serif text-headline font-light">The <em className="italic">Journal</em></h1>
      </div>

      {/* Featured article */}
      {featured && (
        <Link href={`/journal/${featured.slug}`} className="group block mb-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative aspect-[4/3] overflow-hidden bg-surface">
              {featured.coverImage && (
                <Image
                  src={featured.coverImage}
                  alt={featured.coverImageAlt ?? featured.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              )}
            </div>
            <div>
              <span className="text-label-luxury text-accent capitalize block mb-4">
                {featured.category} · {featured.readingTime} min read
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl font-light leading-tight group-hover:text-accent transition-colors duration-300 mb-4">
                {featured.title}
              </h2>
              {featured.subtitle && (
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 font-light">
                  {featured.subtitle}
                </p>
              )}
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>{featured.author.name}</span>
                <span>·</span>
                <span>{formatDate(featured.publishedAt)}</span>
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* Article grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {rest.map((article) => (
          <Link key={article.id} href={`/journal/${article.slug}`} className="group block">
            <div className="relative aspect-[3/2] overflow-hidden bg-surface mb-5">
              {article.coverImage && (
                <Image
                  src={article.coverImage}
                  alt={article.coverImageAlt ?? article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              )}
            </div>
            <span className="text-label-luxury text-muted-foreground capitalize block mb-2">
              {article.category}
            </span>
            <h3 className="font-serif text-xl font-light leading-snug group-hover:text-accent transition-colors duration-200 mb-2">
              {article.title}
            </h3>
            <p className="text-xs text-muted-foreground">{formatDate(article.publishedAt)} · {article.readingTime} min</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
