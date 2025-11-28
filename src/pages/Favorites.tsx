import { Link } from 'react-router-dom';
import { products } from '@/data/products';
import { useStore } from '@/store/useStore';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

export const Favorites = () => {
  const { favorites } = useStore();
  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  if (favoriteProducts.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 animate-fade-in">
        <Heart className="h-20 w-20 text-muted-foreground mb-6" />
        <h1 className="text-3xl font-display font-bold mb-4">No favorites yet</h1>
        <p className="text-muted-foreground mb-8 text-center max-w-md">
          Start adding products to your favorites by clicking the heart icon on any product.
        </p>
        <Button size="lg" asChild>
          <Link to="/shop">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Your Favorites
          </h1>
          <p className="text-muted-foreground">
            {favoriteProducts.length} product{favoriteProducts.length !== 1 ? 's' : ''} saved
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
