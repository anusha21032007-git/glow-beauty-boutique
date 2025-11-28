import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Product } from '@/data/products';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, toggleFavorite, isFavorite } = useStore();
  const favorite = isFavorite(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success('Added to cart!', {
      description: product.title,
    });
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(product.id);
    toast.success(favorite ? 'Removed from favorites' : 'Added to favorites!', {
      description: product.title,
    });
  };

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="relative overflow-hidden rounded-2xl bg-card shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {product.bestseller && (
            <Badge className="bg-gold text-foreground font-semibold">
              Bestseller
            </Badge>
          )}
          {product.featured && (
            <Badge className="bg-primary text-primary-foreground font-semibold">
              Featured
            </Badge>
          )}
        </div>

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute top-3 right-3 z-10 bg-background/80 hover:bg-background transition-all duration-300",
            favorite && "text-primary"
          )}
          onClick={handleToggleFavorite}
        >
          <Heart className={cn("h-5 w-5", favorite && "fill-current")} />
        </Button>

        {/* Image */}
        <div className="aspect-square overflow-hidden bg-secondary/50">
          <img
            src={product.images[0]}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="mb-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {product.brand}
            </p>
            <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
              {product.title}
            </h3>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <Star className="h-4 w-4 fill-gold text-gold" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-xs text-muted-foreground">
              ({product.reviewsCount})
            </span>
          </div>

          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-foreground">
              ${product.price.toFixed(2)}
            </p>
            <Button
              size="icon"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-md hover:shadow-lg transition-all"
              onClick={handleAddToCart}
            >
              <ShoppingBag className="h-4 w-4" />
            </Button>
          </div>

          {/* Shades Preview */}
          {product.shades && product.shades.length > 0 && (
            <div className="mt-3 flex gap-1">
              {product.shades.slice(0, 5).map((shade) => (
                <div
                  key={shade.name}
                  className="h-6 w-6 rounded-full border-2 border-background shadow-sm"
                  style={{ backgroundColor: shade.color }}
                  title={shade.name}
                />
              ))}
              {product.shades.length > 5 && (
                <div className="h-6 w-6 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-medium">
                  +{product.shades.length - 5}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
