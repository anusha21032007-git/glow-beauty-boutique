import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Shield, Truck } from 'lucide-react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';

export const Home = () => {
  const featuredProducts = products.filter((p) => p.featured);
  const bestsellers = products.filter((p) => p.bestseller);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-light/20 via-background to-peach/10">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=1200&q=80')] bg-cover bg-center opacity-10" />
        
        <div className="container relative mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">New Collection Available</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
              Discover Your
              <span className="block text-gradient mt-2">Natural Glow</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
              Premium beauty products crafted with the finest ingredients. 
              Elevate your skincare routine with our luxury collection.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-12 shadow-lg hover:shadow-xl transition-all" asChild>
                <Link to="/shop">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="px-8 h-12" asChild>
                <Link to="/shop?category=skincare">
                  Explore Skincare
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4 animate-fade-in">
              <div className="bg-primary/10 p-3 rounded-xl">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Premium Quality</h3>
                <p className="text-sm text-muted-foreground">
                  Only the finest ingredients in every product
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="bg-primary/10 p-3 rounded-xl">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Free Shipping</h3>
                <p className="text-sm text-muted-foreground">
                  On orders over ₹50 worldwide
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="bg-primary/10 p-3 rounded-xl">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Satisfaction Guaranteed</h3>
                <p className="text-sm text-muted-foreground">
                  30-day money back guarantee
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Featured Products
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Handpicked favorites from our luxury collection
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/shop">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-16 bg-gradient-to-b from-background to-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-gold/20 text-gold-dark px-4 py-2 rounded-full mb-4">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Customer Favorites</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Bestsellers
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our most loved products that keep customers coming back
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.slice(0, 4).map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Shop by Category
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find exactly what you're looking for
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: 'Skincare',
                image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80',
                category: 'skincare',
              },
              {
                name: 'Makeup',
                image: 'https://images.unsplash.com/photo-1631730486572-226d1f595b68?w=600&q=80',
                category: 'makeup',
              },
              {
                name: 'Hair Care',
                image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=80',
                category: 'hair',
              },
              {
                name: 'Fragrance',
                image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=80',
                category: 'fragrance',
              },
            ].map((cat, index) => (
              <Link
                key={cat.category}
                to={`/shop?category=${cat.category}`}
                className="group relative overflow-hidden rounded-2xl aspect-square animate-fade-in hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-display font-bold mb-2">
                    {cat.name}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all">
                    Shop Now
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
        <div className="container mx-auto px-4 text-center animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Join the GlowBeauty Community
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive offers, beauty tips, and new product launches.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex h-12 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground whitespace-nowrap px-8">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};