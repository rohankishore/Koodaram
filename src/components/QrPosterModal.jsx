import React, { useState, useRef } from 'react';
import { IoClose } from 'react-icons/io5';
import logoImg from '../../assets/logo.png';
import './QrPosterModal.css';

const PRESET_COLORS = [
  { name: 'Koodaram Red', hex: '#e94560' },
  { name: 'CET Gold', hex: '#ffbf00' },
  { name: 'CUSAT Blue', hex: '#0f3460' },
  { name: 'Emerald', hex: '#10b981' },
  { name: 'Classic Black', hex: '#000000' },
  { name: 'Neon Purple', hex: '#a855f7' }
];

const FONTS = {
  modern: { id: 'modern', name: 'Modern Sans', family: '"Outfit", "Inter", sans-serif' },
  classic: { id: 'classic', name: 'Classic Serif', family: '"Georgia", "Times", serif' },
  technical: { id: 'technical', name: 'Technical Mono', family: '"Courier New", Monaco, monospace' }
};

const BORDERS = {
  neon: { id: 'neon', name: 'Double Glow' },
  solid: { id: 'solid', name: 'Minimalist Solid' },
  dashed: { id: 'dashed', name: 'Retro Dashed' },
  none: { id: 'none', name: 'Border-free' }
};

const THEMES = {
  vibrant_dark: {
    id: 'vibrant_dark',
    name: 'Vibrant Dark',
    bgColor: '#0f0f16',
    textColor: '#ffffff',
    subColor: '#a1a1aa',
    boxBg: '#ffffff05',
    boxBorder: '#ffffff10'
  },
  minimal_light: {
    id: 'minimal_light',
    name: 'Minimal Light',
    bgColor: '#ffffff',
    textColor: '#000000',
    subColor: '#4b5563',
    boxBg: '#f9fafb',
    boxBorder: '#e5e7eb'
  }
};

function QrPosterModal({ hostel, onClose }) {
  const [selectedTheme, setSelectedTheme] = useState('vibrant_dark');
  const [headline, setHeadline] = useState('Find Us on Koodaram');
  const [subHeadline, setSubHeadline] = useState('Scan to view details, reviews, and verify info');
  const [accentColor, setAccentColor] = useState('#e94560');
  const [selectedFont, setSelectedFont] = useState('modern');
  const [borderStyle, setBorderStyle] = useState('neon');
  
  // Custom detail toggles
  const [showCollege, setShowCollege] = useState(true);
  const [showLocation, setShowLocation] = useState(true);
  const [showPrice, setShowPrice] = useState(true);
  const [showAmenities, setShowAmenities] = useState(true);

  const [downloading, setDownloading] = useState(false);
  const previewRef = useRef(null);

  const hostelUrl = `${window.location.origin}/hostel/${hostel.id || hostel.name.toLowerCase().replace(/\s+/g, '-')}`;
  
  // High error correction (ecc=H) allows us to put a logo in the center of the QR
  const qrColorClean = (selectedTheme === 'minimal_light' && accentColor === '#ffffff' ? '000000' : accentColor.replace('#', ''));
  const qrBgClean = (selectedTheme === 'minimal_light' ? 'ffffff' : '0f0f16');
  const qrCodeApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&ecc=H&data=${encodeURIComponent(hostelUrl)}&color=${qrColorClean}&bgcolor=${qrBgClean}`;

  const theme = THEMES[selectedTheme];
  const font = FONTS[selectedFont];

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1200;
      canvas.height = 1920;
      const ctx = canvas.getContext('2d');

      // 1. Draw Background
      if (selectedTheme === 'vibrant_dark') {
        const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        grad.addColorStop(0, '#0f0f16');
        grad.addColorStop(1, '#050508');
        ctx.fillStyle = grad;
      } else {
        ctx.fillStyle = '#ffffff';
      }
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Draw Borders / Decorative Lines
      ctx.lineWidth = 14;
      if (borderStyle === 'neon') {
        // Double Glow Border
        ctx.strokeStyle = accentColor;
        ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);
        ctx.lineWidth = 4;
        ctx.strokeStyle = selectedTheme === 'vibrant_dark' ? '#ffffff15' : '#00000010';
        ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120);
      } else if (borderStyle === 'solid') {
        ctx.strokeStyle = selectedTheme === 'vibrant_dark' ? '#ffffff' : '#000000';
        ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);
      } else if (borderStyle === 'dashed') {
        ctx.strokeStyle = accentColor;
        ctx.setLineDash([20, 20]);
        ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);
        ctx.setLineDash([]);
      }

      // 3. Draw Brand Header
      ctx.fillStyle = theme.textColor;
      ctx.textAlign = 'center';
      
      // Draw Koodaram logo / icon
      ctx.font = `bold 82px ${font.family}`;
      ctx.fillText('🏠 KOODARAM', canvas.width / 2, 200);

      ctx.font = `36px ${font.family}`;
      ctx.fillStyle = theme.subColor;
      ctx.fillText("Kerala's Open Hostel Finder", canvas.width / 2, 260);

      // 4. Draw Divider
      ctx.strokeStyle = selectedTheme === 'vibrant_dark' ? '#ffffff10' : '#00000010';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(150, 310);
      ctx.lineTo(canvas.width - 150, 310);
      ctx.stroke();

      // 5. Draw Headline
      ctx.fillStyle = accentColor;
      ctx.font = `bold 76px ${font.family}`;
      
      // Wrap headline text
      const words = headline.split(' ');
      let line = '';
      let y = 430;
      const lineHeight = 95;
      for (let n = 0; n < words.length; n++) {
        let testLine = line + words[n] + ' ';
        let metrics = ctx.measureText(testLine);
        let testWidth = metrics.width;
        if (testWidth > canvas.width - 200 && n > 0) {
          ctx.fillText(line, canvas.width / 2, y);
          line = words[n] + ' ';
          y += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, canvas.width / 2, y);

      // 6. Draw Hostel Details Box
      const detailsToDraw = [];
      if (showCollege) detailsToDraw.push({ label: 'College', value: hostel.college });
      if (showLocation) detailsToDraw.push({ label: 'Location', value: hostel.location });
      if (showPrice) detailsToDraw.push({ label: 'Price', value: `₹${hostel.price}/month` + (hostel.advance ? ` (Advance: ₹${hostel.advance})` : '') });
      if (showAmenities && hostel.amenities?.length) detailsToDraw.push({ label: 'Amenities', value: hostel.amenities.slice(0, 4).join(', ') });

      const boxY = y + 80;
      const boxHeight = detailsToDraw.length > 0 ? 120 + detailsToDraw.length * 80 : 0;
      const boxWidth = canvas.width - 300;
      const boxX = (canvas.width - boxWidth) / 2;

      if (detailsToDraw.length > 0) {
        ctx.fillStyle = theme.boxBg;
        ctx.strokeStyle = theme.boxBorder;
        ctx.lineWidth = 4;
        ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
        ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);

        // Draw details content
        ctx.textAlign = 'left';
        ctx.fillStyle = theme.textColor;
        ctx.font = `bold 54px ${font.family}`;
        ctx.fillText(hostel.name, boxX + 60, boxY + 80);

        ctx.font = `38px ${font.family}`;
        ctx.fillStyle = theme.subColor;
        detailsToDraw.forEach((item, index) => {
          ctx.fillText(`• ${item.label}: ${item.value || 'N/A'}`, boxX + 60, boxY + 160 + index * 75);
        });
      }

      // 7. Load and Draw QR Code
      const qrImg = new Image();
      qrImg.crossOrigin = 'anonymous';
      
      await new Promise((resolve, reject) => {
        qrImg.onload = resolve;
        qrImg.onerror = reject;
        qrImg.src = qrCodeApiUrl;
      });

      const qrSize = 500;
      const qrX = (canvas.width - qrSize) / 2;
      const qrY = boxY + boxHeight + (detailsToDraw.length > 0 ? 90 : 120);

      // Draw QR border
      ctx.fillStyle = selectedTheme === 'minimal_light' ? '#ffffff' : '#0f0f16';
      ctx.fillRect(qrX - 20, qrY - 20, qrSize + 40, qrSize + 40);
      ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);

      // Draw custom logo in center of QR Code
      const logo = new Image();
      logo.src = logoImg;
      await new Promise((resolve) => {
        logo.onload = resolve;
        logo.onerror = resolve; // Continue even if logo fails
      });

      if (logo.complete && logo.naturalWidth > 0) {
        const logoSize = qrSize * 0.18; // 18% of QR size
        const logoX = qrX + (qrSize - logoSize) / 2;
        const logoY = qrY + (qrSize - logoSize) / 2;
        const pad = 12; // White padding around logo

        // Draw white rounded base in center of QR code
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.roundRect(logoX - pad, logoY - pad, logoSize + pad * 2, logoSize + pad * 2, 12);
        ctx.fill();

        ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);
      }

      // 8. Draw Sub-headline
      ctx.textAlign = 'center';
      ctx.fillStyle = theme.subColor;
      ctx.font = `36px ${font.family}`;
      
      const subWords = subHeadline.split(' ');
      let subLine = '';
      let subY = qrY + qrSize + 110;
      const subLineHeight = 50;
      for (let n = 0; n < subWords.length; n++) {
        let testLine = subLine + subWords[n] + ' ';
        let metrics = ctx.measureText(testLine);
        let testWidth = metrics.width;
        if (testWidth > canvas.width - 200 && n > 0) {
          ctx.fillText(subLine, canvas.width / 2, subY);
          subLine = subWords[n] + ' ';
          subY += subLineHeight;
        } else {
          subLine = testLine;
        }
      }
      ctx.fillText(subLine, canvas.width / 2, subY);

      // 9. Draw Vercel/Website link
      ctx.fillStyle = accentColor;
      ctx.font = `bold 42px ${font.family}`;
      ctx.fillText('koodaram.in', canvas.width / 2, canvas.height - 120);

      // Trigger Download
      const link = document.createElement('a');
      link.download = `${hostel.name.toLowerCase().replace(/\s+/g, '-')}-koodaram-qr.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Error generating poster canvas:', err);
      alert('Failed to generate poster image. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="qr-modal-overlay" onClick={onClose}>
      <div className="qr-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="qr-close-btn" onClick={onClose} aria-label="Close modal">
          <IoClose size={24} />
        </button>

        <div className="qr-modal-content">
          {/* Settings / Controls */}
          <div className="qr-settings-panel">
            <h2>Customize QR Poster</h2>
            <p>Generate a high-quality printable poster to place at your hostel entrance or share on social media.</p>

            <div className="qr-control-group">
              <label>Select Poster Theme</label>
              <div className="qr-theme-options">
                {Object.values(THEMES).map((t) => (
                  <button
                    key={t.id}
                    className={`qr-theme-btn ${selectedTheme === t.id ? 'active' : ''}`}
                    onClick={() => setSelectedTheme(t.id)}
                    style={{
                      '--theme-color': accentColor,
                      borderColor: selectedTheme === t.id ? accentColor : 'transparent'
                    }}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="qr-control-group">
              <label>Accent Color</label>
              <div className="qr-color-options">
                {PRESET_COLORS.map((c) => (
                  <button
                    key={c.name}
                    className={`qr-color-btn ${accentColor === c.hex ? 'active' : ''}`}
                    style={{ backgroundColor: c.hex }}
                    onClick={() => setAccentColor(c.hex)}
                    title={c.name}
                  />
                ))}
                <input
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="qr-color-picker-input"
                  title="Custom color"
                />
              </div>
            </div>

            <div className="qr-control-group-grid">
              <div className="qr-control-group">
                <label htmlFor="font-family-select">Typography</label>
                <select
                  id="font-family-select"
                  value={selectedFont}
                  onChange={(e) => setSelectedFont(e.target.value)}
                  className="qr-select-control"
                >
                  {Object.values(FONTS).map(f => (
                    <option key={f.id} value={f.id}>{f.name}</option>
                  ))}
                </select>
              </div>

              <div className="qr-control-group">
                <label htmlFor="border-style-select">Border Frame</label>
                <select
                  id="border-style-select"
                  value={borderStyle}
                  onChange={(e) => setBorderStyle(e.target.value)}
                  className="qr-select-control"
                >
                  {Object.values(BORDERS).map(b => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="qr-control-group">
              <label>Poster Details to Include</label>
              <div className="qr-toggles-grid">
                <label className="qr-toggle-label">
                  <input type="checkbox" checked={showCollege} onChange={(e) => setShowCollege(e.target.checked)} />
                  Show College
                </label>
                <label className="qr-toggle-label">
                  <input type="checkbox" checked={showLocation} onChange={(e) => setShowLocation(e.target.checked)} />
                  Show Location
                </label>
                <label className="qr-toggle-label">
                  <input type="checkbox" checked={showPrice} onChange={(e) => setShowPrice(e.target.checked)} />
                  Show Price & Rent
                </label>
                <label className="qr-toggle-label">
                  <input type="checkbox" checked={showAmenities} onChange={(e) => setShowAmenities(e.target.checked)} />
                  Show Amenities
                </label>
              </div>
            </div>

            <div className="qr-control-group">
              <label htmlFor="poster-headline">Poster Headline</label>
              <input
                id="poster-headline"
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                maxLength={40}
                placeholder="Find Us on Koodaram"
              />
            </div>

            <div className="qr-control-group">
              <label htmlFor="poster-subheadline">Sub-Headline / Call to Action</label>
              <textarea
                id="poster-subheadline"
                rows={2}
                value={subHeadline}
                onChange={(e) => setSubHeadline(e.target.value)}
                maxLength={100}
                placeholder="Scan to view details, reviews, and verify info"
              />
            </div>

            <button 
              className="qr-download-btn" 
              onClick={handleDownload}
              disabled={downloading}
              style={{ backgroundColor: accentColor }}
            >
              {downloading ? 'Generating Poster...' : '📥 Download Poster (PNG)'}
            </button>
          </div>

          {/* Live Preview Panel */}
          <div className="qr-preview-panel">
            <label>Live Preview (9:16 Poster)</label>
            <div 
              ref={previewRef}
              className={`qr-poster-preview theme-${selectedTheme}`}
              style={{
                backgroundColor: theme.bgColor,
                color: theme.textColor,
                borderColor: borderStyle !== 'none' ? accentColor : 'transparent',
                borderStyle: borderStyle === 'dashed' ? 'dashed' : 'solid',
                borderWidth: borderStyle === 'none' ? '0' : '6px',
                fontFamily: font.family
              }}
            >
              <div className="preview-brand">
                <span className="brand-logo">🏠 KOODARAM</span>
                <span className="brand-sub" style={{ color: theme.subColor }}>Kerala's Open Hostel Finder</span>
              </div>

              <div className="preview-divider"></div>

              <div className="preview-content">
                <h3 className="preview-headline" style={{ color: accentColor }}>
                  {headline || 'Find Us on Koodaram'}
                </h3>

                {(showCollege || showLocation || showPrice || showAmenities) && (
                  <div className="preview-hostel-box" style={{ 
                    backgroundColor: theme.boxBg,
                    borderColor: theme.boxBorder
                  }}>
                    <h4 className="preview-hostel-name">{hostel.name}</h4>
                    <div className="preview-hostel-details" style={{ color: theme.subColor }}>
                      {showCollege && <p>🎓 {hostel.college || 'N/A'}</p>}
                      {showLocation && <p>📍 {hostel.location || 'N/A'}</p>}
                      {showPrice && <p>💰 ₹{hostel.price}/month {hostel.advance ? `(Adv: ₹${hostel.advance})` : ''}</p>}
                      {showAmenities && hostel.amenities?.length > 0 && <p>🛹 {hostel.amenities.slice(0, 4).join(', ')}</p>}
                    </div>
                  </div>
                )}

                <div className="preview-qr-wrapper" style={{ backgroundColor: selectedTheme === 'minimal_light' ? '#ffffff' : '#0f0f16' }}>
                  <img src={qrCodeApiUrl} alt="Hostel QR Code" className="preview-qr-img" />
                  <div className="qr-overlay-logo-container">
                    <img src={logoImg} alt="Koodaram" className="qr-overlay-logo" />
                  </div>
                </div>

                <p className="preview-cta" style={{ color: theme.subColor }}>
                  {subHeadline || 'Scan to view details, reviews, and verify info'}
                </p>
              </div>

              <div className="preview-footer" style={{ color: accentColor }}>
                koodaram.in
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QrPosterModal;
