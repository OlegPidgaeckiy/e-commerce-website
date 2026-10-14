import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import type { CartItem } from "../types";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  cart: CartItem[];
  total: number;
  onUpdateQuantity: (id: number, amount: number) => void;
  onRemove: (id: number) => void;
}

export default function CartDrawer({ open, onClose, cart, total, onUpdateQuantity, onRemove }: CartDrawerProps) {
  if (!open) return null;

  return (
    <div className="overlay" onClick={onClose}>
      <aside className="cart" onClick={(event) => event.stopPropagation()}>
        <div className="cart-head"><div><p className="eyebrow">YOUR ORDER</p><h2>Shopping bag</h2></div><button onClick={onClose} aria-label="Close cart"><X /></button></div>

        {cart.length === 0 ? (
          <div className="cart-empty"><ShoppingBag size={40} /><h3>Your bag is empty</h3><p>Add something beautiful to get started.</p></div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.thumbnail} alt={item.title} />
                  <div className="cart-info"><h4>{item.title}</h4><span>${item.price.toFixed(2)}</span><div className="qty"><button onClick={() => onUpdateQuantity(item.id, -1)}><Minus size={13} /></button><b>{item.qty}</b><button onClick={() => onUpdateQuantity(item.id, 1)}><Plus size={13} /></button></div></div>
                  <button className="delete" onClick={() => onRemove(item.id)} aria-label="Remove item"><Trash2 size={16} /></button>
                </div>
              ))}
            </div>
            <div className="cart-footer"><div><span>Subtotal</span><strong>${total.toFixed(2)}</strong></div><small>Shipping calculated at checkout.</small><button className="checkout">Checkout <ArrowRight size={18} /></button></div>
          </>
        )}
      </aside>
    </div>
  );
}
