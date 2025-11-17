import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useStore } from '@/lib/store';
import Navbar from '@/components/Navbar';
import { toast } from 'sonner';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const products = useStore((state) => state.products);
  const addToCart = useStore((state) => state.addToCart);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground">Produkt nie został znaleziony</p>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast.success('Dodano do koszyka!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Powrót
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="aspect-square overflow-hidden rounded-lg bg-white">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-3">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <p className="text-4xl font-bold text-primary mb-4">{product.price} zł</p>
              <p className="text-muted-foreground mb-4">{product.description}</p>
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Specyfikacja techniczna:</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {product.specifications}
                </p>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Stan magazynowy: <span className="font-semibold">{product.stock} szt.</span>
              </p>
              
              <Button 
                onClick={handleAddToCart} 
                size="lg" 
                className="w-full"
                disabled={product.stock === 0}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {product.stock === 0 ? 'Brak w magazynie' : 'Dodaj do koszyka'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}