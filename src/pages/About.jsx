import { Link } from 'react-router-dom';
import Dither from '../component/Dither';
import { 
  IoCashOutline, 
  IoCheckmarkCircleOutline, 
  IoCodeSlashOutline, 
  IoLogoGithub,
  IoSearchOutline
} from 'react-icons/io5';
import './About.css';

function About() {
  return (
    <>
      <div className="page-dither" style={{ minHeight: '100vh', width: '100vw', position: 'fixed', top: 0, left: 0, zIndex: 0, filter: 'blur(10px) saturate(1.2)' }}>
        <Dither />
      </div>
      
      <div style={{ position: 'relative', zIndex: 10 }}>
        <div className="about-page">
          <header className="about-header">
            <div className="about-badge-container">
              <span className="about-badge">ABOUT KOODARAM</span>
            </div>
            <h1>Kerala's First Open Hostel Finder</h1>
            <p className="about-subheading">For Students. By Students. Zero Brokerage.</p>
            <p className="about-header-desc">
              Koodaram is a community-driven open-source project designed to solve college accommodation struggles. 
              We believe hostel listings should be free, transparent, and owned by the community.
            </p>
          </header>

          <section className="about-grid">
            <div className="about-card">
              <div className="about-icon-wrapper">
                <IoCashOutline size={26} />
              </div>
              <h3>Zero Brokerage</h3>
              <p>Tired of agents charging hefty commission fees? Koodaram has <strong>₹0 fees</strong>. Owners list and students browse completely for free, coordinating directly with each other.</p>
            </div>

            <div className="about-card">
              <div className="about-icon-wrapper">
                <IoCheckmarkCircleOutline size={26} />
              </div>
              <h3>Student Verified</h3>
              <p>No fake listings or photoshopped reviews. Our listings are crowdsourced and validated by college students, keeping data clean, up-to-date, and accurate.</p>
            </div>

            <div className="about-card">
              <div className="about-icon-wrapper">
                <IoCodeSlashOutline size={26} />
              </div>
              <h3>100% Open Source</h3>
              <p>Every line of frontend code and all hostel database JSON files are publicly hosted on GitHub. No private company owns or monitors your search history.</p>
            </div>
          </section>

          <section className="about-cta-section">
            <div className="about-cta-glow">
              <h2>Join the open source movement</h2>
              <p>Contribute listings, verify hostels near your campus, or view the platform code on GitHub.</p>
              
              <div className="about-buttons-container">
                <a 
                  href="https://github.com/Koodaram-Inc/koodaram-data" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="about-primary-btn"
                >
                  <IoLogoGithub size={18} />
                  <span>View on GitHub</span>
                </a>
                
                <Link to="/browse" className="about-secondary-btn">
                  <IoSearchOutline size={18} />
                  <span>Browse Hostels</span>
                </Link>
              </div>
            </div>
          </section>
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
