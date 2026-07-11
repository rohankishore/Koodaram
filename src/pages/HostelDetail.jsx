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
  IoSparkles 
} from 'react-icons/io5';
import './HostelDetail.css';

const GITHUB_USER = "Koodaram-Inc";
const REPO = "koodaram-data";
const RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_USER}/${REPO}/main/hostels`;

function HostelDetail() {
  const [hostel, setHostel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    loadHostelData();
  }, [id]);

  const getMapEmbedUrl = (gmapUrl) => {
    if (!gmapUrl) return null;
    
    try {
      // Extract coordinates from pb parameter
      const pbMatch = gmapUrl.match(/!2d([\d.]+)!3d([\d.]+)/);
      if (pbMatch) {
        const lng = pbMatch[1];
        const lat = pbMatch[2];
        return `https://maps.google.com/maps?q=${lat},${lng}&output=embed`;
      }
      
      // If pb extraction fails, return original URL as fallback
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
    return <div className="container"><p>Loading...</p></div>;
  }

  if (error) {
    return <div className="container"><p>⚠️ {error}</p></div>;
  }

  if (!hostel) {
    return <div className="container"><p>Hostel not found</p></div>;
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

  const imagesHTML = hostel.images && hostel.images.length > 0 
    ? hostel.images 
    : [];

  return (
    <div className="container" id="hostel-view">
      <h1>{hostel.name}</h1>
      <div className="info">
        <p className="detail-item"><IoLocationSharp className="detail-icon" /> <strong>Location:</strong> {hostel.location}</p>
        <p className="detail-item"><IoSchool className="detail-icon" /> <strong>College:</strong> {hostel.college}</p>
        <p className="detail-item"><IoBed className="detail-icon" /> <strong>Room Type:</strong> {hostel.roomType}</p>
        <p className="detail-item"><IoWallet className="detail-icon" /> <strong>Price:</strong> ₹{hostel.price}/month</p>
        {hostel.advance && (
          <p className="detail-item" style={{ color: '#999' }}><IoWallet className="detail-icon" style={{ opacity: 0.5 }} /> <strong>Advance:</strong> ₹{hostel.advance}</p>
        )}
        {resolvedPhone && (
          <p className="detail-item"><IoCall className="detail-icon" /> <strong>Contact:</strong> {resolvedPhone}</p>
        )}
        <p className="detail-item"><IoSparkles className="detail-icon" /> <strong>Amenities:</strong> {hostel.amenities?.join(", ")}</p>
        {hostel.curfew && (
          <p className="detail-item"><IoTime className="detail-icon" /> <strong>Curfew:</strong> {hostel.curfew}</p>
        )}
        {hostel.bathroom && (
          <p className="detail-item"><IoShieldCheckmark className="detail-icon" /> <strong>Bathroom:</strong> {hostel.bathroom}</p>
        )}
      </div>
      
      <div className="gallery">
        {imagesHTML.length > 0 ? (
          imagesHTML.map((img, idx) => (
            <a 
              key={idx}
              href={`${RAW_BASE}/${id}/${img}`} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <img 
                src={`${RAW_BASE}/${id}/${img}`} 
                alt={`${hostel.name} image ${idx + 1}`}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </a>
          ))
        ) : (
          <p>No images available for this hostel.</p>
        )}
      </div>

      <div className="contact-buttons">
        {resolvedPhone && (
          <a href={`tel:${phoneForTel}`} className="icon-btn-flex"><IoCall size={18} /> Call</a>
        )}
        {resolvedPhone && whatsappNumber && (
          <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="icon-btn-flex"><IoLogoWhatsapp size={18} /> WhatsApp</a>
        )}
        <button onClick={() => setShowQrModal(true)} className="qr-poster-trigger-btn icon-btn-flex">
          <IoQrCode size={18} /> Get QR Poster
        </button>
      </div>

      {hostel.gmap && (
        <div className="map-container">
          <iframe 
            src={getMapEmbedUrl(hostel.gmap)}
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      )}

      <footer className="hostel-footer">
        <p>
          © 2025 Koodaram.{' '}
          <Link to="/browse" id="backToListingsLink">← Back to Listings</Link>
        </p>
      </footer>

      {showQrModal && (
        <QrPosterModal hostel={hostel} onClose={() => setShowQrModal(false)} />
      )}
    </div>
  );
}

export default HostelDetail;
