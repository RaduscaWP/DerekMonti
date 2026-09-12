import AnnouncementBar from './AnnouncementBar.jsx';
import Footer from './Footer.jsx';
import Navbar from './Navbar.jsx';
import { useLocation } from 'react-router-dom';

export default function Layout({ children }) {
  const { pathname } = useLocation();
  // The immersive homepage owns its header, main landmark and footer.
  if (pathname === '/') return <>{children}</>;

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
