/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'motion/react';
import { IoClose } from 'react-icons/io5';
import './SwipeMatcher.css';

const GITHUB_USER = "Koodaram-Inc";
const REPO = "koodaram-data";
const API_BASE = `https://api.github.com/repos/${GITHUB_USER}/${REPO}/contents/hostels`;
const RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_USER}/${REPO}/main/hostels`;

const COLLEGES = [
  { name: 'CET Trivandrum', query: 'cet', emoji: '🏛️', logo: '/assets/images/colleges/cet.png' },
  { name: 'CUSAT Kochi', query: 'cusat', emoji: '🐬', logo: '/assets/images/colleges/cusat.png' },
  { name: 'CUCEK Kuttanad', query: 'cucek', emoji: '🌾', logo: '/assets/images/colleges/cucek.png' },
  { name: 'SCT Trivandrum', query: 'sct', emoji: '⚙️', logo: '/assets/images/colleges/sctce.png' },
  { name: 'GEC Kozhikode', query: 'gec-kkd', emoji: '🌊', logo: '/assets/images/colleges/geckz.png' },
  { name: 'GEC Palakkad', query: 'gec-pkd', emoji: '🏔️', logo: '/assets/images/colleges/gecpkd.png' },
  { name: 'GEC Thrissur', query: 'gec-tsr', emoji: '🎪', logo: '/assets/images/colleges/gect.png' },
  { name: 'NSS College Palakkad', query: 'nss', emoji: '🌴', logo: '/assets/images/colleges/nsspkd.png' },
  { name: 'RIT Kottayam', query: 'rit', emoji: '🛶', logo: '/assets/images/colleges/rit.png' },
];

const GENDERS = [
  { name: 'Boys', value: 'male', emoji: '🙋‍♂️' },
  { name: 'Girls', value: 'female', emoji: '🙋‍♀️' },
  { name: 'Show All', value: 'all', emoji: '🚻' }
];

const matchesCollegeFilter = (hostelCollege, query) => {
  if (!hostelCollege || !query) return false;
  const hc = hostelCollege.toLowerCase();
  const q = query.toLowerCase();
  
  if (hc.includes(q) || q.includes(hc)) return true;
  
  // Custom aliases mapping
  const aliases = {
    'cet': ['college of engineering trivandrum', 'cet'],
    'cusat': ['cochin university of science and technology', 'cusat'],
    'cucek': ['cochin university college of engineering kuttanad', 'cucek'],
    'sct': ['sct college of engineering', 'sct trivandrum', 'sct'],
    'gec-kkd': ['government engineering college kozhikode', 'gec kozhikode', 'gec kkd'],
    'gec-pkd': ['government engineering college palakkad', 'gec palakkad', 'gec pkd'],
    'gec-tsr': ['government engineering college thrissur', 'gec thrissur', 'gec tsr'],
    'nss': ['nss college of engineering', 'nss college palakkad', 'nss'],
    'rit': ['rajiv gandhi institute of technology', 'rit kottayam', 'rit']
  };

  if (aliases[q]) {
    return aliases[q].some(alias => hc.includes(alias) || alias.includes(hc));
  }
  
  return false;
};

// Play a small synthesized haptic sound using Web Audio API
const playSound = (type) => {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    const now = ctx.currentTime;
    
    if (type === 'match') {
      // Pleasant high-pitch match chime
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(880.00, now + 0.1); // A5
      
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      
      osc.start(now);
      osc.stop(now + 0.15);
    } else {
      // Low-pitch tactile skip blip
      osc.type = 'sine';
      osc.frequency.setValueAtTime(150.00, now);
      osc.frequency.exponentialRampToValueAtTime(80.00, now + 0.08);
      
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      
      osc.start(now);
      osc.stop(now + 0.08);
    }
  } catch (e) {
    // Ignore context blocks
  }
};

// Swiping card component using framer-motion
function SwipeCard({ hostel, onSwipeLeft, onSwipeRight }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-30, 30]);
  const opacity = useTransform(x, [-150, 0, 150], [0.5, 1, 0.5]);

  const handleDragEnd = (event, info) => {
    if (info.offset.x < -120) {
      onSwipeLeft();
    } else if (info.offset.x > 120) {
      onSwipeRight();
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const resolvedImage = hostel.images && hostel.images.length > 0
    ? `${RAW_BASE}/${hostel.slug}/${hostel.images[0]}`
    : null;

  return (
    <motion.div
      className="swipe-matcher-card"
      style={{ x, y, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="swipe-card-media">
        {resolvedImage ? (
          <img src={resolvedImage} alt={hostel.name} draggable="false" />
        ) : (
          <div className="swipe-media-placeholder">
            <span className="icon">🏠</span>
            <span>No Image</span>
          </div>
        )}
        {hostel.gender && (
          <span className={`swipe-card-gender-pill gender-${hostel.gender.toLowerCase()}`}>
            {hostel.gender}
          </span>
        )}
        <span className="swipe-card-price-pill">₹{hostel.price}/mo</span>
      </div>

      <div className="swipe-card-details">
        <div>
          <h3>{hostel.name}</h3>
          <div className="info-row">
            <span>📍</span>
            <span>{hostel.location}</span>
          </div>
          <div className="info-row">
            <span>🎓</span>
            <span>{hostel.college}</span>
          </div>
          {hostel.roomType && (
            <div className="info-row">
              <span>🛏️</span>
              <span>{hostel.roomType}</span>
            </div>
          )}
          {hostel.bathroom && (
            <div className="info-row">
              <span>🚿</span>
              <span>Bathroom: {hostel.bathroom}</span>
            </div>
          )}
        </div>

        {hostel.amenities && hostel.amenities.length > 0 && (
          <div className="amenities-list">
            {hostel.amenities.slice(0, 3).map((am, i) => (
              <span key={i} className="swipe-amenity-pill">{am}</span>
            ))}
            {hostel.amenities.length > 3 && (
              <span className="swipe-amenity-pill">+{hostel.amenities.length - 3}</span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function SwipeMatcher({ onClose }) {
  const [hostels, setHostels] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [activeMobileTab, setActiveMobileTab] = useState('swipe'); // 'swipe' or 'matches'

  useEffect(() => {
    // Prevent scrolling behind modal
    document.body.style.overflow = 'hidden';

    const loadHostels = async () => {
      try {
        const res = await fetch(API_BASE);
        const folders = await res.json();

        const hostelPromises = folders.map(folder => {
          const jsonURL = `${RAW_BASE}/${folder.name}/data.json`;
          return fetch(jsonURL)
            .then(res => res.json())
            .then(data => ({
              ...data,
              slug: folder.name
            }))
            .catch(() => null);
        });

        const results = await Promise.all(hostelPromises);
        const validHostels = results.filter(h => h !== null);
        
        // Shuffle the hostels so every swiping session feels unique
        const shuffled = [...validHostels].sort(() => Math.random() - 0.5);
        
        setHostels(shuffled);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    };

    loadHostels();
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleSwipeLeft = () => {
    playSound('skip');
    setCurrentIndex(prev => prev + 1);
  };

  const handleSwipeRight = (hostel) => {
    playSound('match');
    setMatches(prev => {
      // Avoid duplicate matches
      if (prev.some(m => m.slug === hostel.slug)) return prev;
      return [...prev, hostel];
    });
    setCurrentIndex(prev => prev + 1);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    const shuffled = [...hostels].sort(() => Math.random() - 0.5);
    setHostels(shuffled);
  };

  const handleResetFilters = () => {
    setSelectedCollege(null);
    setSelectedGender(null);
    setCurrentIndex(0);
  };

  const filteredHostels = hostels.filter(h => {
    // 1. College Match
    const matchesCollege = selectedCollege === 'All' 
      ? true 
      : matchesCollegeFilter(h.college, selectedCollege);

    // 2. Gender Match
    const hostelGender = h.gender?.toLowerCase();
    const matchesGender = selectedGender === 'all'
      ? true
      : (hostelGender === selectedGender || hostelGender === 'unisex');

    return matchesCollege && matchesGender;
  });

  const activeHostel = currentIndex < filteredHostels.length ? filteredHostels[currentIndex] : null;

  return (
    <div className="swipe-matcher-overlay">
      <div className="swipe-matcher-container">
        <button className="swipe-matcher-close" onClick={onClose}>
          <IoClose />
        </button>

        {loading ? (
          <div className="swipe-loading" style={{ width: '100%', height: '100%' }}>
            <div className="swipe-spinner" />
            <span>Preloading Hostels...</span>
          </div>
        ) : !selectedCollege ? (
          /* Step 1: College Selector Screen */
          <div className="college-selector-screen">
            <h2>🎓 Pick Your College</h2>
            <p>Select your campus to show nearby hostels, or explore everything!</p>
            
            <div className="college-grid">
              {COLLEGES.map((col) => (
                <div 
                  key={col.query} 
                  className="college-card"
                  onClick={() => {
                    setSelectedCollege(col.query);
                    setCurrentIndex(0);
                  }}
                >
                  {col.logo ? (
                    <img 
                      src={col.logo} 
                      alt={col.name} 
                      className="college-logo-img"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentNode.querySelector('.icon').style.display = 'block';
                      }}
                    />
                  ) : null}
                  <span className="icon" style={{ display: col.logo ? 'none' : 'block' }}>{col.emoji}</span>
                  <span>{col.name}</span>
                </div>
              ))}
            </div>

            <div className="college-selector-footer">
              <button 
                className="swipe-all-btn"
                onClick={() => {
                  setSelectedCollege('All');
                  setCurrentIndex(0);
                }}
              >
                🌐 Swipe All Hostels (No Filter)
              </button>
            </div>
          </div>
        ) : !selectedGender ? (
          /* Step 2: Gender Selector Screen */
          <div className="college-selector-screen">
            <h2>🙋‍♂️ Select Your Category</h2>
            <p>Help us find the right hostels for you</p>
            
            <div className="college-grid" style={{ maxWidth: '500px' }}>
              {GENDERS.map((g) => (
                <div 
                  key={g.value} 
                  className="college-card"
                  onClick={() => {
                    setSelectedGender(g.value);
                    setCurrentIndex(0);
                  }}
                >
                  <span className="icon">{g.emoji}</span>
                  <span>{g.name}</span>
                </div>
              ))}
            </div>

            <div className="college-selector-footer" style={{ marginTop: '1rem' }}>
              <button 
                className="swipe-all-btn"
                onClick={() => setSelectedCollege(null)}
              >
                ⬅️ Back to College Selection
              </button>
            </div>
          </div>
        ) : (
          /* Swiper Workspace & Sidebar wrapper */
          <>
            {/* Mobile Tab Switcher */}
            <div className="swipe-mobile-tabs">
              <button 
                className={activeMobileTab === 'swipe' ? 'active' : ''} 
                onClick={() => setActiveMobileTab('swipe')}
              >
                🔥 Swipe
              </button>
              <button 
                className={activeMobileTab === 'matches' ? 'active' : ''} 
                onClick={() => setActiveMobileTab('matches')}
              >
                💚 Matches ({matches.length})
              </button>
            </div>

            <div className="swipe-matcher-content-row">
              {/* Swiper Workspace */}
              <div className={`swipe-workspace ${activeMobileTab !== 'swipe' ? 'mobile-hidden' : ''}`}>
                <div className="swipe-workspace-header">
                  <h2>🔥 Hostel Match</h2>
                  <p>
                    Showing <strong>{selectedGender === 'all' ? 'all' : selectedGender === 'male' ? 'boys' : 'girls'}</strong> hostels near <strong>{selectedCollege === 'All' ? 'all campuses' : selectedCollege.toUpperCase()}</strong>
                  </p>
                  <button className="change-college-btn" onClick={handleResetFilters}>
                    🎓 Reset Filters
                  </button>
                </div>

                <div className="swipe-stack-wrapper">
                  {activeHostel ? (
                    <AnimatePresence mode="popLayout">
                      <SwipeCard
                        key={activeHostel.slug}
                        hostel={activeHostel}
                        onSwipeLeft={handleSwipeLeft}
                        onSwipeRight={() => handleSwipeRight(activeHostel)}
                      />
                    </AnimatePresence>
                  ) : (
                    <div className="swipe-stack-empty">
                      <h4>🎉 That's all for now!</h4>
                      <p>You've swiped through all matching hostels near this campus.</p>
                      <button className="swipe-reset-btn" onClick={handleReset}>
                        🔄 Swipe Again
                      </button>
                    </div>
                  )}
                </div>

                {/* Swipe Buttons */}
                <div className="swipe-controls">
                  <button
                    className="swipe-btn swipe-btn-skip"
                    onClick={handleSwipeLeft}
                    disabled={!activeHostel}
                  >
                    ❌
                  </button>
                  <button
                    className="swipe-btn swipe-btn-match"
                    onClick={() => activeHostel && handleSwipeRight(activeHostel)}
                    disabled={!activeHostel}
                  >
                    💚
                  </button>
                </div>
              </div>

              {/* Match Sidebar List */}
              <div className={`swipe-sidebar ${activeMobileTab !== 'matches' ? 'mobile-hidden' : ''}`}>
                <h3>
                  <span>Matched Wishlist</span>
                  <motion.span 
                    key={matches.length}
                    className="swipe-sidebar-count"
                    initial={{ scale: 0.6, rotate: -15, backgroundColor: '#4caf50' }}
                    animate={{ scale: 1, rotate: 0, backgroundColor: 'rgba(255, 215, 0, 0.15)' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                  >
                    {matches.length}
                  </motion.span>
                </h3>

                {matches.length === 0 ? (
                  <div className="swipe-no-matches">
                    <span className="icon">💬</span>
                    <span>Your matches will appear here. Start swiping!</span>
                  </div>
                ) : (
                  <div className="swipe-match-list">
                    {matches.map((match) => {
                      const thumb = match.images && match.images.length > 0
                        ? `${RAW_BASE}/${match.slug}/${match.images[0]}`
                        : null;

                      return (
                        <div key={match.slug} className="swipe-match-item">
                          <div className="swipe-match-thumb">
                            {thumb ? (
                              <img src={thumb} alt={match.name} />
                            ) : (
                              <span>🏠</span>
                            )}
                          </div>
                          <div className="swipe-match-info">
                            <h4>{match.name}</h4>
                            <p>₹{match.price}/mo • {match.college}</p>
                          </div>
                          <a
                            className="swipe-match-view-btn"
                            href={`/hostel/${match.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View
                          </a>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
