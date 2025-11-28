import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '@/data/products';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ProductCard } from '@/components/ProductCard';
import { Heart, ShoppingBag, Star, Share2, Check, ArrowLeft, Facebook, Twitter, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedShade, setSelectedShade] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const { addToCart, toggleFavorite, isFavorite } = useStore();

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Button onClick={() => navigate('/shop')}>
          Back to Shop
        </Button>
      </div>
    );
  }

  const favorite = isFavorite(product.id);
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success('Added to cart!', {
      description: product.title,
    });
  };

  const handleToggleFavorite = () => {
    toggleFavorite(product.id);
    toast.success(favorite ? 'Removed from favorites' : 'Added to favorites!', {
      description: product.title,
    });
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success('Link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSocialShare = (platform: string) => {
    const pageUrl = window.location.href;
    const shareText = `Check out ${product.title} from GlowBeauty!`;

    const urls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(shareText)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${pageUrl}`)}`,
    };

    window.open(urls[platform], '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6 animate-fade-in"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* Images */}
          <div className="space-y-4 animate-fade-in">
            <div className="aspect-square rounded-2xl overflow-hidden bg-secondary/50">
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="h-full w-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={cn(
                      'aspect-square rounded-lg overflow-hidden border-2 transition-all hover:opacity-100',
                      selectedImage === idx
                        ? 'border-primary opacity-100'
                        : 'border-transparent opacity-60'
                    )}
                  >
                    <img
                      src={img}
                      alt={`${product.title} ${idx + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            {/* Badges */}
            <div className="flex gap-2">
              {product.bestseller && (
                <Badge className="bg-gold text-foreground">Bestseller</Badge>
              )}
              {product.featured && (
                <Badge className="bg-primary text-primary-foreground">Featured</Badge>
              )}
            </div>

            {/* Brand and Title */}
            <div>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
                {product.brand}
              </p>
              <h1 className="text-3xl md:text-4xl font-display font-bold">
                {product.title}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'h-5 w-5',
                      i < Math.floor(product.rating)
                        ? 'fill-gold text-gold'
                        : 'text-muted'
                    )}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-muted-foreground">
                ({product.reviewsCount} reviews)
              </span>
            </div>

            {/* Price */}
            <p className="text-4xl font-bold text-gradient">
              ₹{product.price.toFixed(2)}
            </p>

            {/* Description */}
            <p className="text-muted-foreground">{product.description}</p>

            <Separator />

            {/* Shades */}
            {product.shades && product.shades.length > 0 && (
              <div>
                <p className="font-semibold mb-3">
                  Select Shade{selectedShade && `: ${selectedShade}`}
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.shades.map((shade) => (
                    <button
                      key={shade.name}
                      onClick={() => setSelectedShade(shade.name)}
                      className={cn(
                        'flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all hover:border-primary',
                        selectedShade === shade.name
                          ? 'border-primary bg-primary/5'
                          : 'border-border'
                      )}
                    >
                      <div
                        className="h-6 w-6 rounded-full border-2 border-background shadow-sm"
                        style={{ backgroundColor: shade.color }}
                      />
                      <span className="text-sm font-medium">{shade.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <p className="font-semibold mb-3">
                  Select Size{selectedSize && `: ${selectedSize}`}
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        'px-6 py-2 rounded-full border-2 transition-all hover:border-primary',
                        selectedSize === size
                          ? 'border-primary bg-primary/5 font-semibold'
                          : 'border-border'
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <Separator />

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                size="lg"
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base font-semibold"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                className={cn('h-12', favorite && 'text-primary border-primary')}
                onClick={handleToggleFavorite}
              >
                <Heart className={cn('h-5 w-5', favorite && 'fill-current')} />
              </Button>
              <div className="relative">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12"
                  onClick={() => setShowShareMenu(!showShareMenu)}
                >
                  {copied ? <Check className="h-5 w-5" /> : <Share2 className="h-5 w-5" />}
                </Button>

                {showShareMenu && (
                  <div className="absolute right-0 top-full mt-2 bg-card border rounded-xl shadow-lg p-2 z-10 animate-fade-in min-w-[200px]">
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={handleShare}
                    >
                      {copied ? <Check className="mr-2 h-4 w-4" /> : <Share2 className="mr-2 h-4 w-4" />}
                      Copy Link
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => handleSocialShare('facebook')}
                    >
                      <Facebook className="mr-2 h-4 w-4" />
                      Facebook
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => handleSocialShare('twitter')}
                    >
                      <Twitter className="mr-2 h-4 w-4" />
                      Twitter
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => handleSocialShare('whatsapp')}
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      WhatsApp
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Product Details */}
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Ingredients</h3>
                <p className="text-sm text-muted-foreground">
                  {product.ingredients.join(', ')}
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">How to Use</h3>
                <p className="text-sm text-muted-foreground">{product.howToUse}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};