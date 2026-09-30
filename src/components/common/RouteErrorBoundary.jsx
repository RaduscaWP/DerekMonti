import { Component } from 'react';
import { contactConfig } from '../../data/siteData.js';

export default class RouteErrorBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (!this.state.failed) return this.props.children;
    return <section style={{ padding: '160px 24px 80px', maxWidth: 900, margin: 'auto' }} aria-labelledby="route-recovery-title"><h1 id="route-recovery-title">Let's keep planning.</h1><p style={{ margin: '24px 0', lineHeight: 1.7 }}>This page could not load fully. You can share your journey directly with Derek or reload the page.</p><p style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}><a href={`mailto:${contactConfig.email}`}>Email Derek</a><a href={`https://wa.me/${contactConfig.whatsappNumber}`}>WhatsApp</a><a href="/">Reload the homepage</a></p></section>;
  }
}
