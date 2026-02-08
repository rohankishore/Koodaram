import { Link } from 'react-router-dom';
import './About.css';

function About() {
  return (
    <div className="about-page">
      <div className="about-content">
        <h1>About Koodaram</h1>
        
        <section>
          <h2>Our Mission</h2>
          <p>
            Koodaram is Kerala's first <strong>100% open-source hostel network</strong>, built for and by students.
            We believe hostel data should never be locked behind paywalls, login screens, or private companies.
          </p>
        </section>

        <section>
          <h2>Why We Exist</h2>
          <p>
            Finding hostel accommodation near college campuses has always been a challenge for students.
            Most platforms charge fees, require accounts, or hide critical information. We're changing that.
          </p>
          <p>
            <strong>Koodaram is completely free, open, and transparent.</strong> Every hostel listing is 
            publicly available on GitHub, verified by students, and accessible to everyone without barriers.
          </p>
        </section>

        <section>
          <h2>How It Works</h2>
          <ul>
            <li>Students collect and verify hostel information</li>
            <li>All data is stored openly on GitHub</li>
            <li>No accounts, no ads, no hidden costs</li>
            <li>Community-driven and student-focused</li>
          </ul>
        </section>

        <section>
          <h2>Get Involved</h2>
          <p>
            Koodaram is an open-source project. You can contribute by:
          </p>
          <ul>
            <li>Adding new hostel listings</li>
            <li>Verifying existing information</li>
            <li>Contributing to the codebase on GitHub</li>
            <li>Sharing with fellow students</li>
          </ul>
        </section>

        <div className="cta-section">
          <a 
            href="https://github.com/Koodaram-Inc/koodaram-data" 
            target="_blank" 
            rel="noopener noreferrer"
            className="cta-button"
          >
            ⭐ View on GitHub
          </a>
          <Link to="/list-hostel" className="cta-button">
            📝 List Your Hostel
          </Link>
        </div>

        <footer className="about-footer">
          <p>
            Made with 💖 by{' '}
            <a href="https://github.com/rohankishore" target="_blank" rel="noopener noreferrer">
              Rohan Kishore
            </a>
          </p>
          <p>
            <Link to="/">← Back to Home</Link>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default About;
