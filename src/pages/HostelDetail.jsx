import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './HostelDetail.css';

const GITHUB_USER = "Koodaram-Inc";
const REPO = "koodaram-data";
const RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_USER}/${REPO}/main/hostels`;

function HostelDetail() {
  const [hostel, setHostel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    loadHostelData();
  }, [id]);

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

  const imagesHTML = hostel.images && hostel.images.length > 0 
    ? hostel.images 
    : [];

  return (
    <div className="container" id="hostel-view">
      <h1>{hostel.name}</h1>
      <div className="info">
        <p><strong>📍 Location:</strong> {hostel.location}</p>
        <p><strong>🎓 College:</strong> {hostel.college}</p>
        <p><strong>🛏️ Room Type:</strong> {hostel.roomType}</p>
        <p><strong>💰 Price:</strong> ₹{hostel.price}/month</p>
        <p><strong>🛹 Amenities:</strong> {hostel.amenities?.join(", ")}</p>
        {hostel.curfew && (
          <p><strong>Curfew:</strong> {hostel.curfew}</p>
        )}
        {hostel.bathroom && (
          <p><strong>Bathroom:</strong> {hostel.bathroom}</p>
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
        <a href={`tel:${hostel.contact?.phone}`}>📞 Call</a>
        <a href={`https://wa.me/91${hostel.contact?.phone}`}>💬 WhatsApp</a>
      </div>

      {hostel.gmap && (
        <div className="map-container">
          <iframe 
            src={hostel.gmap}
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
    </div>
  );
}

export default HostelDetail;
