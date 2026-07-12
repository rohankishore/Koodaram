import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import QrPosterModal from '../components/QrPosterModal';
import { 
  IoCall, 
  IoLogoWhatsapp, 
  IoQrCode, 
  IoLocationSharp, 
  IoSchool, 
  IoBed, 
  IoWallet, 
  IoShieldCheckmark, 
  IoTime, 
  IoSparkles,
  IoAlertCircle,
  IoArrowBack,
  IoHeart,
  IoHeartOutline,
  IoWifi,
  IoRestaurant,
  IoCar,
  IoShirt,
  IoFlame,
  IoBook,
  IoFlash,
  IoVideocam
} from 'react-icons/io5';
import './HostelDetail.css';

const GITHUB_USER = "Koodaram-Inc";
const REPO = "koodaram-data";
const RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_USER}/${REPO}/main/hostels`;

const AMENITY_DETAILS = {
  wifi: {
    label: "WiFi",
    description: "High speed internet connectivity",
    icon: <IoWifi />
  },
  food: {
    label: "Food",
    description: "Homely meals provided (Breakfast, Lunch, Dinner)",
    icon: <IoRestaurant />
  },
  laundry: {
    label: "Laundry",
    description: "Washing machine or laundry services available",
    icon: <IoShirt />
  },
  parking: {
    label: "Parking",
    description: "Secure two wheeler & car parking space",
    icon: <IoCar />
  },
  hotwater: {
    label: "Hot Water",
    description: "24x7 hot water availability for bathing",
    icon: <IoFlame />
  },
  studyroom: {
    label: "Study Room",
    description: "Quiet and dedicated space for studying",
    icon: <IoBook />
  },
  cctv: {
    label: "CCTV",
    description: "24x7 surveillance cameras for security",
    icon: <IoVideocam />
  },
  powerbackup: {
    label: "Power Backup",
    description: "Inverter or generator backup power",
    icon: <IoFlash />
  },
  attachedbathroom: {
    label: "Attached Bathroom",
    description: "Private bathroom attached to the room",
    icon: <IoShieldCheckmark />
  }
};

const getAmenityDetail = (amenityStr) => {
  const norm = amenityStr.toLowerCase();
  if (norm.includes('wifi') || norm.includes('wi-fi')) {
    let desc = AMENITY_DETAILS.wifi.description;
    if (norm.includes('extra') || norm.includes('charge')) {
      desc = "WiFi available (additional charges apply)";
    }
    return { key: 'wifi', label: "WiFi", description: desc, icon: AMENITY_DETAILS.wifi.icon };
  }
  if (norm.includes('food') || norm.includes('mess') || norm.includes('lunch') || norm.includes('dinner') || norm.includes('meals') || norm.includes('homely')) {
    return { key: 'food', label: "Food", description: AMENITY_DETAILS.food.description, icon: AMENITY_DETAILS.food.icon };
  }
  if (norm.includes('laundry') || norm.includes('washing')) {
    return { key: 'laundry', label: "Laundry", description: AMENITY_DETAILS.laundry.description, icon: AMENITY_DETAILS.laundry.icon };
  }
  if (norm.includes('parking') || norm.includes('garage')) {
    return { key: 'parking', label: "Parking", description: AMENITY_DETAILS.parking.description, icon: AMENITY_DETAILS.parking.icon };
  }
  if (norm.includes('hot water') || norm.includes('geyser') || norm.includes('hotwater') || norm.includes('water heater')) {
    return { key: 'hotwater', label: "Hot Water", description: AMENITY_DETAILS.hotwater.description, icon: AMENITY_DETAILS.hotwater.icon };
  }
  if (norm.includes('study') || norm.includes('reading')) {
    return { key: 'studyroom', label: "Study Room", description: AMENITY_DETAILS.studyroom.description, icon: AMENITY_DETAILS.studyroom.icon };
  }
  if (norm.includes('cctv') || norm.includes('security') || norm.includes('camera')) {
    return { key: 'cctv', label: "CCTV", description: AMENITY_DETAILS.cctv.description, icon: AMENITY_DETAILS.cctv.icon };
  }
  if (norm.includes('power') || norm.includes('backup') || norm.includes('generator') || norm.includes('inverter')) {
    return { key: 'powerbackup', label: "Power Backup", description: AMENITY_DETAILS.powerbackup.description, icon: AMENITY_DETAILS.powerbackup.icon };
  }
  if (norm.includes('bathroom') || norm.includes('toilet') || norm.includes('attached')) {
    return { key: 'attachedbathroom', label: "Attached Bathroom", description: AMENITY_DETAILS.attachedbathroom.description, icon: AMENITY_DETAILS.attachedbathroom.icon };
  }
  
  // Fallback for custom amenities
  return {
    key: norm.replace(/\s+/g, ''),
    label: amenityStr,
    description: "Facility provided by the hostel",
    icon: <IoSparkles />
  };
};

function HostelDetail() {
  const [hostel, setHostel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    loadHostelData();
    if (id) {
      const favs = JSON.parse(localStorage.getItem('koodaram_favorites') || '{}');
      setIsFavorite(!!favs[id]);
    }
  }, [id]);

  const toggleFavorite = () => {
    if (!id) return;
    const favs = JSON.parse(localStorage.getItem('koodaram_favorites') || '{}');
    if (favs[id]) {
      delete favs[id];
      setIsFavorite(false);
    } else {
      favs[id] = true;
      setIsFavorite(true);
    }
    localStorage.setItem('koodaram_favorites', JSON.stringify(favs));
  };

  const getMapEmbedUrl = (gmapUrl) => {
    if (!gmapUrl) return null;
    
    try {
      const pbMatch = gmapUrl.match(/!2d([\d.]+)!3d([\d.]+)/);
      if (pbMatch) {
        const lng = pbMatch[1];
        const lat = pbMatch[2];
        return `https://maps.google.com/maps?q=${lat},${lng}&output=embed`;
      }
      return gmapUrl;
    } catch (e) {
      return gmapUrl;
    }
  };

  const loadHostelData = async () => {
    if (!id) {
      setError("Hostel not specified.");
      setLoading(false);
      return;
    }

    try {
      const dataRes = await fetch(`${RAW_BASE}/${id}/data.json`);
      if (!dataRes.ok) throw new Error('Failed to load hostel');
      const data = await dataRes.json();
      setHostel(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load hostel details. Please try again later.");
      setLoading(false);
      console.error("Error loading hostel:", err);
    }
  };

  if (loading) {
    return <div className="container hostel-detail-container"><p>Loading...</p></div>;
  }

  if (error) {
    return <div className="container hostel-detail-container"><p>⚠️ {error}</p></div>;
  }

  if (!hostel) {
    return <div className="container hostel-detail-container"><p>Hostel not found</p></div>;
  }

  const resolvedPhone = [
    hostel.contact?.phone,
    hostel.phone,
    hostel.contactPhone,
    hostel.contact_number,
    hostel.ownerPhone,
    hostel.owner?.phone,
  ].find((value) => typeof value === 'string' && value.trim().length > 0) || '';

  const phoneForTel = resolvedPhone.replace(/\s+/g, '');
  const whatsappNumber = (hostel.contact?.whatsapp || hostel.whatsapp || resolvedPhone).replace(/\D/g, '');

  const rating = parseFloat(hostel.rating) || 0;
  const imagesHTML = hostel.images && hostel.images.length > 0 
    ? hostel.images 
    : [];

  const name = hostel.name || "";
  const endsWithHostel = name.toLowerCase().endsWith("hostel");
  const displayNameBase = endsWithHostel ? name.slice(0, -6).trim() : name;
  const displayNameSuffix = endsWithHostel ? "Hostel" : "";

  const hasWiFi = hostel.amenities?.some(a => a.toLowerCase().includes('wifi') || a.toLowerCase().includes('wi-fi'));
  const hasLaundry = hostel.amenities?.some(a => a.toLowerCase().includes('laundry') || a.toLowerCase().includes('washing'));
  const includesText = [hasWiFi ? 'WiFi' : '', hasLaundry ? 'Laundry' : ''].filter(Boolean).join(' & ');

  return (
    <div className="container hostel-detail-container" id="hostel-view">
      
      {/* Main details and gallery grid layout */}
      <div className="hostel-main-layout">
        
        {/* Left Column: Information */}
        <div className="hostel-text-section">
          <Link to="/browse" className="back-to-search-btn">
            <IoArrowBack /> Back to search
          </Link>

          <h1 className="hostel-name-title">
            <span className="name-base">{displayNameBase}</span>
            {displayNameSuffix && <span className="name-suffix"> {displayNameSuffix}</span>}
          </h1>

          <div className="hostel-badge-row">
            {rating > 0 && (
              <span className="detail-badge rating-badge">
                ★ {rating.toFixed(1)}
              </span>
            )}
            {hostel.gender && (
              <span className="detail-badge gender-badge">
                {hostel.gender.toUpperCase()} ONLY
              </span>
            )}
            <span className="detail-badge verified-badge">
              <IoShieldCheckmark className="badge-check-icon" /> Student Verified
            </span>
          </div>

          <div className="hostel-specs-table">
            <div className="spec-row">
              <div className="spec-label">
                <IoLocationSharp className="spec-icon" /> Location
              </div>
              <div className="spec-value">
                {hostel.location}
                {hostel.gmap && (
                  <a href="#map-section" className="view-on-map-link">
                    View on Map <span className="arrow-icon">↗</span>
                  </a>
                )}
              </div>
            </div>

            {hostel.college && (
              <div className="spec-row">
                <div className="spec-label">
                  <IoSchool className="spec-icon" /> College
                </div>
                <div className="spec-value">{hostel.college}</div>
              </div>
            )}

            {hostel.roomType && (
              <div className="spec-row">
                <div className="spec-label">
                  <IoBed className="spec-icon" /> Room Type
                </div>
                <div className="spec-value">{hostel.roomType}</div>
              </div>
            )}

            <div className="spec-row">
              <div className="spec-label">
                <IoWallet className="spec-icon" /> Price
              </div>
              <div className="spec-value spec-value-price">
                <span className="price-text">₹{hostel.price} /month</span>
                {includesText && (
                  <span className="includes-badge">Includes {includesText}</span>
                )}
              </div>
            </div>

            {hostel.advance && (
              <div className="spec-row">
                <div className="spec-label">
                  <IoWallet className="spec-icon" style={{ opacity: 0.7 }} /> Advance
                </div>
                <div className="spec-value">₹{hostel.advance} (One-time)</div>
              </div>
            )}

            {resolvedPhone && (
              <div className="spec-row">
                <div className="spec-label">
                  <IoCall className="spec-icon" /> Contact
                </div>
                <div className="spec-value spec-value-contact">
                  <span className="phone-num">{resolvedPhone}</span>
                  <a href={`tel:${phoneForTel}`} className="inline-call-btn">
                    <IoCall size={12} /> Call
                  </a>
                </div>
              </div>
            )}

            {hostel.amenities && hostel.amenities.length > 0 && (
              <div className="spec-row">
                <div className="spec-label">
                  <IoSparkles className="spec-icon" /> Amenities
                </div>
                <div className="spec-value spec-value-amenities">
                  {hostel.amenities.slice(0, 5).map((a, idx) => (
                    <span key={idx} className="spec-amenity-pill">{a}</span>
                  ))}
                  {hostel.amenities.length > 5 && (
                    <span className="spec-amenity-pill-more">+{hostel.amenities.length - 5} more</span>
                  )}
                </div>
              </div>
            )}

            {hostel.curfew && (
              <div className="spec-row">
                <div className="spec-label">
                  <IoTime className="spec-icon" /> Curfew
                </div>
                <div className="spec-value">{hostel.curfew}</div>
              </div>
            )}

            {hostel.bathroom && (
              <div className="spec-row">
                <div className="spec-label">
                  <IoShieldCheckmark className="spec-icon" /> Bathroom
                </div>
                <div className="spec-value">{hostel.bathroom}</div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Gallery */}
        <div className="hostel-gallery-section">
          <div className="main-photo-wrapper">
            {imagesHTML.length > 0 ? (
              <>
                <img 
                  src={`${RAW_BASE}/${id}/${imagesHTML[activeImageIndex]}`} 
                  alt={`${hostel.name} active`}
                  className="active-photo"
                />
                <button 
                  className={`heart-fav-btn ${isFavorite ? 'fav-active' : ''}`}
                  onClick={toggleFavorite}
                  title={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
                >
                  {isFavorite ? (
                    <IoHeart size={20} className="heart-icon-svg filled" />
                  ) : (
                    <IoHeartOutline size={20} className="heart-icon-svg" />
                  )}
                </button>
              </>
            ) : (
              <div className="no-photo-box">
                <p>No images available</p>
              </div>
            )}
          </div>

          {imagesHTML.length > 1 && (
            <div className="photo-thumbs-row">
              {imagesHTML.map((img, idx) => (
                <button
                  key={idx}
                  className={`thumb-photo-btn ${idx === activeImageIndex ? 'active-thumb' : ''}`}
                  onClick={() => setActiveImageIndex(idx)}
                >
                  <img 
                    src={`${RAW_BASE}/${id}/${img}`} 
                    alt={`${hostel.name} thumbnail ${idx + 1}`}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Warning Banner for Low rating */}
      {rating > 0 && rating < 3 && (
        <div className="warning-banner">
          <IoAlertCircle className="warning-banner-icon" />
          <div className="warning-banner-text">
            <strong>Advisory: Low Student Rating</strong>
            <p>This hostel has received multiple critical student reports. Please exercise caution and conduct thorough checks before finalizing your admission. It'll be a good idea to ask your seniors about this hostel for added details.</p>
          </div>
        </div>
      )}

      {/* Amenities & Facilities details grid */}
      {hostel.amenities && hostel.amenities.length > 0 && (
        <div className="facilities-section">
          <h2>Amenities & Facilities</h2>
          <div className="facilities-grid">
            {hostel.amenities.map((amenityStr, idx) => {
              const detail = getAmenityDetail(amenityStr);
              return (
                <div key={idx} className="facility-card">
                  <div className="facility-icon-circle">
                    {detail.icon}
                  </div>
                  <div className="facility-card-text">
                    <h4>{detail.label}</h4>
                    <p>{detail.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Location Map Section */}
      {hostel.gmap && (
        <div className="map-container" id="map-section">
          <iframe 
            src={getMapEmbedUrl(hostel.gmap)}
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Hostel Location Map"
          ></iframe>
        </div>
      )}

      {/* Footer */}
      <footer className="hostel-footer">
        <p>
          © 2025 Koodaram.{' '}
          <Link to="/browse" id="backToListingsLink">← Back to Listings</Link>
        </p>
      </footer>

      {/* Sticky Action Bar */}
      <div className="sticky-actions-container">
        <div className="sticky-actions-bar">
          {resolvedPhone && (
            <a href={`tel:${phoneForTel}`} className="sticky-action-btn action-call">
              <IoCall /> Call Now
            </a>
          )}
          {resolvedPhone && whatsappNumber && (
            <a 
              href={`https://wa.me/${whatsappNumber}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="sticky-action-btn action-whatsapp"
            >
              <IoLogoWhatsapp /> WhatsApp
            </a>
          )}
          <button 
            onClick={() => setShowQrModal(true)} 
            className="sticky-action-btn action-qr"
          >
            <IoQrCode /> Get QR Poster
          </button>
        </div>
      </div>

      {showQrModal && (
        <QrPosterModal hostel={hostel} onClose={() => setShowQrModal(false)} />
      )}
    </div>
  );
}

export default HostelDetail;
