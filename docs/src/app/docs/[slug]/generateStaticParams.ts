import { tools } from '@/lib/tools-data';

export function generateStaticParams() {
  return tools.map((t) => ({
    slug: t.slug,
  }));
}