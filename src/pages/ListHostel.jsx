import { Link } from 'react-router-dom';
import Dither from '../component/Dither';
import { 
  IoCashOutline, 
  IoPeopleOutline, 
  IoCodeSlashOutline, 
  IoDocumentTextOutline, 
  IoImagesOutline, 
  IoCheckmarkDoneOutline,
  IoArrowForwardOutline
} from 'react-icons/io5';
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
            <div className="owner-badge-container">
              <span className="owner-badge">HOSTEL OWNERS</span>
            </div>
            <h1>List Your Hostel. Direct to Students.</h1>
            <p className="owner-subheading">Zero Brokerage. Zero Commissions. Zero Middlemen.</p>
            <p className="list-header-desc">
              Koodaram connects hostel owners directly with students near Kerala's top campuses. 
              Keep 100% of your earnings, enjoy full transparency, and manage listings easily.
            </p>
          </header>

          <section className="features-grid">
            <div className="feature-card zero-brokerage">
              <div className="feature-icon-wrapper">
                <IoCashOutline size={26} />
              </div>
              <h3>Zero Brokerage</h3>
              <p>We charge absolutely <strong>₹0 commission</strong>. Hostel owners list for free, and students browse for free. Transactions happen directly between you and the student.</p>
            </div>

            <div className="feature-card direct-students">
              <div className="feature-icon-wrapper">
                <IoPeopleOutline size={26} />
              </div>
              <h3>Direct Student Inquiries</h3>
              <p>Skip agencies. Students view your contact details (phone, WhatsApp) and contact you directly. Get instant inquiries from verified students looking near your area.</p>
            </div>

            <div className="feature-card open-source">
              <div className="feature-icon-wrapper">
                <IoCodeSlashOutline size={26} />
              </div>
              <h3>100% Open Data</h3>
              <p>No paywalls or proprietary lock-ins. All hostel data is hosted transparently on GitHub, meaning your listings belong to the community and stay online forever.</p>
            </div>
          </section>

          <section className="guide-section">
            <h2>How to List Your Hostel in 3 Steps</h2>
            
            <div className="steps-list">
              <div className="step-item">
                <div className="step-number-box">
                  <IoDocumentTextOutline size={22} />
                  <span className="step-num">01</span>
                </div>
                <div className="step-content">
                  <h3>Fill the Listing Form</h3>
                  <p>Provide key hostel details including monthly rent, food options, security deposit, curfew timings, and basic amenities (Wi-Fi, AC, bathrooms, laundry).</p>
                </div>
              </div>

              <div className="step-item">
                <div className="step-number-box">
                  <IoImagesOutline size={22} />
                  <span className="step-num">02</span>
                </div>
                <div className="step-content">
                  <h3>Upload Room Photos</h3>
                  <p>Submit clear photos of the exterior, rooms, washrooms, and common study/dining areas. High-quality, real photos build trust and double student responses.</p>
                </div>
              </div>

              <div className="step-item">
                <div className="step-number-box">
                  <IoCheckmarkDoneOutline size={22} />
                  <span className="step-num">03</span>
                </div>
                <div className="step-content">
                  <h3>Verification & Launch</h3>
                  <p>Our student coordinators quickly verify your listing details. Once approved, your hostel goes live on the browse page for thousands of active searchers.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="cta-section">
            <div className="cta-box-glow">
              <h2>Ready to grow your hostel bookings?</h2>
              <p>Join Koodaram today. Listing takes less than 5 minutes and is 100% free forever.</p>
              
              <div className="cta-buttons-container">
                <a 
                  href="https://docs.google.com/forms/d/e/1FAIpQLScQNgpr6HKupIdnz6eqnq6E2mXRr0Y-Zxj1V1rauKr8Tg1zZw/viewform?usp=publish-editor" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="owner-primary-btn"
                >
                  <span>📝 List Your Hostel Now</span>
                  <IoArrowForwardOutline size={18} />
                </a>
                
                <Link to="/about" className="owner-secondary-btn">
                  Learn More About Us
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

export default ListHostel;
