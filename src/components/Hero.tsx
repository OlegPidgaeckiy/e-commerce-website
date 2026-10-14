import { ArrowDownRight, ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero" id="new">
      <div className="hero-orb orb-one" />
      <div className="hero-orb orb-two" />
      <div className="hero-copy">
        <p className="eyebrow"><Sparkles size={14} /> THE NEW STANDARD</p>
        <h1>Everyday things.<br /><em>Extraordinary mood.</em></h1>
        <p className="hero-text">
          A colorful edit of useful, beautiful objects for the way you live now.
        </p>
        <a className="hero-button" href="#shop">Explore collection <ArrowRight size={17} /></a>
        <div className="hero-note"><ArrowDownRight size={17} /> Curated from 100+ products</div>
      </div>

      <div className="hero-visual">
        <div className="hero-sticker">NEW<br /><strong>26</strong></div>
        <div className="hero-photo photo-back" />
        <div className="hero-photo photo-main">
          <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=85" alt="Minimal watch" />
          <span>ESSENTIAL<br /><b>01 / 26</b></span>
        </div>
        <div className="hero-tag">GOOD<br />DESIGN<br /><strong>MATTERS.</strong></div>
      </div>

      <div className="hero-bottom"><span>SCROLL TO SHOP</span><i /><span>01 — 04</span></div>
    </section>
  );
}
