import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-secondary/30 border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-display font-bold text-gradient mb-4">
              GlowBeauty
            </h3>
            <p className="text-sm text-muted-foreground">
              Luxury beauty products for the modern woman. Discover your glow.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/shop?category=skincare" className="text-muted-foreground hover:text-primary transition-colors">
                  Skincare
                </Link>
              </li>
              <li>
                <Link to="/shop?category=makeup" className="text-muted-foreground hover:text-primary transition-colors">
                  Makeup
                </Link>
              </li>
              <li>
                <Link to="/shop?category=hair" className="text-muted-foreground hover:text-primary transition-colors">
                  Hair Care
                </Link>
              </li>
              <li>
                <Link to="/shop?category=fragrance" className="text-muted-foreground hover:text-primary transition-colors">
                  Fragrance
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-semibold mb-4">Customer Care</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Sustainability
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            Made with <Heart className="h-4 w-4 text-primary fill-current" /> by GlowBeauty
          </p>
          <p className="mt-2">&copy; 2024 GlowBeauty. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
