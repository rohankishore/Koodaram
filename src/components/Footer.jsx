import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer>
      <Link to="/">← Back to Home</Link>
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
