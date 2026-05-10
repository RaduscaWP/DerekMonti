import AnnouncementBar from './AnnouncementBar.jsx';
import Footer from './Footer.jsx';
import Navbar from './Navbar.jsx';

export default function Layout({ children }) {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
