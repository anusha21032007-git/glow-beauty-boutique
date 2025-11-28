import { Link } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export const Cart = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useStore();

  const handleRemove = (productId: string, title: string) => {
    removeFromCart(productId);
    toast.success('Removed from cart', { description: title });
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 animate-fade-in">
        <ShoppingBag className="h-20 w-20 text-muted-foreground mb-6" />
        <h1 className="text-3xl font-display font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8 text-center max-w-md">
          Looks like you haven't added anything to your cart yet. Start shopping!
        </p>
        <Button size="lg" asChild>
          <Link to="/shop">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-8 animate-fade-in">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <div
                key={item.id}
                className="bg-card rounded-2xl p-4 md:p-6 shadow-sm animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex gap-4">
                  <Link
                    to={`/product/${item.id}`}
                    className="h-24 w-24 md:h-32 md:w-32 rounded-xl overflow-hidden bg-secondary/50 flex-shrink-0"
                  >
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="h-full w-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-4 mb-2">
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/product/${item.id}`}
                          className="hover:text-primary transition-colors"
                        >
                          <h3 className="font-semibold text-lg line-clamp-1">
                            {item.title}
                          </h3>
                        </Link>
                        <p className="text-sm text-muted-foreground">{item.brand}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive flex-shrink-0"
                        onClick={() => handleRemove(item.id, item.title)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium w-12 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <p className="text-xl font-bold text-gradient">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl p-6 shadow-sm sticky top-24 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-2xl font-display font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {subtotal < 50 && (
                  <p className="text-xs text-muted-foreground">
                    Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                )}
                <Separator />
                <div className="flex justify-between text-lg">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-gradient text-2xl">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base font-semibold mb-3"
              >
                Proceed to Checkout
              </Button>

              <Button variant="outline" size="lg" className="w-full" asChild>
                <Link to="/shop">Continue Shopping</Link>
              </Button>

              <div className="mt-6 p-4 bg-secondary/50 rounded-xl">
                <p className="text-sm text-muted-foreground text-center">
                  Free shipping on orders over $50
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
