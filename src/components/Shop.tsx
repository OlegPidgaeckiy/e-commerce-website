import { ChevronDown, Search, SlidersHorizontal } from "lucide-react";
import ProductCard from "./ProductCard";
import type { Category, Product, SortOption } from "../types";

interface ShopProps {
  products: Product[];
  categories: Category[];
  activeCategory: string;
  setActiveCategory: (slug: string) => void;
  sort: SortOption;
  setSort: (sort: SortOption) => void;
  loading: boolean;
  error: string;
  onRetry: () => void;
  favorites: number[];
  onFavorite: (id: number) => void;
  onAdd: (product: Product) => void;
}

function categoryData(category: Category | string): { slug: string; name: string } {
  if (typeof category === "string") return { slug: category, name: category };
  return { slug: category.slug || category.name || "", name: category.name || category.slug || "" };
}

function titleCase(value: string): string {
  return value.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function Shop({ products, categories, activeCategory, setActiveCategory, sort, setSort, loading, error, onRetry, favorites, onFavorite, onAdd }: ShopProps) {
  return (
    <section className="shop-section" id="shop">
      <div className="section-heading">
        <div><p className="eyebrow">CURATED STORE</p><h2>Shop the collection</h2></div>
        <p className="result-count">{products.length} products</p>
      </div>

      <div className="toolbar">
        <div className="categories">
          <button className={activeCategory === "All" ? "active" : ""} onClick={() => setActiveCategory("All")}>All</button>
          {categories.slice(0, 8).map((category) => {
            const item = categoryData(category);
            return (
              <button key={item.slug} className={activeCategory === item.slug ? "active" : ""} onClick={() => setActiveCategory(item.slug)}>
                {titleCase(item.name)}
              </button>
            );
          })}
        </div>

        <label className="sort">
          <SlidersHorizontal size={16} />
          <select value={sort} onChange={(event) => setSort(event.target.value as SortOption)}>
            <option value="featured">Featured</option>
            <option value="rating">Top rated</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
          </select>
          <ChevronDown size={14} />
        </label>
      </div>

      {loading && <div className="product-grid">{Array.from({ length: 8 }).map((_, index) => <div className="skeleton" key={index}><div /><span /><span /></div>)}</div>}

      {!loading && error && <div className="state-message"><Search size={34} /><h3>{error}</h3><button onClick={onRetry}>Try again</button></div>}

      {!loading && !error && products.length === 0 && <div className="state-message"><Search size={34} /><h3>No products found</h3><p>Try another search or category.</p></div>}

      {!loading && !error && products.length > 0 && (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} favorite={favorites.includes(product.id)} onFavorite={() => onFavorite(product.id)} onAdd={() => onAdd(product)} />
          ))}
        </div>
      )}
    </section>
  );
}
