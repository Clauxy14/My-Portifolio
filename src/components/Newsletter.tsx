import { useState } from "react";
import "./Newsletter.css";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section className="newsletter">
      <div className="newsletter-bg"></div>
      <div className="newsletter-container">
        <div className="newsletter-content">
          <h2 className="newsletter-title">Never Miss an Update</h2>
          <p className="newsletter-subtitle">Subscribe to get the latest insights, projects, and stories directly to your inbox.</p>

          {submitted ? (
            <div className="newsletter-success">
              <span className="success-icon">✓</span>
              <p>Welcome aboard! Check your email for confirmation.</p>
            </div>
          ) : (
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <div className="form-wrapper">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="newsletter-input"
                />
                <button type="submit" className="newsletter-button">
                  <span>Subscribe</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
              <p className="form-hint">We respect your privacy. Unsubscribe at any time.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
