'use client';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface Category {
  value: string;
  label: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
}

export default function CategoryFilter({ categories, selectedCategory }: CategoryFilterProps) {
  const router = useRouter();

  const handleSelect = (value: string) => {
    if (value === 'all') {
      router.push('/boutique');
    } else {
      router.push(`/boutique?category=${encodeURIComponent(value)}`);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => handleSelect(cat.value)}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border',
            selectedCategory === cat.value || (cat.value === 'all' && !selectedCategory)
              ? 'bg-berry text-white border-berry shadow-sm'
              : 'bg-white text-warm-gray border-light-border hover:border-berry hover:text-berry'
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
