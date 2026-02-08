import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Home.css';

function Home() {
  const [activeQuestion, setActiveQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  const faqData = [
    {
      question: "Is Koodaram free to use?",
      answer: "Yes! Koodaram is completely free (free as in freedom) for students. You can browse hostels, view photos, and contact owners without paying anything."
    },
    {
      question: "Do I need an account to use Koodaram?",
      answer: "No! Koodaram is completely open — no accounts, no sign-ups, no tracking. Just browse, search, and find your hostel."
    },
    {
      question: "How do you ensure data is accurate?",
      answer: "Our model is built on student verification. While we don't check every hostel personally, information is submitted and validated by a network of students who keep the listings up-to-date."
    },
    {
      question: "How do I contribute?",
      answer: "You can contribute by listing a new hostel, adding reviews and ratings to help verify information for other students."
    },
    {
      question: "Is Koodaram fully open source?",
      answer: (
        <>
          Yes! All hostel data is open source and available on{' '}
          <a href="https://github.com/Koodaram-Inc/koodaram-data" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          . Anyone can view, verify, or contribute to the hostel listings. The platform code is also open — we believe in total transparency.
        </>
      )
    }
  ];

  return (
    <>
      <div className="hero">
        <h1>Kerala's #1 Open Hostel Finder</h1>
        <p>A completely free and open-source platform for finding and verifying hostels near your campus. No accounts, no paywalls, no corporate control.</p>
        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/browse" className="cta-button">🔍 Find Your Hostel</Link>
          <a href="https://github.com/Koodaram-Inc/koodaram-data" target="_blank" rel="noopener noreferrer" className="cta-button">🛠️ View on GitHub</a>
        </div>
      </div>

      <section className="how-it-works-section">
        <h2>How It Works</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>100% Open Source</h3>
            <p>All hostel data is hosted on GitHub and freely accessible. No accounts needed, no data locked behind paywalls.</p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h3>Student Verified</h3>
            <p>Real students submit and verify hostel information, ensuring data is up-to-date and trustworthy.</p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Completely Free</h3>
            <p>Browse hostels, view photos, and contact owners — all without paying a rupee or creating an account.</p>
          </div>
        </div>
      </section>

      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-accordion">
          {faqData.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-accordion-item ${activeQuestion === index ? 'active' : ''}`}
            >
              <div 
                className="faq-accordion-question" 
                onClick={() => toggleQuestion(index)}
              >
                {faq.question}
              </div>
              <div className="faq-accordion-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="home-footer">
        <p>
          © 2025 Koodaram - <strong>Kerala's #1 Open Hostel Finder</strong>. A 100% open-source initiative. Made with 💖 by{' '}
          <a href="https://github.com/rohankishore" target="_blank" rel="noopener noreferrer">Rohan Kishore</a> | {' '}
          <a href="https://github.com/Koodaram-Inc/koodaram-data" target="_blank" rel="noopener noreferrer">⭐ View on GitHub</a>
        </p>
      </footer>
    </>
  );
}

export default Home;
