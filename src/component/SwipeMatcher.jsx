import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'motion/react';
import { IoClose } from 'react-icons/io5';
import './SwipeMatcher.css';

const GITHUB_USER = "Koodaram-Inc";
const REPO = "koodaram-data";
const API_BASE = `https://api.github.com/repos/${GITHUB_USER}/${REPO}/contents/hostels`;
const RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_USER}/${REPO}/main/hostels`;

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

  useEffect(() => {
    // Prevent scrolling behind modal
    document.body.style.overflow = 'hidden';
    loadHostels();
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

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

  const handleSwipeLeft = () => {
    setCurrentIndex(prev => prev + 1);
  };

  const handleSwipeRight = (hostel) => {
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

  const activeHostel = currentIndex < hostels.length ? hostels[currentIndex] : null;

  return (
    <div className="swipe-matcher-overlay">
      <div className="swipe-matcher-container">
        <button className="swipe-matcher-close" onClick={onClose}>
          <IoClose />
        </button>

        {/* Swiper Workspace */}
        <div className="swipe-workspace">
          <div className="swipe-workspace-header">
            <h2>🔥 Warden Matcher</h2>
            <p>Swipe right to shortlist, left to skip</p>
          </div>

          <div className="swipe-stack-wrapper">
            {loading ? (
              <div className="swipe-loading">
                <div className="swipe-spinner" />
                <span>Fetching Hostels...</span>
              </div>
            ) : activeHostel ? (
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
                <p>You've swiped through all available hostels.</p>
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
              disabled={loading || !activeHostel}
            >
              ❌
            </button>
            <button
              className="swipe-btn swipe-btn-match"
              onClick={() => activeHostel && handleSwipeRight(activeHostel)}
              disabled={loading || !activeHostel}
            >
              💚
            </button>
          </div>
        </div>

        {/* Match Sidebar List */}
        <div className="swipe-sidebar">
          <h3>
            <span>Matched Wishlist</span>
            <span className="swipe-sidebar-count">{matches.length}</span>
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
    </div>
  );
}
