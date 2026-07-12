import { useState, useEffect, useRef } from 'react';

import { Link, useSearchParams, useParams, useNavigate } from 'react-router-dom';
import { HiAdjustmentsHorizontal } from 'react-icons/hi2';
import { 
  IoClose, 
  IoLocationSharp, 
  IoSearch,
  IoBed,
  IoWifi, 
  IoRestaurant, 
  IoVideocam, 
  IoWater, 
  IoSnow, 
  IoCar, 
  IoSparkles, 
  IoShieldCheckmark,
  IoArrowForward
} from 'react-icons/io5';
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


const getAmenityIcon = (amenity) => {
  const norm = amenity.toLowerCase();
  if (norm.includes('wifi') || norm.includes('wi-fi')) return <IoWifi />;
  if (norm.includes('food') || norm.includes('mess') || norm.includes('lunch') || norm.includes('dinner') || norm.includes('homely')) return <IoRestaurant />;
  if (norm.includes('cctv') || norm.includes('security')) return <IoVideocam />;
  if (norm.includes('water')) return <IoWater />;
  if (norm.includes('bathroom') || norm.includes('toilet') || norm.includes('attached')) return <IoShieldCheckmark />;
  if (norm.includes('ac') || norm.includes('cooler') || norm.includes('air cond')) return <IoSnow />;
  if (norm.includes('parking') || norm.includes('garage')) return <IoCar />;
  return <IoSparkles />;
};

const renderAmenityTags = (amenities) => {
  const visible = amenities.slice(0, 4);
  const extra = amenities.length - 4;
  
  return (
    <div className="card-amenities-row">
      {visible.map((amenity, idx) => (
        <div key={idx} className="card-amenity-tag">
          <span className="card-amenity-icon-circle">
            {getAmenityIcon(amenity)}
          </span>
          <span className="card-amenity-text">{amenity}</span>
        </div>
      ))}
      {extra > 0 && (
        <div className="card-amenity-tag-extra">
          +{extra}
        </div>
      )}
    </div>
  );
};

function Browse() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { slug } = useParams();
  const navigate = useNavigate();
  const hostelGridRef = useRef(null);
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

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

  const handleSearchInput = (value) => {
    setSearchQuery(value);
    if (!value.trim()) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    const norm = value.toLowerCase();
    const matched = [];
    const seen = new Set();

    // 1. Match Hostel Names
    hostels.forEach(h => {
      if (h.name && h.name.toLowerCase().includes(norm)) {
        const itemKey = `hostel-${h.id}`;
        if (!seen.has(itemKey)) {
          seen.add(itemKey);
          matched.push({
            type: 'Hostel',
            label: h.name,
            sublabel: h.college || h.location || '',
            value: h.slug || h.folderName || h.id,
            action: 'navigate',
            icon: '🏠'
          });
        }
      }
    });

    // 2. Match Locations (unique area names)
    hostels.forEach(h => {
      if (h.location && h.location.toLowerCase().includes(norm)) {
        const parts = h.location.split(',');
        const area = parts[0].trim();
        const itemKey = `location-${area.toLowerCase()}`;
        if (area && !seen.has(itemKey)) {
          seen.add(itemKey);
          matched.push({
            type: 'Location',
            label: area,
            sublabel: 'Filter by Location',
            value: area,
            action: 'filter_location',
            icon: '📍'
          });
        }
      }
    });

    // 3. Match Amenities
    hostels.forEach(h => {
      h.amenities?.forEach(am => {
        if (am.toLowerCase().includes(norm)) {
          const normAm = am.trim();
          let displayAm = normAm;
          if (normAm.toLowerCase().includes('wifi') || normAm.toLowerCase().includes('wi-fi')) displayAm = 'WiFi';
          else if (normAm.toLowerCase().includes('food') || normAm.toLowerCase().includes('mess') || normAm.toLowerCase().includes('meals')) displayAm = 'Food';
          else if (normAm.toLowerCase().includes('laundry') || normAm.toLowerCase().includes('washing')) displayAm = 'Laundry';
          else if (normAm.toLowerCase().includes('parking')) displayAm = 'Parking';
          else if (normAm.toLowerCase().includes('cctv') || normAm.toLowerCase().includes('security') || normAm.toLowerCase().includes('camera')) displayAm = 'CCTV';
          else if (normAm.toLowerCase().includes('study')) displayAm = 'Study Room';
          else if (normAm.toLowerCase().includes('bathroom') || normAm.toLowerCase().includes('toilet')) displayAm = 'Attached Bathroom';

          const itemKey = `amenity-${displayAm.toLowerCase()}`;
          if (!seen.has(itemKey)) {
            seen.add(itemKey);
            matched.push({
              type: 'Amenity',
              label: displayAm,
              sublabel: 'Filter by Amenity',
              value: displayAm,
              action: 'filter_amenity',
              icon: '✨'
            });
          }
        }
      });
    });

    setSearchResults(matched.slice(0, 7));
    setShowDropdown(true);
  };

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

    const matchesAmenities =
      selectedAmenities.length === 0 ||
      selectedAmenities.every(selectedAm =>
        hostel.amenities?.some(a => a.toLowerCase().includes(selectedAm.toLowerCase()))
      );

    return (
      matchesLocation &&
      matchesCollege &&
      matchesGender &&
      matchesPrice &&
      matchesRating &&
      matchesCurfew &&
      matchesBathroom &&
      matchesAmenities
    );

  }).sort((a, b) => {
    if (a._hasRealImages && !b._hasRealImages) return -1;
    if (!a._hasRealImages && b._hasRealImages) return 1;
    return 0;
  });

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>



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

          <div className="search-bar-wrapper" ref={dropdownRef}>
            <div className="search-input-container">
              <IoSearch className="search-icon" />
              <input
                type="text"
                className="global-search-input"
                placeholder="Search hostels by name, area, facility (e.g. WiFi)..."
                value={searchQuery}
                onChange={(e) => handleSearchInput(e.target.value)}
                onFocus={() => searchQuery.trim() && setShowDropdown(true)}
              />
              {searchQuery && (
                <button className="clear-search-btn" onClick={() => {
                  setSearchQuery('');
                  setSearchResults([]);
                  setShowDropdown(false);
                }}>
                  <IoClose size={18} />
                </button>
              )}
            </div>

            {showDropdown && searchResults.length > 0 && (
              <div className="search-dropdown-menu">
                {searchResults.map((result, idx) => (
                  <div
                    key={idx}
                    className="search-dropdown-item"
                    onClick={() => {
                      if (result.action === 'navigate') {
                        window.open(`/hostel/${result.value}`, '_blank');
                      } else if (result.action === 'filter_location') {
                        handleFilterChange('location', result.value);
                      } else if (result.action === 'filter_amenity') {
                        setSelectedAmenities(prev => prev.includes(result.value) ? prev : [...prev, result.value]);
                      }
                      setSearchQuery('');
                      setShowDropdown(false);
                    }}
                  >
                    <div className="result-icon-box">
                      {result.type === 'Hostel' && <IoBed className="result-icon icon-hostel" />}
                      {result.type === 'Location' && <IoLocationSharp className="result-icon icon-location" />}
                      {result.type === 'Amenity' && (
                        <span className="result-icon icon-amenity">
                          {getAmenityIcon(result.label)}
                        </span>
                      )}
                    </div>
                    <div className="result-text-box">
                      <span className="result-label">{result.label}</span>
                      <span className="result-sublabel">{result.sublabel}</span>
                    </div>
                    <span className={`result-type-badge type-${result.type.toLowerCase()}`}>
                      {result.type}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {(selectedAmenities.length > 0 || filters.location || filters.college) && (
            <div className="active-filters-row">
              {filters.location && (
                <span className="active-filter-tag">
                  📍 Location: {filters.location}
                  <button className="clear-tag-btn" onClick={() => handleFilterChange('location', '')}>&times;</button>
                </span>
              )}
              {filters.college && (
                <span className="active-filter-tag">
                  🎓 College: {filters.college}
                  <button className="clear-tag-btn" onClick={() => handleFilterChange('college', '')}>&times;</button>
                </span>
              )}
              {selectedAmenities.map((am) => (
                <span key={am} className="active-filter-tag">
                  ✨ Amenity: {am}
                  <button className="clear-tag-btn" onClick={() => setSelectedAmenities(prev => prev.filter(x => x !== am))}>&times;</button>
                </span>
              ))}
            </div>
          )}

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
                    spotlightColor="rgba(255, 215, 0, 0.12)"
                  >

                    <div className="hostel-card-image-wrapper">
                      <div className="card-rating-badge">
                        <span className="rating-val">★ {rating > 0 ? rating.toFixed(1) : 'N/A'}</span>
                      </div>

                      {(hostel.images || ["1.jpg"]).slice(0, 1).map((imageName, idx) => (
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

                      <div className="gender-badge-row">
                        <span className={`gender-badge ${gender}`}>
                          {gender === 'female' ? 'FEMALE ONLY' : gender === 'male' ? 'MALE ONLY' : 'UNISEX'}
                        </span>
                      </div>

                      <div className="card-location">
                        <IoLocationSharp className="card-loc-icon" /> {hostel.location}
                      </div>

                      {renderAmenityTags(hostel.amenities || [])}

                      <div className="card-key-badges">
                        {hostel.curfew && (
                          <span className="key-badge curfew-badge">Curfew: <strong className="val-green">{hostel.curfew}</strong></span>
                        )}
                        {hostel.bathroom && (
                          <span className="key-badge bathroom-badge">Bathroom: <strong className="val-gold">{hostel.bathroom}</strong></span>
                        )}
                      </div>

                      <div className="card-divider"></div>

                      <div className="card-footer-row">
                        <div className="card-price-container">
                          <p className="card-price-val">
                            {hostel.price ? `₹${hostel.price}` : 'Price N/A'}{hostel.price && <span>/month</span>}
                          </p>
                          {hostel.advance && (
                            <p className="card-price-advance">
                              Advance: ₹{hostel.advance}
                            </p>
                          )}
                        </div>

                        <Link
                          to={`/hostel/${hostel.folderName}`}
                          className="card-view-btn"
                        >
                          View Details <IoArrowForward className="btn-arrow" />
                        </Link>
                      </div>
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