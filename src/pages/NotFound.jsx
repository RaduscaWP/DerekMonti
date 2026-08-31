import { Link } from 'react-router-dom';
import Button from '../components/common/Button.jsx';

export default function NotFound() {
  return (
    <div>
      <section className="legal-hero">
        <div className="container">
          <p className="eyebrow">404</p>
          <h1>Page Not Found</h1>
          <p>The page you requested does not exist or has moved.</p>
        </div>
      </section>
      <section className="legal-body">
        <div className="container legal-body__inner">
          <p>
            The address may be outdated or mistyped. Continue with one of the pages below, or share the trip you want
            Derek to review.
          </p>
          <div className="not-found__actions">
            <Button href="/#request-form">Request a personal review</Button>
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/blog">Planning guides</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
