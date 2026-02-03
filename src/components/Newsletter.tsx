import { useState } from "react";
import "./Newsletter.css";

export default function Newsletter() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    frequency: "weekly",
    terms: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!formData.email.trim()) {
      setError("Please enter your email");
      return;
    }
    if (!formData.terms) {
      setError("Please accept the terms and privacy policy");
      return;
    }

    setSubmitted(true);
    setFormData({ name: "", email: "", frequency: "weekly", terms: false });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="newsletter">
      <div className="newsletter-bg"></div>
      <div className="newsletter-container">
        <div className="newsletter-content">
          <h2 className="newsletter-title">Stay Connected</h2>
          <p className="newsletter-subtitle">
            Get weekly updates on new projects, insights, and tech stories delivered
            straight to your inbox.
          </p>

          {submitted ? (
            <div className="newsletter-success">
              <div className="success-content">
                <span className="success-icon">✓</span>
                <div>
                  <p className="success-title">Welcome aboard!</p>
                  <p className="success-message">
                    Check your email for confirmation. Thanks for subscribing!
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <form className="newsletter-form" onSubmit={handleSubmit}>
              {error && <div className="error-message">{error}</div>}

              <div className="form-row">
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="newsletter-input"
                />
              </div>

              <div className="form-row">
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="newsletter-input"
                />
              </div>

              <div className="form-row">
                <label htmlFor="frequency" className="frequency-label">
                  How often would you like updates?
                </label>
                <select
                  id="frequency"
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleChange}
                  className="newsletter-select"
                >
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Bi-weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <div className="form-row checkbox-row">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  className="newsletter-checkbox"
                />
                <label htmlFor="terms" className="terms-label">
                  I agree to the{" "}
                  <a href="#privacy" className="terms-link">
                    terms and privacy policy
                  </a>
                </label>
              </div>

              <button type="submit" className="newsletter-button">
                <span>Subscribe Now</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>

              <p className="form-hint">
                ✉️ No spam, unsubscribe anytime. We respect your inbox.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
