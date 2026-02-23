import { Link } from 'react-router-dom';
import './About.css';

function About() {
  return (
    <div className="about-page">
      <div className="about-content">
        <h1>About Koodaram</h1>
        <p>Koodaram is Kerala's first 100% open-source hostel network, built for and by students. Hostel data is never locked behind paywalls, logins, or private companies.</p>
        <p>Our mission is to make hostel accommodation near college campuses easy, free, and transparent for every student.</p>
        <div className="cta-section">
          <a href="https://github.com/Koodaram-Inc/koodaram-data" target="_blank" rel="noopener noreferrer" className="cta-button">⭐ View on GitHub</a>
          <Link to="/list-hostel" className="cta-button">📝 List Your Hostel</Link>
        </div>
        <footer className="about-footer">
          <p>Made with 💖 by <a href="https://github.com/rohankishore" target="_blank" rel="noopener noreferrer">Rohan Kishore</a></p>
          <p><Link to="/">← Back to Home</Link></p>
        </footer>
      </div>
    </div>
  );
}

export default About;
