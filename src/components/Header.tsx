import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Search, ShoppingBag, Menu, X } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  onSearch?: (query: string) => void;
  onCartOpen?: () => void;
}

export const Header = ({ onSearch, onCartOpen }: HeaderProps) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { favorites, getCartItemsCount } = useStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-20 blur-xl" />
              <h1 className="relative text-2xl font-display font-bold text-gradient">
                GlowBeauty
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link to="/shop" className="text-sm font-medium transition-colors hover:text-primary">
              Shop
            </Link>
            <Link to="/shop?category=skincare" className="text-sm font-medium transition-colors hover:text-primary">
              Skincare
            </Link>
            <Link to="/shop?category=makeup" className="text-sm font-medium transition-colors hover:text-primary">
              Makeup
            </Link>
            <Link to="/shop?category=hair" className="text-sm font-medium transition-colors hover:text-primary">
              Hair
            </Link>
            <Link to="/shop?category=fragrance" className="text-sm font-medium transition-colors hover:text-primary">
              Fragrance
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:block">
              {searchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center animate-fade-in">
                  <Input
                    type="search"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64"
                    autoFocus
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setSearchOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </form>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchOpen(true)}
                >
                  <Search className="h-5 w-5" />
                </Button>
              )}
            </div>

            {/* Favorites */}
            <Link to="/favorites">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
                {favorites.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary">
                    {favorites.length}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={onCartOpen}
            >
              <ShoppingBag className="h-5 w-5" />
              {getCartItemsCount() > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary">
                  {getCartItemsCount()}
                </Badge>
              )}
            </Button>

            {/* Mobile Menu */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 space-y-2 animate-fade-in border-t">
            <Link
              to="/"
              className="block px-4 py-2 text-sm font-medium hover:bg-secondary rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="block px-4 py-2 text-sm font-medium hover:bg-secondary rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              to="/shop?category=skincare"
              className="block px-4 py-2 text-sm font-medium hover:bg-secondary rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Skincare
            </Link>
            <Link
              to="/shop?category=makeup"
              className="block px-4 py-2 text-sm font-medium hover:bg-secondary rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Makeup
            </Link>
            <Link
              to="/shop?category=hair"
              className="block px-4 py-2 text-sm font-medium hover:bg-secondary rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Hair
            </Link>
            <Link
              to="/shop?category=fragrance"
              className="block px-4 py-2 text-sm font-medium hover:bg-secondary rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Fragrance
            </Link>
            <div className="px-4 py-2">
              <form onSubmit={handleSearch}>
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
