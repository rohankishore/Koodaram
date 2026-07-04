import { Link } from 'react-router-dom';
import Dither from '../component/Dither';
import './ListHostel.css';

function ListHostel() {
  return (
    <>
      <div className="page-dither" style={{ minHeight: '100vh', width: '100vw', position: 'fixed', top: 0, left: 0, zIndex: 0, filter: 'blur(10px) saturate(1.2)' }}>
        <Dither />
      </div>
      
      <div style={{ position: 'relative', zIndex: 10 }}>
        <div className="list-hostel-page">
          <header className="list-header">
            <h1>Add Your Hostel</h1>
            <p>Koodaram is Kerala's #1 Open Hostel Finder. Every listing is open source, transparent, and free forever. No accounts needed.</p>
          </header>

          <section className="content">
            <h2>What is Koodaram?</h2>
            <p>Koodaram is Kerala's first <strong>100% open-source hostel network</strong>, built for and by students. We believe hostel data should never be locked behind paywalls, login screens, or private companies.</p>

            <h2>How It Works</h2>
            <ul>
              <li>Students collect verified hostel details (rent, facilities, distance, reviews).</li>
              <li><strong>All listings are open-source</strong> and publicly viewable on{' '}
                <a href="https://github.com/Koodaram-Inc/koodaram-data" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>.
              </li>
              <li>No ads. No accounts. No hidden pricing. Just transparent info for everyone.</li>
            </ul>

            <h2>Want to Add Your Hostel?</h2>
            <p>Be part of the open-source movement. If your hostel isn't listed yet, you can add it right now through our form below!</p>

            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLScQNgpr6HKupIdnz6eqnq6E2mXRr0Y-Zxj1V1rauKr8Tg1zZw/viewform?usp=publish-editor" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="discord-button"
            >
              📝 List Your Hostel on Koodaram
            </a>
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

export default ListHostel;
