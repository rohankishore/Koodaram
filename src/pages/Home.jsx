import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Dither from '../component/Dither';
import CardSwap, { Card } from '../component/CardSwap';
import { IoSearch, IoFlame, IoLogoGithub, IoPeopleSharp, IoPricetag } from 'react-icons/io5';
import './Home.css';
import { Analytics } from "@vercel/analytics/react"
import GradualBlur from '../component/GradualBlur';

import Browse from './Browse';
import SwipeMatcher from '../component/SwipeMatcher';

const FONTS = [
  'TacticSans, sans-serif',
  'BrotherHoops, cursive',
  'Thomeo, sans-serif',
  'Impact, Charcoal, sans-serif',
  'Courier New, Courier, monospace',
  'Georgia, Times, serif',
  'Comic Sans MS, cursive',
  'Arial Black, Gadget, sans-serif',
  'Times New Roman, Times, serif',
  'Lucida Console, Monaco, monospace'
];

function ShiftingFont() {
  const [fontIndex, setFontIndex] = useState(0);

  useEffect(() => {
    let timeoutId;
    
    const tick = () => {
      setFontIndex((prev) => (prev + 1) % FONTS.length);
      // Random delay between 100ms and 250ms for a glitchy font-shift effect
      const delay = Math.random() * 150 + 100;
      timeoutId = setTimeout(tick, delay);
    };
    
    timeoutId = setTimeout(tick, 100);
    
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <span className="number-one" style={{ fontFamily: FONTS[fontIndex] }}>
      #1
    </span>
  );
}

// Custom Minimal SVGs for the FAQ Section
const QuestionBubbleIcon = () => (
  <svg className="faq-item-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

const ShieldIcon = () => (
  <svg className="faq-item-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

const RupeeIcon = () => (
  <svg className="faq-item-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9h12M6 5h12M6 5c6 0 9 3 9 7s-3 7-9 7M9 12h9M9 12l9 7" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="faq-item-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const UsersIcon = () => (
  <svg className="faq-item-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const BuildingIcon = () => (
  <svg className="faq-item-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
    <line x1="9" y1="22" x2="9" y2="16"></line>
    <line x1="15" y1="22" x2="15" y2="16"></line>
    <line x1="9" y1="16" x2="15" y2="16"></line>
    <path d="M8 6h2v2H8V6zm0 4h2v2H8v-2zm8-4h2v2h-2V6zm0 4h2v2h-2v-2z"></path>
  </svg>
);

const LightbulbIcon = () => (
  <svg className="faq-footer-bulb" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1 .4 2.5 1.5 3.5.7.8 1.3 1.5 1.5 2.5"></path>
    <line x1="9" y1="18" x2="15" y2="18"></line>
    <line x1="10" y1="22" x2="14" y2="22"></line>
  </svg>
);

const renderFaqIcon = (type) => {
  switch (type) {
    case 'help':
      return <QuestionBubbleIcon />;
    case 'shield':
      return <ShieldIcon />;
    case 'rupee':
      return <RupeeIcon />;
    case 'calendar':
      return <CalendarIcon />;
    case 'users':
      return <UsersIcon />;
    case 'building':
      return <BuildingIcon />;
    default:
      return <QuestionBubbleIcon />;
  }
};

function Home() {
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [hostelCount, setHostelCount] = useState(0);
  const [showSwipeMatcher, setShowSwipeMatcher] = useState(false);
  const collegeCount = 9;

  useEffect(() => {
    fetch('https://api.github.com/repos/Koodaram-Inc/koodaram-data/contents/hostels')
      .then(res => res.json())
      .then(folders => setHostelCount(folders.length));
  }, []);

  const toggleQuestion = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  const faqData = [
    {
      question: "What is Koodaram?",
      answer: "Koodaram is a platform that helps students discover and compare verified hostels near their college. We make finding the right place to stay simple, safe, and reliable.",
      iconType: "help",
      theme: "yellow"
    },
    {
      question: "How are hostels verified?",
      answer: "Our model is built on student verification. While we don't check every hostel personally, information is submitted and validated by a network of students who keep the listings up-to-date.",
      iconType: "shield",
      theme: "green"
    },
    {
      question: "Does Koodaram charge any fees?",
      answer: "No! Koodaram is completely free (free as in freedom) for students. We do not charge any commission, listing fees, or booking fees.",
      iconType: "rupee",
      theme: "purple"
    },
    {
      question: "Can I visit the hostel before booking?",
      answer: "Yes! Since you contact the owners directly, you can coordinate a visit to the hostel to check the facilities before making any payment.",
      iconType: "calendar",
      theme: "blue"
    },
    {
      question: "Is Koodaram only for my college?",
      answer: "No, Koodaram is expanding to cover hostels near all major colleges across Kerala. You can search by your college name to see available listings.",
      iconType: "users",
      theme: "pink"
    },
    {
      question: "How can I list my hostel on Koodaram?",
      answer: "You can list your hostel by clicking the 'List Your Hostel' button on our platform. Since we are open-source, all listings are stored transparently on GitHub.",
      iconType: "building",
      theme: "orange"
    }
  ];

  return (
    <>
      <div className="page-dither" style={{ minHeight: '100vh', width: '100vw', position: 'fixed', top: 0, left: 0, zIndex: 0, filter: 'blur(10px) saturate(1.2)' }}>
        <Dither />
      </div>
      <div style={{ position: 'relative', zIndex: 10 }}>
        <div className="hero">
          <h1>Kerala's <ShiftingFont /> Open Hostel Finder</h1>
          <p>A completely free and open-source platform for finding and verifying hostels near your campus. No accounts, no paywalls, no corporate control.</p>
          <div className="hero-counts" style={{margin: '1.2rem auto 0', display: 'flex', justifyContent: 'center', gap: '1rem'}}>
            <span className="hero-pill">{hostelCount} hostels listed</span>
            <span className="hero-pill">{collegeCount} colleges covered</span>
          </div>
          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', position: 'relative', zIndex: 10 }}>
            <Link to="/browse" className="cta-button" style={{ marginTop: 0 }}><IoSearch size={18} /> Find Your Hostel</Link>
            <button className="cta-button secondary-cta" style={{ marginTop: 0 }} onClick={() => setShowSwipeMatcher(true)}><IoFlame size={18} /> Hostel Match</button>
          </div>
        </div>

        {/* Marquee with quotes and diamonds */}
        <div className="quote-marquee">
          <div className="quote-marquee-track">
            <div className="quote-marquee-seq">
              <span>open source</span>
              <span className="diamond">✦</span>
              <span>student verified</span>
              <span className="diamond">✦</span>
              <span>no paywalls</span>
              <span className="diamond">✦</span>
              <span>free forever</span>
              <span className="diamond">✦</span>
              <span>privacy first</span>
              <span className="diamond">✦</span>
              <span>community powered</span>
              <span className="diamond">✦</span>
              <span>open data</span>
              <span className="diamond">✦</span>
              <span>for students, by students</span>
              <span className="diamond">✦</span>
              <span>no ads</span>
              <span className="diamond">✦</span>
              <span>no login required</span>
              <span className="diamond">✦</span>
              <span>zero data collected</span>
              <span className="diamond">✦</span>
            </div>
            <div className="quote-marquee-seq">
              <span>open source</span>
              <span className="diamond">✦</span>
              <span>student verified</span>
              <span className="diamond">✦</span>
              <span>no paywalls</span>
              <span className="diamond">✦</span>
              <span>free forever</span>
              <span className="diamond">✦</span>
              <span>privacy first</span>
              <span className="diamond">✦</span>
              <span>community powered</span>
              <span className="diamond">✦</span>
              <span>open data</span>
              <span className="diamond">✦</span>
              <span>for students, by students</span>
              <span className="diamond">✦</span>
              <span>no ads</span>
              <span className="diamond">✦</span>
              <span>no login required</span>
              <span className="diamond">✦</span>
              <span>zero data collected</span>
            </div>
          </div>
        </div>

        <section className="how-it-works-section">
          <div className="how-it-works-badge-container">
            <span className="how-it-works-badge">HOW IT WORKS</span>
          </div>
          <h2 className="how-it-works-heading">
            Simple. Transparent. <span className="highlight">Student First.</span>
          </h2>
          <p className="how-it-works-sub">
            Koodaram is built by students, for students.<br />
            Here’s how we make hostel hunting easy, honest, and hassle-free.
          </p>

          <div className="steps-container">
            {/* Card 01 - Open Source */}
            <div className="step-card card-open-source">
              <div className="step-card-header">
                <span className="step-badge">01</span>
                <span className="step-grip-dots">
                  <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                </span>
              </div>
              <div className="step-icon-wrapper">
                <img src="/assets/images/icons/pwa_open_source.png" alt="Open Source" className="step-icon-img" />
              </div>
              <h3>100% Open Source</h3>
              <div className="step-card-divider line-green"></div>
              <p>All hostel data is open and hosted on GitHub. Anyone can access, contribute, or verify information.</p>
              <div className="step-pill-badge pill-green">
                <IoLogoGithub className="pill-icon" /> Open. Transparent. Trusted.
              </div>
            </div>

            {/* Card 02 - Student Verified */}
            <div className="step-card card-verified">
              <div className="step-card-header">
                <span className="step-badge">02</span>
                <span className="step-grip-dots">
                  <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                </span>
              </div>
              <div className="step-icon-wrapper">
                <img src="/assets/images/icons/pwa_verified.png" alt="Student Verified" className="step-icon-img" />
              </div>
              <h3>Student Verified</h3>
              <div className="step-card-divider line-gold"></div>
              <p>Real students add and verify hostel details, photos, and facilities to ensure everything is accurate and reliable.</p>
              <div className="step-pill-badge pill-gold">
                <IoPeopleSharp className="pill-icon" /> By students, for students.
              </div>
            </div>

            {/* Card 03 - Completely Free */}
            <div className="step-card card-free">
              <div className="step-card-header">
                <span className="step-badge">03</span>
                <span className="step-grip-dots">
                  <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                </span>
              </div>
              <div className="step-icon-wrapper">
                <img src="/assets/images/icons/pwa_free.png" alt="Completely Free" className="step-icon-img" />
              </div>
              <h3>Completely Free</h3>
              <div className="step-card-divider line-purple"></div>
              <p>No hidden charges. No subscriptions. Browse, contact, and stay — absolutely free forever.</p>
              <div className="step-pill-badge pill-purple">
                <IoPricetag className="pill-icon" /> Free forever. Always will be.
              </div>
            </div>
          </div>
        </section>

        <section className="rating-guide-section">
          <h2 className="rating-guide-heading">Read the Cards at a Glance</h2>
          <p className="rating-guide-sub">Every hostel card is color-coded by its student rating. No need to squint at numbers.</p>
          <div className="rating-guide-grid">
            <div className="rating-guide-item">
              <div className="rating-swatch swatch-green"></div>
              <div className="rating-guide-label">Above 4 ★</div>
              <div className="rating-guide-desc">Excellent</div>
            </div>
            <div className="rating-guide-item">
              <div className="rating-swatch swatch-yellow"></div>
              <div className="rating-guide-label">3 – 4 ★ / No ratings</div>
              <div className="rating-guide-desc">Good</div>
            </div>
            <div className="rating-guide-item">
              <div className="rating-swatch swatch-orange"></div>
              <div className="rating-guide-label">2 – 3 ★</div>
              <div className="rating-guide-desc">Average</div>
            </div>
            <div className="rating-guide-item">
              <div className="rating-swatch swatch-red"></div>
              <div className="rating-guide-label">Below 2 ★</div>
              <div className="rating-guide-desc">Poor</div>
            </div>
          </div>
        </section>

        <section className="faq-section">
          <div className="faq-badge-container">
            <div className="faq-badge">
              <QuestionBubbleIcon />
              <span>FAQ</span>
            </div>
          </div>
          <h2 className="faq-title">
            Got Questions? We've Got{" "}
            <span className="faq-highlight">
              Answers.
              <svg className="brush-stroke" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M2,15 Q50,5 98,15 Q50,11 2,15" fill="none" stroke="#ffd600" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
          <p className="faq-subheading">
            Everything you need to know about Koodaram.
          </p>
          
          <div className="faq-divider">
            <div className="faq-divider-line"></div>
            <svg className="faq-divider-home" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#ffd600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <div className="faq-divider-line"></div>
          </div>

          <div className="faq-accordion">
            {faqData.map((faq, index) => {
              const isActive = activeQuestion === index;
              return (
                <div 
                  key={index} 
                  className={`faq-accordion-item ${isActive ? 'active' : ''} faq-theme-${faq.theme}`}
                >
                  <div className="faq-accordion-header" onClick={() => toggleQuestion(index)}>
                    <div className="faq-question-left">
                      <div className="faq-icon-box">
                        {renderFaqIcon(faq.iconType)}
                      </div>
                      <span className="faq-question-text">{faq.question}</span>
                    </div>
                    
                    <div className="faq-btn-right">
                      {isActive ? (
                        <>
                          <div className="faq-vertical-divider"></div>
                          <div className="faq-toggle-btn active">
                            <span className="faq-toggle-icon">−</span>
                          </div>
                        </>
                      ) : (
                        <div className="faq-toggle-btn">
                          <span className="faq-toggle-icon">+</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="faq-accordion-answer">
                    <div className="faq-answer-inner">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="faq-footer-card">
            <div className="faq-footer-left">
              <div className="faq-footer-bulb-box">
                <LightbulbIcon />
              </div>
              <div className="faq-footer-text">
                <h3>Still have questions?</h3>
                <p>We're here to help you!</p>
              </div>
            </div>
            <div className="faq-footer-divider"></div>
            <div className="faq-footer-right">
              <a 
                href="mailto:support@koodaram.org" 
                className="faq-contact-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="faq-contact-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <span>Contact Support</span>
                <span className="faq-contact-arrow">↗</span>
              </a>
            </div>
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
            <Link to="/" style={{color: '#ffd600'}}>Home</Link> | <Link to="/about" style={{color: '#ffd600'}}>About Us</Link> | <Link to="/browse" style={{color: '#ffd600'}}>Browse Hostels</Link> | <Link to="/list-hostel" style={{color: '#ffd600'}}>List Hostel</Link> | <Link to="/datasheet" style={{color: '#ffd600'}}>Datasheet</Link> | <Link to="/credits" style={{color: '#ffd600'}}>Credits</Link> | <Link to="/terms" style={{color: '#ffd600'}}>Terms</Link> | <Link to="/privacy" style={{color: '#ffd600'}}>Privacy</Link>
          </div>
          <div style={{ fontSize: '1rem', color: '#fff', marginBottom: '0.5rem' }}>Open Source Initiative</div>
          <div style={{ fontSize: '1rem', color: '#fff' }}>© 2026 Koodaram</div>
          <div style={{ fontSize: '1rem', color: '#fff', marginTop: '1.5rem' }}>
            Made with <span style={{color: 'red', fontSize: '1.2em', verticalAlign: 'middle'}}>♥</span> by <a href="https://github.com/rohankishore" target="_blank" rel="noopener noreferrer" style={{color: '#ffd600', textDecoration: 'underline'}}>Rohan Kishore</a>
          </div>
        </section>
      </div>
      {showSwipeMatcher && <SwipeMatcher onClose={() => setShowSwipeMatcher(false)} />}
    </>
  );
}

export default Home;
