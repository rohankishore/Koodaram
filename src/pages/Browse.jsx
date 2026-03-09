import { useState, useEffect, useRef } from 'react';
import Dither from '../component/Dither';
import { Link, useSearchParams, useParams, useNavigate } from 'react-router-dom';
import { HiAdjustmentsHorizontal } from 'react-icons/hi2';
import { IoClose } from 'react-icons/io5';
import SpotlightCard from '../component/SpotlightCard';
import './Browse.css';

const COLLEGE_SLUGS = {
  'College of Engineering Trivandrum': 'cet',
  'cusat': 'cusat',
  'cucek': 'cucek',
  'SCT Trivandrum': 'sct',
  'GEC Kozhikode': 'gec-kkd',
  'GEC Palakkad': 'gec-pkd',
  'GEC Thrissur': 'gec-tsr',
  'NSS College Palakkad': 'nss',
  'RIT Kottayam': 'rit',
};
const SLUG_TO_COLLEGE = Object.fromEntries(Object.entries(COLLEGE_SLUGS).map(([k, v]) => [v, k]));
function filtersToSlug(filters) {
  const parts = [];
  if (COLLEGE_SLUGS[filters.college]) parts.push(COLLEGE_SLUGS[filters.college]);
  if (filters.gender) parts.push(filters.gender);
  if (filters.price) parts.push(filters.price);
  if (filters.rating && filters.rating !== '0-5') parts.push(filters.rating);
  if (filters.curfew) parts.push(filters.curfew);
  if (filters.bathroom) parts.push(filters.bathroom);
  if (filters.location) parts.push(filters.location.replace(/\s+/g, '_'));
  return parts.join('-');
}
function slugToFilters(slug) {
  const parts = (slug || '').split('-');
  let idx = 0;
  let college = '', gender = '', price = '', rating = '0-5', curfew = '', bathroom = '', location = '';
  if (SLUG_TO_COLLEGE[parts[idx]]) {
    college = SLUG_TO_COLLEGE[parts[idx]];
    idx++;
  }
  if (parts[idx] && ['male','female','unisex'].includes(parts[idx])) {
    gender = parts[idx]; idx++;
  }
  if (parts[idx] && /^\d+$/.test(parts[idx])) {
    price = parts[idx]; idx++;
  }
  if (parts[idx] && /^\d-\d$|^\d-\d$|^\d-\d$|^\d-\d$|^\d-\d$|^\d-\d$/.test(parts[idx])) {
    rating = parts[idx]; idx++;
  }
  if (parts[idx] && ['yes','no'].includes(parts[idx])) {
    curfew = parts[idx]; idx++;
  }
  if (parts[idx] && ['common','attached'].includes(parts[idx])) {
    bathroom = parts[idx]; idx++;
  }
  if (parts[idx]) {
    location = parts.slice(idx).join('-').replace(/_/g, ' ');
  }
  return { college, gender, price, rating, curfew, bathroom, location };
}

const GITHUB_USER = "Koodaram-Inc";
const REPO = "koodaram-data";
const API_BASE = `https://api.github.com/repos/${GITHUB_USER}/${REPO}/contents/hostels`;
const RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_USER}/${REPO}/main/hostels`;


function Browse() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { slug } = useParams();
  const navigate = useNavigate();
  const hostelGridRef = useRef(null);
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // On mount, parse slug to filters
  const [filters, setFilters] = useState(() => {
    if (slug) return slugToFilters(slug);
    return {
      location: '',
      college: '',
      gender: '',
      price: '',
      rating: '0-5',
      curfew: '',
      bathroom: ''
    };
  });

  useEffect(() => {
    loadHostels();
  }, []);

  const loadHostels = async () => {
    try {
      const res = await fetch(API_BASE);
      const folders = await res.json();

      const hostelPromises = folders.map(folder => {
        const jsonURL = `${RAW_BASE}/${folder.name}/data.json`;
        return fetch(jsonURL)
          .then(res => res.json())
          .then(data => {
            data.id = folder.name;
            data.folderName = folder.name;
            return data;
          })
          .catch(() => null);
      });

      const hostelsData = (await Promise.all(hostelPromises)).filter(Boolean);

      await Promise.all(
        hostelsData.map(async (hostel) => {
          if (!hostel.images || hostel.images.length === 0) {
            hostel._hasRealImages = false;
            return;
          }
          try {
            const r = await fetch(`${RAW_BASE}/${hostel.folderName}/${hostel.images[0]}`, { method: 'HEAD' });
            hostel._hasRealImages = r.ok;
          } catch {
            hostel._hasRealImages = false;
          }
        })
      );

      hostelsData.sort((a, b) => {
        if (a._hasRealImages && !b._hasRealImages) return -1;
        if (!a._hasRealImages && b._hasRealImages) return 1;
        return 0;
      });

      setHostels(hostelsData);
      setLoading(false);

    } catch (error) {
      console.error("Error loading hostels:", error);
      setLoading(false);
    }
  };


  // Update URL on any filter change
  const handleFilterChange = (key, value) => {
    setFilters(prev => {
      const updated = { ...prev, [key]: value };
      // Only update URL if not initial mount
      const slug = filtersToSlug(updated);
      navigate(`/browse/${slug}`);
      setTimeout(() => {
        hostelGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
      return updated;
    });
  };

  const applyFilters = () => {
    const params = {};

    if (filters.location) params.location = filters.location;
    if (filters.college) params.college = filters.college;
    if (filters.gender) params.gender = filters.gender;
    if (filters.price) params.price = filters.price;
    params.rating = filters.rating;
    if (filters.curfew) params.curfew = filters.curfew;
    if (filters.bathroom) params.bathroom = filters.bathroom;

    setSearchParams(params);
    setShowFilters(false);
  };

  // College change just calls handleFilterChange
  const handleCollegeChange = (value) => handleFilterChange('college', value);

  const getRatingBorderClass = (rating) => {
    if (!rating || rating === 0) return 'rating-border-yellow';
    if (rating > 4) return 'rating-border-green';
    if (rating >= 3) return 'rating-border-yellow';
    if (rating >= 2) return 'rating-border-red';
    return 'rating-border-red';
  };

  const renderStars = (rating) => {
    const full = "★";
    const empty = "☆";
    const value = Math.round(rating);

    return (
      <div className="rating-stars" title={`${rating}/5`}>
        {full.repeat(value)}{empty.repeat(5 - value)}
      </div>
    );
  };

  const filteredHostels = hostels.filter(hostel => {

    const matchesLocation =
      !filters.location ||
      hostel.location?.toLowerCase().includes(filters.location.toLowerCase());

    const matchesCollege =
      !filters.college ||
      hostel.college?.toLowerCase().includes(filters.college.toLowerCase());

    const matchesGender =
      !filters.gender ||
      hostel.gender?.toLowerCase() === filters.gender.toLowerCase();

    const matchesPrice =
      !filters.price ||
      parseInt(hostel.price) <= parseInt(filters.price);

    const [ratingMin, ratingMax] = filters.rating.split('-').map(Number);
    const rating = parseFloat(hostel.rating) || 0;

    const matchesRating =
      rating >= ratingMin && rating <= ratingMax;

    const matchesCurfew =
      !filters.curfew ||
      (hostel.curfew && hostel.curfew.toLowerCase() === filters.curfew.toLowerCase());

    const matchesBathroom =
      !filters.bathroom ||
      (hostel.bathroom && hostel.bathroom.toLowerCase() === filters.bathroom.toLowerCase());

    return (
      matchesLocation &&
      matchesCollege &&
      matchesGender &&
      matchesPrice &&
      matchesRating &&
      matchesCurfew &&
      matchesBathroom
    );

  }).sort((a, b) => {
    if (a._hasRealImages && !b._hasRealImages) return -1;
    if (!a._hasRealImages && b._hasRealImages) return 1;
    return 0;
  });

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>

      <div className="page-dither">
        <Dither />
      </div>

      <div className="page-container" style={{ position: 'relative', zIndex: 10 }}>

        {showFilters && (
          <div
            className="filter-overlay"
            onClick={() => setShowFilters(false)}
          />
        )}

        {!showFilters && (
          <button
            className="mobile-filter-toggle"
            onClick={() => setShowFilters(true)}
          >
            <HiAdjustmentsHorizontal size={24} />
            <span>Filters</span>
          </button>
        )}

        <aside className={`filters ${showFilters ? 'filters-open' : ''}`}>

          <div className="filters-header">
            <h2>Filters</h2>
            <button
              className="close-filters"
              onClick={() => setShowFilters(false)}
            >
              <IoClose size={24} />
            </button>
          </div>

          <div className="filter-group">
            <label>Location</label>
            <input
              type="text"
              placeholder="Enter city or area"
              value={filters.location}
              onChange={(e) =>
                handleFilterChange('location', e.target.value)
              }
            />
          </div>

          <div className="filter-group">
            <label>College</label>
            <select
              value={filters.college}
              onChange={(e) =>
                handleCollegeChange(e.target.value)
              }
            >
              <option value="">All</option>
              <option value="College of Engineering Trivandrum">College of Engineering Trivandrum</option>
              <option value="cusat">CUSAT</option>
              <option value="cucek">CUCEK</option>
              <option value="SCT Trivandrum">SCT Trivandrum</option>
              <option value="GEC Kozhikode">GEC Kozhikode</option>
              <option value="GEC Palakkad">GEC Palakkad</option>
              <option value="GEC Thrissur">GEC Thrissur</option>
              <option value="NSS College Palakkad">NSS College Palakkad</option>
              <option value="RIT Kottayam">RIT Kottayam</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Gender</label>
            <select
              value={filters.gender}
              onChange={(e) =>
                handleFilterChange('gender', e.target.value)
              }
            >
              <option value="">All</option>
              <option value="male">Male Only</option>
              <option value="female">Female Only</option>
              <option value="unisex">Unisex</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Max Price</label>
            <input
              type="number"
              placeholder="e.g. 5000"
              value={filters.price}
              onChange={(e) =>
                handleFilterChange('price', e.target.value)
              }
            />
          </div>

          <div className="filter-group">
            <label>Rating</label>
            <select
              value={filters.rating}
              onChange={(e) =>
                handleFilterChange('rating', e.target.value)
              }
            >
              <option value="0-5">All</option>
              <option value="5-5">5 only</option>
              <option value="4-5">4–5</option>
              <option value="3-4">3–4</option>
              <option value="2-3">2–3</option>
              <option value="1-2">1–2</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Curfew</label>
            <select
              value={filters.curfew}
              onChange={(e) =>
                handleFilterChange('curfew', e.target.value)
              }
            >
              <option value="">All</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Bathroom</label>
            <select
              value={filters.bathroom}
              onChange={(e) =>
                handleFilterChange('bathroom', e.target.value)
              }
            >
              <option value="">All</option>
              <option value="common">Common</option>
              <option value="attached">Attached</option>
            </select>
          </div>

          <button
            className="cta-button"
            onClick={applyFilters}
          >
            Apply Filters
          </button>

        </aside>

        <main className="main-content">

          <section
            className="hostel-grid"
            ref={hostelGridRef}
          >

            {loading ? (
              <div className="loading">
                <div
                  className="loader"
                  style={{ margin: '0 auto', color: '#fff' }}
                />
              </div>

            ) : filteredHostels.length === 0 ? (

              <div className="no-results">
                No hostels found matching your criteria
              </div>

            ) : (

              filteredHostels.map(hostel => {

                const gender = hostel.gender?.toLowerCase() || "unisex";
                const rating = parseFloat(hostel.rating) || 0;

                return (

                  <SpotlightCard
                    key={hostel.id}
                    className={`hostel-card ${getRatingBorderClass(rating)}`}
                    spotlightColor="rgba(255, 215, 0, 0.15)"
                  >

                    <div className="hostel-card-image-wrapper">

                      {(hostel.images || ["1.jpg"]).map((imageName, idx) => (

                        <img
                          key={idx}
                          src={`${RAW_BASE}/${hostel.folderName}/${imageName}`}
                          alt={`${hostel.name} - Image ${idx + 1}`}
                          className="card-image"
                          onError={(e) => {
                            e.target.src =
                              'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23333" width="400" height="300"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-size="20"%3ENo Image%3C/text%3E%3C/svg%3E';
                          }}
                        />

                      ))}

                    </div>

                    <div className="hostel-card-content">

                      <h3>{hostel.name}</h3>

                      <div className="hostel-card-meta">
                        {renderStars(rating)}

                        <span className={`gender ${gender}`}>
                          {gender.charAt(0).toUpperCase() + gender.slice(1)}
                        </span>
                      </div>

                      <p style={{ color: '#c5c5c5', marginBottom: '0.4rem' }}>
                        📍 {hostel.location}
                      </p>

                      <p style={{ color: '#c5c5c5', marginBottom: '0.6rem' }}>
                        🛏️ {hostel.roomType}
                      </p>

                      <div className="amenities">
                        {(hostel.amenities || []).map((amenity, idx) => (
                          <span key={idx}>{amenity}</span>
                        ))}

                        {hostel.curfew && (
                          <span>Curfew: {hostel.curfew}</span>
                        )}

                        {hostel.bathroom && (
                          <span>Bathroom: {hostel.bathroom}</span>
                        )}
                      </div>

                      <p
                        style={{
                          fontSize: '1.4rem',
                          fontWeight: '700',
                          color: 'var(--accent)',
                          marginTop: '0.8rem'
                        }}
                      >
                        ₹{hostel.price}
                        <span
                          style={{
                            fontSize: '0.85rem',
                            fontWeight: '400',
                            color: '#999'
                          }}
                        >
                          /month
                        </span>
                      </p>

                      {hostel.advance && (
                        <p
                          style={{
                            fontSize: '0.9rem',
                            color: '#888',
                            marginTop: '0.4rem',
                            marginBottom: '0.8rem'
                          }}
                        >
                          Advance: ₹{hostel.advance}
                        </p>
                      )}

                      <Link
                        to={`/hostel/${hostel.folderName}`}
                        className="view-button"
                      >
                        View Details →
                      </Link>

                    </div>

                  </SpotlightCard>

                );
              })
            )}

          </section>

          <footer className="browse-footer">

            <Link
              to="/"
              style={{
                color: 'var(--primary-gold)',
                textDecoration: 'none',
                fontWeight: '600'
              }}
            >
              ← Back to Home
            </Link>

            <br /><br />

            © 2025 Koodaram

          </footer>

        </main>

      </div>

    </div>
  );
}

export default Browse;