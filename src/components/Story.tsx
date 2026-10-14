import { ArrowRight, Check } from "lucide-react";

export default function Story() {
  return (
    <section className="story" id="about">
      <div className="story-image"><img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=85" alt="Bright modern store" /></div>
      <div className="story-copy">
        <p className="eyebrow">THE VELORA EDIT</p>
        <h2>Less noise.<br /><em>More color.</em></h2>
        <p>We collect practical pieces with personality — products that make ordinary routines feel a little more considered.</p>
        <div className="story-points"><span><Check size={15} /> Carefully selected</span><span><Check size={15} /> Everyday useful</span><span><Check size={15} /> Designed to last</span></div>
        <a href="#shop">Discover the collection <ArrowRight size={17} /></a>
      </div>
    </section>
  );
}
