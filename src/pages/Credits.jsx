import React from 'react';
import { Link } from 'react-router-dom';
import Dither from '../component/Dither';
import { 
  IoHeartOutline, 
  IoShieldCheckmarkOutline, 
  IoDocumentTextOutline,
  IoGitPullRequestOutline,
  IoArrowBackOutline
} from 'react-icons/io5';
import './Credits.css';

function Credits() {
  return (
    <>
      <div className="page-dither" style={{ minHeight: '100vh', width: '100vw', position: 'fixed', top: 0, left: 0, zIndex: 0, filter: 'blur(10px) saturate(1.2)' }}>
        <Dither />
      </div>
      
      <div style={{ position: 'relative', zIndex: 10 }}>
        <div className="credits-page">
          <header className="credits-header">
            <div className="credits-badge-container">
              <span className="credits-badge">ACKNOWLEDGEMENTS</span>
            </div>
            <h1>Credits & Special Thanks</h1>
            <p className="credits-subheading">Built on Open Collaboration.</p>
            <p className="credits-header-desc">
              Koodaram would not be possible without the generous contributions, community flyers, 
              and verified details provided by students, clubs, and organizations.
            </p>
          </header>

          <section className="collabs-grid">
            <div className="collab-card">
              <div className="collab-icon-wrapper">
                <IoHeartOutline size={24} />
              </div>
              <h3>NSS CUSAT</h3>
              <p>Special thanks for providing brochures and flyers compiled with verified hostel information near the CUSAT campus.</p>
            </div>

            <div className="collab-card">
              <div className="collab-icon-wrapper">
                <IoHeartOutline size={24} />
              </div>
              <h3>hola.rit</h3>
              <p>Gratitude to the <a href="https://www.instagram.com/hola.rit/" target="_blank" rel="noopener noreferrer">hola.rit</a> Instagram page for helping aggregate hostel information for RIT Kottayam.</p>
            </div>

            <div className="collab-card">
              <div className="collab-icon-wrapper">
                <IoHeartOutline size={24} />
              </div>
              <h3>GEC Thrissur PTA</h3>
              <p>Credits to <a href="https://gectcr.ac.in/wp-content/uploads/2022/08/PTA_Approved_Hostels.pdf" target="_blank" rel="noopener noreferrer">GEC TCR PTA</a> official database for approved hostel structures.</p>
            </div>
          </section>

          <section className="legal-section">
            <div className="legal-box">
              <div className="legal-header-row">
                <IoShieldCheckmarkOutline size={22} className="legal-icon" />
                <h2>Data Usage & Fair Use Policy</h2>
              </div>
              <p>
                Hostel listings on Koodaram are sourced from public registers, direct submissions, and student clubs. 
                Under the Indian Copyright Act (1957) Fair Use Doctrine (Section 52) and the Right to Information (RTI) Act, 
                non-commercial platforms are permitted to present public directory details for student welfare.
              </p>
              <p>
                If you are a PG or hostel owner and want details modified, updated, or removed, you can contact us directly.
              </p>
            </div>

            <div className="legal-box">
              <div className="legal-header-row">
                <IoDocumentTextOutline size={22} className="legal-icon" />
                <h2>Legal & Licensing</h2>
              </div>
              <p>
                Koodaram is open source and licensed under the <strong>GPLv3 License</strong>. 
                Portions of this platform make use of MIT-licensed icons and libraries.
              </p>
            </div>
          </section>

          <section className="credits-cta-section">
            <div className="credits-cta-glow">
              <h2>Help us verify more hostels</h2>
              <p>Spot an error or have info for another college? Submit changes directly or contribute code.</p>
              
              <div className="credits-buttons-container">
                <a 
                  href="https://github.com/Koodaram-Inc/koodaram-data" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="credits-primary-btn"
                >
                  <IoGitPullRequestOutline size={18} />
                  <span>Contribute Data</span>
                </a>
                
                <Link to="/" className="credits-secondary-btn">
                  <IoArrowBackOutline size={18} />
                  <span>Back to Home</span>
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

export default Credits;
