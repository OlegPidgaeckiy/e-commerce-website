import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  query: string;
  setQuery: (value: string) => void;
  cartCount: number;
  favoritesCount: number;
  onCartOpen: () => void;
  onFavoritesOpen: () => void;
}

export default function Header({ query, setQuery, cartCount, favoritesCount, onCartOpen, onFavoritesOpen }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <button className="mobile-menu-button" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle menu">
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      <a className="logo" href="#new" onClick={closeMenu}>VELORA<span>®</span></a>

      <nav className={`nav ${menuOpen ? "open" : ""}`}>
        <a href="#shop" onClick={closeMenu}>Shop</a>
        <a href="#new" onClick={closeMenu}>New Arrivals</a>
        <a href="#about" onClick={closeMenu}>Our Story</a>
        <a href="#journal" onClick={closeMenu}>Journal</a>
      </nav>

      <div className="header-actions">
        <label className="search-box">
          <Search size={17} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products..." />
        </label>
        <button className="header-icon" onClick={onFavoritesOpen} aria-label={`Favorites (${favoritesCount})`}>
          <Heart size={20} fill={favoritesCount > 0 ? "currentColor" : "none"} />
          {favoritesCount > 0 && <small>{favoritesCount}</small>}
        </button>
        <button className="bag-button" onClick={onCartOpen}>
          <ShoppingBag size={20} />
          <span>Bag</span>
          {cartCount > 0 && <b>{cartCount}</b>}
        </button>
      </div>
    </header>
  );
}
