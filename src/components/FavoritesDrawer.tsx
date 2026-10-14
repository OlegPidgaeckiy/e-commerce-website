import { Heart, X } from "lucide-react";
import type { Product } from "../types";

interface FavoritesDrawerProps {
  open: boolean;
  onClose: () => void;
  products: Product[];
  onRemove: (id: number) => void;
  onAdd: (product: Product) => void;
}

export default function FavoritesDrawer({ open, onClose, products, onRemove, onAdd }: FavoritesDrawerProps) {
  if (!open) return null;

  const addToBag = (product: Product) => {
    onAdd(product);
    onClose();
  };

  return (
    <div className="overlay" onClick={onClose}>
      <aside className="favorites-drawer" onClick={(event) => event.stopPropagation()} aria-label="Favorites">
        <div className="cart-head"><div><p className="eyebrow">SAVED FOR LATER</p><h2>Favorites</h2></div><button onClick={onClose} aria-label="Close favorites"><X /></button></div>
        {products.length === 0 ? (
          <div className="favorites-empty"><Heart size={40} /><h3>Your favorites are empty</h3><p>Tap the heart on a product to save it here.</p></div>
        ) : (
          <div className="favorites-items">
            {products.map((product) => (
              <article className="favorite-item" key={product.id}>
                <img src={product.thumbnail} alt={product.title} />
                <div className="favorite-info"><p>{product.brand || product.category}</p><h3>{product.title}</h3><strong>${product.price.toFixed(2)}</strong></div>
                <div className="favorite-actions"><button className="remove-favorite" onClick={() => onRemove(product.id)} aria-label={`Remove ${product.title} from favorites`}><Heart size={17} fill="currentColor" /></button><button className="favorite-add" onClick={() => addToBag(product)}>Add to bag</button></div>
              </article>
            ))}
          </div>
        )}
      </aside>
    </div>
  );
}
