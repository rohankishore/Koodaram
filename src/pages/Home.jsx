import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Dither from '../component/Dither';
import CardSwap, { Card } from '../component/CardSwap';
import './Home.css';
import { Analytics } from "@vercel/analytics/react"

// Import Browse for hostel/college counts
import Browse from './Browse';

function Home() {
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [hostelCount, setHostelCount] = useState(0);
  const [collegeCount, setCollegeCount] = useState(0);

  useEffect(() => {
    fetch('https://api.github.com/repos/Koodaram-Inc/koodaram-data/contents/hostels')
      .then(res => res.json())
      .then(folders => setHostelCount(folders.length));
    setCollegeCount(9); // Update if more colleges are added
  }, []);

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
      <div className="page-dither" style={{ minHeight: '100vh', width: '100vw', position: 'fixed', top: 0, left: 0, zIndex: 0, filter: 'blur(10px) saturate(1.2)' }}>
        <Dither />
      </div>
      <div style={{ position: 'relative', zIndex: 10 }}>
        <div className="hero">
          <h1>Kerala's <span className="number-one">#1</span> Open Hostel Finder</h1>
          <p>A completely free and open-source platform for finding and verifying hostels near your campus. No accounts, no paywalls, no corporate control.</p>
          <div className="hero-counts" style={{margin: '1.2rem auto 0', display: 'flex', justifyContent: 'center', gap: '1rem'}}>
            <span className="hero-pill">{hostelCount} hostels listed</span>
            <span className="hero-pill">{collegeCount} colleges covered</span>
          </div>
          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', position: 'relative', zIndex: 10 }}>
            <Link to="/browse" className="cta-button">🔍 Find Your Hostel</Link>
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

        <section className="info-section" style={{
          marginTop: '4rem',
          padding: '3rem 1rem',
          textAlign: 'center',
          color: '#888',
          backdropFilter: 'blur(10px) saturate(1.2)'
        }}>
          <h2 style={{ fontFamily: 'Thomeo, sans-serif', fontSize: '4rem', margin: 0, color: '#fff' }}>KOODARAM</h2>
          <div style={{ margin: '1.5rem 0', color: '#ffd600' }}>
            <Link to="/" style={{color: '#ffd600'}}>Home</Link> | <Link to="/about" style={{color: '#ffd600'}}>About Us</Link> | <Link to="/browse" style={{color: '#ffd600'}}>Browse Hostels</Link> | <Link to="/list-hostel" style={{color: '#ffd600'}}>List Hostel</Link> | <Link to="/credits" style={{color: '#ffd600'}}>Credits</Link> | <Link to="/terms" style={{color: '#ffd600'}}>Terms</Link> | <Link to="/privacy" style={{color: '#ffd600'}}>Privacy</Link>
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

export default Home;
