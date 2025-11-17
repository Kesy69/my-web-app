# E-Commerce Store - Plan Implementacji

## Struktura plików do stworzenia:

1. **src/pages/Index.tsx** - Strona główna z listą produktów
2. **src/pages/ProductDetail.tsx** - Strona szczegółów produktu
3. **src/pages/Cart.tsx** - Strona koszyka
4. **src/pages/Checkout.tsx** - Strona podsumowania zamówienia
5. **src/pages/Admin.tsx** - Panel administratora
6. **src/components/ProductCard.tsx** - Komponent karty produktu
7. **src/components/Navbar.tsx** - Nawigacja z koszykiem
8. **src/lib/store.ts** - Zarządzanie stanem (produkty, koszyk)

## Funkcjonalności:

### 1. Strona główna (Index.tsx)
- Wyświetlanie produktów w siatce
- Filtrowanie po kategoriach
- Wyszukiwanie produktów
- Dodawanie do koszyka

### 2. Panel administratora (Admin.tsx)
- Logowanie (prosty system)
- Dodawanie/edytowanie/usuwanie produktów
- Eksport do CSV dla OLX/Allegro

### 3. Szczegóły produktu (ProductDetail.tsx)
- Pełny opis i specyfikacja
- Galeria zdjęć
- Dodawanie do koszyka

### 4. Koszyk (Cart.tsx)
- Lista produktów w koszyku
- Zmiana ilości
- Usuwanie produktów
- Podsumowanie ceny

### 5. Checkout (Checkout.tsx)
- Formularz danych klienta
- Podsumowanie zamówienia
- Informacja o płatności (do późniejszej integracji)

## Technologie:
- React + TypeScript
- Shadcn-ui components
- LocalStorage dla danych (produkty, koszyk)
- React Router dla nawigacji