import { useCallback, useEffect, useMemo, useState } from "react";
import { ShoppingBag } from "lucide-react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Shop from "./components/Shop";
import Story from "./components/Story";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import FavoritesDrawer from "./components/FavoritesDrawer";
import type { CartItem, Category, Product, ProductsResponse, SortOption } from "./types";

const PRODUCTS_API = "https://dummyjson.com/products?limit=100";
const CATEGORIES_API = "https://dummyjson.com/products/categories";

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("featured");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem("velora-favorites");
      const parsed: unknown = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) && parsed.every((id) => typeof id === "number") ? parsed : [];
    } catch {
      return [];
    }
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);

  const loadStore = useCallback(async (signal?: AbortSignal) => {
    try {
      setLoading(true);
      setError("");
      const [productsResponse, categoriesResponse] = await Promise.all([
        fetch(PRODUCTS_API, { signal }),
        fetch(CATEGORIES_API, { signal }),
      ]);

      if (!productsResponse.ok || !categoriesResponse.ok) {
        throw new Error("Request failed");
      }

      const productData: ProductsResponse = await productsResponse.json();
      const categoryData: Category[] = await categoriesResponse.json();
      setProducts(productData.products ?? []);
      setCategories(categoryData ?? []);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setError("We couldn't load the collection. Please try again.");
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    loadStore(controller.signal);
    return () => controller.abort();
  }, [loadStore]);

  useEffect(() => {
    localStorage.setItem("velora-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeCategory !== "All") {
      result = result.filter((product) => product.category === activeCategory);
    }

    const search = query.trim().toLowerCase();
    if (search) {
      result = result.filter((product) =>
        [product.title, product.brand, product.category]
          .filter(Boolean)
          .some((value) => value!.toLowerCase().includes(search))
      );
    }

    if (sort === "price-low") result.sort((a, b) => a.price - b.price);
    if (sort === "price-high") result.sort((a, b) => b.price - a.price);
    if (sort === "rating") result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [products, activeCategory, query, sort]);

  const addToCart = (product: Product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...current, { ...product, qty: 1 }];
    });
    setCartOpen(true);
  };

  const updateQuantity = (id: number, amount: number) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty + amount } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (id: number) => {
    setCart((current) => current.filter((item) => item.id !== id));
  };

  const toggleFavorite = (id: number) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((favoriteId) => favoriteId !== id)
        : [...current, id]
    );
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const favoriteProducts = products.filter((product) => favorites.includes(product.id));

  return (
    <div className="app">
      <div className="announcement">
        <span>FREE SHIPPING OVER $75</span>
        <i />
        <span>30-DAY EASY RETURNS</span>
        <i />
        <span>NEW SEASON IS HERE</span>
      </div>

      <Header
        query={query}
        setQuery={setQuery}
        cartCount={cartCount}
        favoritesCount={favorites.length}
        onCartOpen={() => setCartOpen(true)}
        onFavoritesOpen={() => setFavoritesOpen(true)}
      />

      <main>
        <Hero />
        <Shop
          products={filteredProducts}
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          sort={sort}
          setSort={setSort}
          loading={loading}
          error={error}
          onRetry={() => loadStore()}
          favorites={favorites}
          onFavorite={toggleFavorite}
          onAdd={addToCart}
        />
        <Story />
        <Newsletter />
      </main>

      <Footer />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        total={cartTotal}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />

      <FavoritesDrawer open={favoritesOpen} onClose={() => setFavoritesOpen(false)} products={favoriteProducts} onRemove={toggleFavorite} onAdd={addToCart} />

      <button className="mobile-cart" onClick={() => setCartOpen(true)}>
        <ShoppingBag size={19} />
        <span>Bag</span>
        {cartCount > 0 && <b>{cartCount}</b>}
      </button>
    </div>
  );
}
