import{ useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { HiAdjustmentsHorizontal } from 'react-icons/hi2';
import { IoClose } from 'react-icons/io5';
import Stack from '../component/Stack';
import SpotlightCard from '../component/SpotlightCard';
import './Browse.css';

const GITHUB_USER = "Koodaram-Inc";
const REPO = "koodaram-data";
const API_BASE = `https://api.github.com/repos/${GITHUB_USER}/${REPO}/contents/hostels`;
const RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_USER}/${REPO}/main/hostels`;

function Browse() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    location: searchParams.get('location') || '',
    college: searchParams.get('college') || '',
    gender: searchParams.get('gender') || '',
    price: searchParams.get('price') || '',
    rating: searchParams.get('rating') || '0-5'
  });

  useEffect(() => {
    loadHostels();
  }, []);

  const loadHostels = async () => {
    try {
      const res = await fetch(API_BASE);
      const folders = await res.json();
      
      const hostelsData = [];
      for (const folder of folders) {
        const jsonURL = `${RAW_BASE}/${folder.name}/data.json`;
        try {
          const res = await fetch(jsonURL);
          const data = await res.json();
          data.id = folder.name;
          data.folderName = folder.name;
          hostelsData.push(data);
        } catch (err) {
          console.warn("Could not load:", folder.name);
        }
      }

      // Sort: hostels with images first
      hostelsData.sort((a, b) => {
        const aHasImages = a.images && a.images.length > 0;
        const bHasImages = b.images && b.images.length > 0;
        if (aHasImages && !bHasImages) return -1;
        if (!aHasImages && bHasImages) return 1;
        return 0;
      });

      setHostels(hostelsData);
      setLoading(false);
    } catch (error) {
      console.error("Error loading hostels:", error);
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    const params = {};
    if (filters.location) params.location = filters.location;
    if (filters.college) params.college = filters.college;
    if (filters.gender) params.gender = filters.gender;
    if (filters.price) params.price = filters.price;
    params.rating = filters.rating;
    setSearchParams(params);
  };

  const handleCollegeChange = (value) => {
    if (value === 'Model Engineering College') {
      window.open('https://hostelfinderbyflink.netlify.app', '_blank');
    }
    handleFilterChange('college', value);
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
    const matchesLocation = !filters.location || 
      hostel.location?.toLowerCase().includes(filters.location.toLowerCase());
    const matchesCollege = !filters.college || 
      hostel.college?.toLowerCase().includes(filters.college.toLowerCase());
    const matchesGender = !filters.gender || 
      hostel.gender?.toLowerCase() === filters.gender.toLowerCase();
    const matchesPrice = !filters.price || 
      parseInt(hostel.price) <= parseInt(filters.price);
    
    const [ratingMin, ratingMax] = filters.rating.split('-').map(Number);
    const rating = parseFloat(hostel.rating) || 0;
    const matchesRating = rating >= ratingMin && rating <= ratingMax;

    return matchesLocation && matchesCollege && matchesGender && matchesPrice && matchesRating;
  });

  return (
    <div className="page-container">
      <button className="mobile-filter-toggle" onClick={() => setShowFilters(!showFilters)}>
        <HiAdjustmentsHorizontal size={24} />
        <span>Filters</span>
      </button>

      <aside className={`filters ${showFilters ? 'filters-open' : ''}`}>
        <div className="filters-header">
          <h2>Filters</h2>
          <button className="close-filters" onClick={() => setShowFilters(false)}>
            <IoClose size={24} />
          </button>
        </div>
        
        <div className="filter-group">
          <label htmlFor="location">Location</label>
          <input 
            type="text" 
            id="location" 
            placeholder="Enter city or area"
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="college">College</label>
          <select 
            id="college"
            value={filters.college}
            onChange={(e) => handleCollegeChange(e.target.value)}
          >
            <option value="">All</option>
            <option value="cusat">CUSAT</option>
            <option value="cucek">CUCEK</option>
            <option value="SCT Trivandrum">SCT Trivandrum</option>
            <option value="GEC Kozhikode">GEC Kozhikode</option>
            <option value="GEC Palakkad">GEC Palakkad</option>
            <option value="GEC Thrissur">GEC Thrissur</option>
            <option value="Model Engineering College">Model Engineering College</option>
            <option value="NSS College Palakkad">NSS College Palakkad</option>
            <option value="RIT Kottayam">RIT Kottayam</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="gender">Gender</label>
          <select 
            id="gender"
            value={filters.gender}
            onChange={(e) => handleFilterChange('gender', e.target.value)}
          >
            <option value="">All</option>
            <option value="male">Male Only</option>
            <option value="female">Female Only</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="price">Max Price</label>
          <input 
            type="number" 
            id="price" 
            placeholder="e.g. 5000"
            value={filters.price}
            onChange={(e) => handleFilterChange('price', e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="ratingRange">Rating</label>
          <select 
            id="ratingRange"
            value={filters.rating}
            onChange={(e) => handleFilterChange('rating', e.target.value)}
          >
            <option value="0-5">All</option>
            <option value="5-5">5 only</option>
            <option value="4-5">4–5</option>
            <option value="3-4">3–4</option>
            <option value="2-3">2–3</option>
            <option value="1-2">1–2</option>
          </select>
        </div>

        <button className="cta-button" onClick={applyFilters}>Apply Filters</button>
      </aside>

      <main className="main-content">
        <section className="hostel-grid">
          {loading ? (
            <div className="loading">Loading hostels...</div>
          ) : filteredHostels.length === 0 ? (
            <div className="no-results">No hostels found matching your criteria</div>
          ) : (
            filteredHostels.map(hostel => {
              const gender = hostel.gender?.toLowerCase() || "unisex";
              const rating = parseFloat(hostel.rating) || 0;
              
              // Create cards array for Stack component from all images
              const imageCards = (hostel.images || ["1.jpg"]).map((imageName, idx) => (
                <img 
                  key={idx}
                  src={`${RAW_BASE}/${hostel.folderName}/${imageName}`}
                  alt={`${hostel.name} - Image ${idx + 1}`}
                  className="card-image"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23333" width="400" height="300"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-size="20"%3ENo Image%3C/text%3E%3C/svg%3E';
                  }}
                />
              ));

              return (
                <SpotlightCard key={hostel.id} className="hostel-card" spotlightColor="rgba(255, 215, 0, 0.15)">
                  <div className="hostel-card-image-wrapper">
                    <Stack 
                      cards={imageCards}
                      randomRotation={true}
                      sensitivity={150}
                      sendToBackOnClick={true}
                      mobileClickOnly={true}
                    />
                  </div>
                  <div className="hostel-card-content">
                    <h3>{hostel.name}</h3>
                    <div className="hostel-card-meta">
                      {renderStars(rating)}
                      <span className={`gender ${gender}`}>
                        {gender.charAt(0).toUpperCase() + gender.slice(1)}
                      </span>
                    </div>
                    <p style={{ color: '#c5c5c5', marginBottom: '0.4rem' }}>📍 {hostel.location}</p>
                    <p style={{ color: '#c5c5c5', marginBottom: '0.6rem' }}>🛏️ {hostel.roomType}</p>
                    <div className="amenities">
                      {(hostel.amenities || []).map((amenity, idx) => (
                        <span key={idx}>{amenity}</span>
                      ))}
                    </div>
                    <p style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--accent)', marginTop: '0.8rem' }}>
                      ₹{hostel.price}
                      <span style={{ fontSize: '0.85rem', fontWeight: '400', color: '#999' }}>/month</span>
                    </p>
                    <Link to={`/hostel/${hostel.folderName}`} className="view-button">
                      View Details →
                    </Link>
                  </div>
                </SpotlightCard>
              );
            })
          )}
        </section>

        <footer style={{ textAlign: 'center', padding: '3rem 0 2rem', marginTop: '4rem', borderTop: '1px solid rgba(255, 215, 0, 0.1)', color: '#999' }}>
          <Link to="/" style={{ color: 'var(--primary-gold)', textDecoration: 'none', fontWeight: '600' }}>← Back to Home</Link>
          <br /><br />
          © 2025 Koodaram
        </footer>
      </main>
    </div>
  );
}

export default Browse;
