import { Link, useLocation } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const location = useLocation();
  const customFooterPaths = ['/', '/browse', '/hostel', '/about', '/privacy', '/terms'];

  const hasCustomFooter = customFooterPaths.some(p => {
    if (p === '/') return location.pathname === '/';
    return location.pathname.startsWith(p);
  });

  if (hasCustomFooter) {
    return null;
  }

  return (
    <footer>
      <Link to="/">← Back to Home</Link>
      <br /><br />
      <Link to="/datasheet" style={{ color: '#1a73e8', textDecoration: 'none', fontWeight: 'bold' }}>
        📊 View Datasheet
      </Link>
      <br /><br />
      <a href="https://instagram.com/koodaram.app" target="_blank" rel="noopener noreferrer" style={{ color: '#E4405F', textDecoration: 'none', fontWeight: 'bold' }}>
        📸 Instagram: @koodaram.app
      </a>
      <br /><br />
      © 2025 Koodaram
    </footer>
  );
}

export default Footer;
