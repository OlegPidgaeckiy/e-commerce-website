import { ArrowRight } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="newsletter" id="journal">
      <div className="newsletter-shape shape-left" /><div className="newsletter-shape shape-right" />
      <p className="eyebrow">STAY IN THE LOOP</p>
      <h2>Good things,<br /><em>occasionally.</em></h2>
      <p>New drops, useful stories and private offers. No noise.</p>
      <form onSubmit={(event) => event.preventDefault()}>
        <input type="email" placeholder="Your email address" aria-label="Email address" />
        <button type="submit">Subscribe <ArrowRight size={17} /></button>
      </form>
    </section>
  );
}
