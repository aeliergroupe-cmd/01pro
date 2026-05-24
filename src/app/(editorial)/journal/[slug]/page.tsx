import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { generateMetadata as genMeta } from '@/lib/seo';
import { MOCK_ARTICLES } from '@/lib/vendure/mock-data';
import { formatDate } from '@/lib/utils';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return MOCK_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = MOCK_ARTICLES.find((a) => a.slug === slug);
  if (!article) return {};
  return genMeta({
    title: article.title,
    description: article.excerpt,
    path: `/journal/${slug}`,
    image: article.coverImage,
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = MOCK_ARTICLES.find((a) => a.slug === slug);
  if (!article) notFound();

  const related = MOCK_ARTICLES.filter(
    (a) => a.slug !== slug && a.category === article.category
  ).slice(0, 2);

  return (
    <article className="max-w-screen-xl mx-auto">
      {/* Hero */}
      <div className="relative w-full aspect-[16/7] overflow-hidden bg-surface mb-12">
        {article.coverImage && (
          <Image
            src={article.coverImage}
            alt={article.coverImageAlt ?? article.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent" />
      </div>

      {/* Content */}
      <div className="gutter-x">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/journal" className="hover:text-foreground transition-colors">Journal</Link>
          <span>/</span>
          <span className="text-foreground capitalize">{article.category}</span>
        </nav>

        <div className="grid lg:grid-cols-[1fr_280px] gap-12 lg:gap-20">
          <div>
            {/* Article header */}
            <header className="mb-10">
              <span className="text-label-luxury text-accent capitalize block mb-4">
                {article.category} · {article.readingTime} min read
              </span>
              <h1 className="font-serif text-4xl lg:text-5xl font-light leading-tight mb-4">
                {article.title}
              </h1>
              {article.subtitle && (
                <p className="text-lg text-muted-foreground font-light leading-relaxed mb-6 font-serif italic">
                  {article.subtitle}
                </p>
              )}
              <div className="flex items-center gap-4 text-sm text-muted-foreground border-t border-border pt-6">
                <div>
                  <p className="text-foreground font-light">{article.author.name}</p>
                  <p className="text-xs mt-0.5">{article.author.role}</p>
                </div>
                <span>·</span>
                <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
              </div>
            </header>

            {/* Body */}
            <div className="prose prose-sm max-w-none text-foreground font-light leading-relaxed">
              {article.body.split('\n\n').filter(Boolean).map((para, i) => (
                <p key={i} className="mb-6 text-muted-foreground font-light leading-relaxed">
                  {para.trim()}
                </p>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start space-y-8">
            <div className="border border-border p-6">
              <p className="text-label-luxury text-muted-foreground mb-3">From the Atelier</p>
              <p className="font-serif text-sm font-light text-foreground italic leading-relaxed">
                &ldquo;Quality is remembered long after price is forgotten.&rdquo;
              </p>
            </div>

            <div>
              <p className="text-label-luxury text-muted-foreground mb-4">Discover</p>
              <Link
                href="/shop"
                className="block w-full h-12 border border-border flex items-center justify-center text-label-luxury text-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
              >
                Explore the Collection
              </Link>
            </div>
          </aside>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <section className="mt-20 pt-12 border-t border-border">
            <h2 className="font-serif text-2xl font-light mb-8">Further Reading</h2>
            <div className="grid sm:grid-cols-2 gap-8">
              {related.map((rel) => (
                <Link key={rel.id} href={`/journal/${rel.slug}`} className="group block">
                  <div className="relative aspect-[3/2] overflow-hidden bg-surface mb-4">
                    {rel.coverImage && (
                      <Image
                        src={rel.coverImage}
                        alt={rel.coverImageAlt ?? rel.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    )}
                  </div>
                  <h3 className="font-serif text-xl font-light group-hover:text-accent transition-colors duration-200">
                    {rel.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-2">{formatDate(rel.publishedAt)}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
