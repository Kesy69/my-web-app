import { Link } from 'react-router-dom';
import { ShoppingCart, Store, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/lib/store';

export default function Navbar() {
  const cart = useStore((state) => state.cart);
  const isAdmin = useStore((state) => state.isAdmin);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="border-b bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
            <Store className="h-6 w-6" />
            <span>ElektroSklep</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link to="/admin">
              <Button variant={isAdmin ? "default" : "ghost"} size="sm">
                <UserCircle className="h-5 w-5 mr-2" />
                Panel Admin
              </Button>
            </Link>
            
            <Link to="/cart">
              <Button variant="outline" size="sm" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}