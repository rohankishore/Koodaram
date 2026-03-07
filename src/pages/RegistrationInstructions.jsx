import { Link } from 'react-router-dom';
import './RegistrationInstructions.css';

function RegistrationInstructions() {
  return (
    <div className="registration-instructions-page">
      <header className="reg-header">
        <h1>How to Register Your Hostel</h1>
        <p>Follow these simple steps to get your hostel listed on Koodaram</p>
      </header>

      <section className="reg-content">
        <div className="instruction-step">
          <div className="step-number">1</div>
          <div className="step-content">
            <h2>Fill Out the Form</h2>
            <p>Click the button below and fill out our Google Form with your hostel details including:</p>
            <ul>
              <li>Hostel name and location</li>
              <li>Price and room types</li>
              <li>Amenities (WiFi, AC, etc.)</li>
              <li>Gender policy</li>
              <li>Contact information</li>
              <li>Hostel photos (if available)</li>
            </ul>
          </div>
        </div>

        <div className="instruction-step">
          <div className="step-number">2</div>
          <div className="step-content">
            <h2>Verification</h2>
            <p>Our team will verify the information you've submitted. We may reach out for clarification or additional details to ensure accuracy.</p>
          </div>
        </div>

        <div className="instruction-step">
          <div className="step-number">3</div>
          <div className="step-content">
            <h2>Live on Koodaram</h2>
            <p>Once verified, your hostel will appear on Koodaram for students to discover. Your listing will remain completely free and transparent.</p>
          </div>
        </div>

        <div className="instruction-step">
          <div className="step-number">4</div>
          <div className="step-content">
            <h2>Stay Updated</h2>
            <p>You can update your hostel's information anytime by submitting the form again or contacting us directly.</p>
          </div>
        </div>

        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>
          
          <div className="faq-item">
            <h3>Is there a fee to list my hostel?</h3>
            <p>No! Listing your hostel on Koodaram is completely free. We believe in transparent, open-source hostel data for everyone.</p>
          </div>

          <div className="faq-item">
            <h3>What information is required?</h3>
            <p>We need basic details like your hostel's name, location, price range, room types, amenities, and contact information. Photos are optional but recommended.</p>
          </div>

          <div className="faq-item">
            <h3>How long does the verification process take?</h3>
            <p>Typically, we verify listings within 3-5 business days. During peak seasons, it may take longer. We'll notify you once your hostel is live.</p>
          </div>

          <div className="faq-item">
            <h3>Can I edit my listing after it's live?</h3>
            <p>Yes! You can always update your hostel's information by submitting the form again or contacting us directly.</p>
          </div>

          <div className="faq-item">
            <h3>Will my contact information be private?</h3>
            <p>Your detailed contact info is only used for verification. Students will see a contact option through our platform to reach out to you directly.</p>
          </div>
        </div>

        <div className="register-section">
          <h2>Ready to List Your Hostel?</h2>
          <a 
            href="https://docs.google.com/forms/d/e/1FAIpQLScQNgpr6HKupIdnz6eqnq6E2mXRr0Y-Zxj1V1rauKr8Tg1zZw/viewform?usp=publish-editor" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="register-button"
          >
            📝 Fill Registration Form
          </a>
        </div>
      </section>

      <footer className="reg-footer">
        © 2025 <strong>Koodaram</strong> — Kerala's #1 Open Hostel Finder. Open. Transparent. Student-driven.
        <br />
        <Link to="/">← Back to Home</Link> |{' '}
        <a href="https://github.com/Koodaram-Inc/koodaram-data" target="_blank" rel="noopener noreferrer">
          ⭐ View on GitHub
        </a>
      </footer>
    </div>
  );
}

export default RegistrationInstructions;
