import { Heart, Plus, Star } from "lucide-react";
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
  favorite: boolean;
  onFavorite: () => void;
  onAdd: () => void;
}

export default function ProductCard({ product, favorite, onFavorite, onAdd }: ProductCardProps) {
  const discount = Math.round(product.discountPercentage || 0);

  return (
    <article className="product-card">
      <div className="product-image">
        {discount > 10 && <span className="badge">-{discount}%</span>}
        <button className={`favorite ${favorite ? "liked" : ""}`} onClick={onFavorite} aria-label={favorite ? "Remove from favorites" : "Add to favorites"} aria-pressed={favorite}>
          <Heart size={18} fill={favorite ? "currentColor" : "none"} />
        </button>
        <img src={product.thumbnail} alt={product.title} loading="lazy" />
        <button className="quick-add" onClick={onAdd}>Add to bag <Plus size={15} /></button>
      </div>
      <div className="product-meta">
        <div><p>{product.brand || product.category}</p><h3>{product.title}</h3></div>
        <strong>${product.price.toFixed(2)}</strong>
      </div>
      <div className="rating"><Star size={12} fill="currentColor" /> {product.rating.toFixed(1)} <span>·</span> {product.stock} in stock</div>
    </article>
  );
}
