import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Filter, X } from 'lucide-react';

export const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get('category')
  );
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const category = searchParams.get('category');
    setSelectedCategory(category);
  }, [searchParams]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // Assuming featured items are newest
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      case 'bestseller':
        filtered.sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0));
        break;
      default:
        // Featured first
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return filtered;
  }, [selectedCategory, sortBy]);

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    if (category) {
      setSearchParams({ category });
    } else {
      setSearchParams({});
    }
  };

  const categories = [
    { value: 'skincare', label: 'Skincare' },
    { value: 'makeup', label: 'Makeup' },
    { value: 'hair', label: 'Hair Care' },
    { value: 'fragrance', label: 'Fragrance' },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            {selectedCategory
              ? categories.find((c) => c.value === selectedCategory)?.label
              : 'All Products'}
          </h1>
          <p className="text-muted-foreground">
            {filteredAndSortedProducts.length} product
            {filteredAndSortedProducts.length !== 1 ? 's' : ''} available
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="sm:hidden"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>

              <div className={`${showFilters ? 'flex' : 'hidden'} sm:flex flex-wrap gap-2`}>
                <Badge
                  variant={selectedCategory === null ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => handleCategoryChange(null)}
                >
                  All
                  {selectedCategory === null && (
                    <X className="ml-1 h-3 w-3" />
                  )}
                </Badge>

                {categories.map((cat) => (
                  <Badge
                    key={cat.value}
                    variant={selectedCategory === cat.value ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() =>
                      handleCategoryChange(
                        selectedCategory === cat.value ? null : cat.value
                      )
                    }
                  >
                    {cat.label}
                    {selectedCategory === cat.value && (
                      <X className="ml-1 h-3 w-3" />
                    )}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                Sort by:
              </span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="bestseller">Bestsellers</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredAndSortedProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground mb-4">
              No products found in this category.
            </p>
            <Button onClick={() => handleCategoryChange(null)}>
              View All Products
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${(index % 12) * 0.05}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
