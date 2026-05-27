import Link from 'next/link';
import { iconMap, categoryColors } from '@/lib/tools-data';
import type { Category } from '@/lib/tools-data';

interface ToolCardProps {
  slug: string;
  name: string;
  icon: string;
  category: Category;
  description: string;
}

export function ToolCard({ slug, name, icon, category, description }: ToolCardProps) {
  const Icon = iconMap[icon];
  const catColor = categoryColors[category];

  return (
    <Link href={`/docs/${slug}`} className="group block">
      <div className="relative rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lg hover:shadow-brand/5 h-full">
        <div className="flex items-start gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 dark:bg-brand/15 text-brand dark:text-brand-accent group-hover:bg-brand/20 transition-colors">
            {Icon && <Icon size={20} />}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-sm font-semibold text-card-foreground group-hover:text-brand transition-colors">
                {name}
              </h3>
            </div>
            <span className={`inline-block rounded-md px-1.5 py-0.5 text-[10px] font-semibold mb-1.5 ${catColor}`}>
              {category}
            </span>
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
              {description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
