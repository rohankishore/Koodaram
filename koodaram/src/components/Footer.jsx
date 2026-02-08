import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer>
      <Link to="/">← Back to Home</Link>
      <br /><br />
      © 2025 Koodaram
    </footer>
  );
}

export default Footer;
