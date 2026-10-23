import AnnouncementBar from './AnnouncementBar.jsx';
import Footer from './Footer.jsx';
import Navbar from './Navbar.jsx';

export default function Layout({ children }) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <AnnouncementBar />
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
