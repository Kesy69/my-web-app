import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  specifications: string;
  image: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface StoreState {
  products: Product[];
  cart: CartItem[];
  isAdmin: boolean;
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  login: (password: string) => boolean;
  logout: () => void;
  exportToCSV: () => string;
}

const ADMIN_PASSWORD = 'admin123';

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      products: [],
      cart: [],
      isAdmin: false,

      setProducts: (products) => set({ products }),

      addProduct: (product) => {
        set((state) => ({
          products: [...state.products, { ...product, id: Date.now().toString() }]
        }));
      },

      updateProduct: (id, updatedProduct) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updatedProduct } : p
          )
        }));
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id)
        }));
      },

      addToCart: (product) => {
        set((state) => {
          const existingItem = state.cart.find((item) => item.id === product.id);
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              )
            };
          }
          return {
            cart: [...state.cart, { ...product, quantity: 1 }]
          };
        });
      },

      removeFromCart: (id) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id)
        }));
      },

      updateCartQuantity: (id, quantity) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity } : item
          )
        }));
      },

      clearCart: () => {
        set({ cart: [] });
      },

      login: (password) => {
        if (password === ADMIN_PASSWORD) {
          set({ isAdmin: true });
          return true;
        }
        return false;
      },

      logout: () => {
        set({ isAdmin: false });
      },

      exportToCSV: () => {
        const products = get().products;
        const headers = ['ID', 'Nazwa', 'Kategoria', 'Cena', 'Opis', 'Specyfikacja', 'Stan magazynowy'];
        const rows = products.map(p => [
          p.id,
          p.name,
          p.category,
          p.price.toString(),
          p.description,
          p.specifications,
          p.stock.toString()
        ]);
        
        const csvContent = [
          headers.join(','),
          ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');
        
        return csvContent;
      }
    }),
    {
      name: 'ecommerce-store'
    }
  )
);