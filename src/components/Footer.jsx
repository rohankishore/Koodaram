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
    <></>
  );
}

export default Footer;
