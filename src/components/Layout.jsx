import Navbar from './Navbar';
import Footer from './Footer';
import { useRevealOnScroll } from '../lib/useRevealOnScroll';

export default function Layout({ children }) {
  // Fades and slides boxes and images in as they scroll into view, site-wide.
  useRevealOnScroll();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
