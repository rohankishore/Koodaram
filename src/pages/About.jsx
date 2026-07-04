import { Link } from 'react-router-dom';
import Dither from '../component/Dither';
import './About.css';

function About() {
  return (
    <>
      <div className="page-dither" style={{ minHeight: '100vh', width: '100vw', position: 'fixed', top: 0, left: 0, zIndex: 0, filter: 'blur(10px) saturate(1.2)' }}>
        <Dither />
      </div>
      
      <div style={{ position: 'relative', zIndex: 10 }}>
        <div className="about-page">
          <div className="about-content">
            <h1>About Koodaram</h1>
            <p>Koodaram is Kerala's first 100% open-source hostel network, built for and by students. Hostel data is never locked behind paywalls, logins, or private companies.</p>
            <p>Our mission is to make hostel accommodation near college campuses easy, free, and transparent for every student.</p>
            <div className="cta-section">
              <a href="https://github.com/Koodaram-Inc/koodaram-data" target="_blank" rel="noopener noreferrer" className="cta-button" style={{ marginTop: 0 }}>⭐ View on GitHub</a>
              <Link to="/list-hostel" className="cta-button" style={{ marginTop: 0 }}>📝 List Your Hostel</Link>
            </div>
          </div>
        </div>

        {/* Global Styled Footer */}
        <section className="info-section" style={{
          marginTop: '4rem',
          padding: '3rem 1rem',
          textAlign: 'center',
          color: '#888',
          backdropFilter: 'blur(10px) saturate(1.2)'
        }}>
          <h2 style={{ fontFamily: 'Thomeo, sans-serif', fontSize: '4rem', margin: 0, color: '#fff' }}>KOODARAM</h2>
          <div style={{ margin: '1.5rem 0', color: '#ffd600' }}>
            <Link to="/" style={{color: '#ffd600'}}>Home</Link> | <Link to="/about" style={{color: '#ffd600'}}>About Us</Link> | <Link to="/browse" style={{color: '#ffd600'}}>Browse Hostels</Link> | <Link to="/list-hostel" style={{color: '#ffd600'}}>List Hostel</Link> | <Link to="/datasheet" style={{color: '#ffd600'}}>Datasheet</Link> | <Link to="/credits" style={{color: '#ffd600'}}>Credits</Link> | <Link to="/terms" style={{color: '#ffd600'}}>Terms</Link> | <Link to="/privacy" style={{color: '#ffd600'}}>Privacy</Link>
          </div>
          <div style={{ fontSize: '1rem', color: '#fff', marginBottom: '0.5rem' }}>Open Source Initiative</div>
          <div style={{ fontSize: '1rem', color: '#fff' }}>© 2026 Koodaram</div>
          <div style={{ fontSize: '1rem', color: '#fff', marginTop: '1.5rem' }}>
            Made with <span style={{color: 'red', fontSize: '1.2em', verticalAlign: 'middle'}}>♥</span> by <a href="https://github.com/rohankishore" target="_blank" rel="noopener noreferrer" style={{color: '#ffd600', textDecoration: 'underline'}}>Rohan Kishore</a>
          </div>
        </section>
      </div>
    </>
  );
}

export default About;
