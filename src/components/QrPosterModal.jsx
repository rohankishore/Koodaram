import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { IoClose, IoSchoolOutline, IoLocationOutline, IoWalletOutline } from 'react-icons/io5';
import logoImg from '../../assets/logo.png';
import './QrPosterModal.css';

const PRESET_COLORS = [
  { name: 'Koodaram Gold', hex: '#ffd600' },
  { name: 'Coral Pink', hex: '#e94560' },
  { name: 'Emerald Green', hex: '#4ade80' },
  { name: 'Neon Purple', hex: '#a855f7' },
  { name: 'Sky Blue', hex: '#3b82f6' }
];

const FONTS = {
  modern: { id: 'modern', name: 'Modern Sans', family: '"Outfit", "Inter", sans-serif' },
  brand_display: { id: 'brand_display', name: 'Brand Heavy (Thomeo)', family: '"Thomeo", "Inter", sans-serif' },
  brand_hand: { id: 'brand_hand', name: 'Brand Script (BrotherHoops)', family: '"BrotherHoops", cursive' },
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
  const [accentColor, setAccentColor] = useState('#ffd600');
  const [selectedFont, setSelectedFont] = useState('brand_display');
  const [borderStyle, setBorderStyle] = useState('neon');
  
  // Custom detail toggles
  const [showCollege, setShowCollege] = useState(true);
  const [showLocation, setShowLocation] = useState(true);
  const [showPrice, setShowPrice] = useState(true);
  const [showAmenities, setShowAmenities] = useState(true);

  const [downloading, setDownloading] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState('');
  const previewRef = useRef(null);

  const hostelUrl = `${window.location.origin}/hostel/${hostel.id || hostel.folderName || hostel.name.toLowerCase().replace(/\s+/g, '-')}`;

  useEffect(() => {
    const generateLocalQR = async () => {
      try {
        const url = await QRCode.toDataURL(hostelUrl, {
          errorCorrectionLevel: 'H',
          margin: 1,
          width: 500,
          color: {
            dark: selectedTheme === 'minimal_light' && accentColor === '#ffffff' ? '#000000' : accentColor,
            light: selectedTheme === 'minimal_light' ? '#ffffff' : '#0f0f16'
          }
        });
        setQrDataUrl(url);
      } catch (err) {
        console.error('Failed to generate QR:', err);
      }
    };
    generateLocalQR();
  }, [hostelUrl, accentColor, selectedTheme]);

  const theme = THEMES[selectedTheme];
  const font = FONTS[selectedFont];

  const handleDownload = async () => {
    setDownloading(true);
    try {
      // Pre-load Koodaram logo image
      const logo = new Image();
      logo.src = logoImg;
      await new Promise((resolve) => {
        logo.onload = resolve;
        logo.onerror = resolve;
      });

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
      const headerText = 'KOODARAM';
      ctx.font = `bold 82px ${font.family}`;
      const textWidth = ctx.measureText(headerText).width;
      
      if (logo.complete && logo.naturalWidth > 0) {
        const logoHeaderSize = 90;
        const totalHeaderWidth = logoHeaderSize + 25 + textWidth;
        const startX = (canvas.width - totalHeaderWidth) / 2;
        
        ctx.textAlign = 'left';
        // Draw logo
        ctx.drawImage(logo, startX, 115, logoHeaderSize, logoHeaderSize);
        // Draw text
        ctx.fillStyle = theme.textColor;
        ctx.fillText(headerText, startX + logoHeaderSize + 25, 190);
      } else {
        ctx.textAlign = 'center';
        ctx.fillStyle = theme.textColor;
        ctx.fillText(headerText, canvas.width / 2, 195);
      }

      ctx.textAlign = 'center';
      ctx.font = `36px ${font.family}`;
      ctx.fillStyle = theme.subColor;
      ctx.fillText("Kerala's Open Hostel Finder", canvas.width / 2, 260);

      // Draw Promo Badge
      const badgeY = 320;
      ctx.fillStyle = selectedTheme === 'vibrant_dark' ? 'rgba(255, 214, 0, 0.05)' : 'rgba(255, 214, 0, 0.1)';
      ctx.strokeStyle = '#ffd600';
      ctx.lineWidth = 2;
      const bText = "ZERO BROKERAGE • DIRECT TO OWNERS";
      ctx.font = `bold 28px ${FONTS.modern.family}`;
      const bTextWidth = ctx.measureText(bText).width;
      const bPaddingX = 40;
      const bPaddingY = 16;
      
      // Rounded rect for badge
      ctx.beginPath();
      ctx.roundRect((canvas.width - bTextWidth - bPaddingX * 2) / 2, badgeY - bPaddingY, bTextWidth + bPaddingX * 2, bPaddingY * 2 + 10, 20);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#ffd600';
      ctx.fillText(bText, canvas.width / 2, badgeY + 14);

      // 4. Draw Divider
      ctx.strokeStyle = selectedTheme === 'vibrant_dark' ? '#ffffff10' : '#00000010';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(150, 390);
      ctx.lineTo(canvas.width - 150, 390);
      ctx.stroke();

      // 5. Draw Headline
      ctx.fillStyle = accentColor;
      ctx.font = `bold 76px ${font.family}`;
      
      // Wrap headline text
      const words = headline.split(' ');
      let line = '';
      let y = 490;
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
      if (showCollege && hostel.college) detailsToDraw.push({ label: 'College', value: hostel.college });
      if (showLocation && hostel.location) detailsToDraw.push({ label: 'Address', value: hostel.location });
      if (showPrice && hostel.price) detailsToDraw.push({ label: 'Rent', value: `₹${hostel.price}/month` + (hostel.advance ? ` (Adv: ₹${hostel.advance})` : '') });
      if (showAmenities && hostel.amenities?.length) detailsToDraw.push({ label: 'Amenities', value: hostel.amenities.slice(0, 4) });

      const boxY = y + 80;
      const boxHeight = detailsToDraw.length > 0 ? 140 + detailsToDraw.length * 85 : 0;
      const boxWidth = canvas.width - 300;
      const boxX = (canvas.width - boxWidth) / 2;

      if (detailsToDraw.length > 0) {
        ctx.fillStyle = theme.boxBg;
        ctx.strokeStyle = theme.boxBorder;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 16);
        ctx.fill();
        ctx.stroke();

        // Draw hostel name
        ctx.textAlign = 'left';
        ctx.fillStyle = theme.textColor;
        ctx.font = `bold 58px ${font.family}`;
        ctx.fillText(hostel.name, boxX + 60, boxY + 90);

        detailsToDraw.forEach((item, index) => {
          const itemY = boxY + 180 + index * 85;
          const iconX = boxX + 75;
          
          ctx.font = `38px ${font.family}`;

          if (item.label === 'College') {
            // Draw graduation cap icon
            ctx.save();
            ctx.fillStyle = '#ffd600';
            ctx.strokeStyle = '#ffd600';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(iconX, itemY - 15);
            ctx.lineTo(iconX + 16, itemY - 25);
            ctx.lineTo(iconX + 32, itemY - 15);
            ctx.lineTo(iconX + 16, itemY - 5);
            ctx.closePath();
            ctx.fill();
            ctx.beginPath();
            ctx.arc(iconX + 16, itemY - 8, 8, 0, Math.PI);
            ctx.stroke();
            ctx.restore();
            
            ctx.fillStyle = theme.textColor;
            ctx.fillText(item.value || 'N/A', iconX + 60, itemY - 5);
          } 
          else if (item.label === 'Address') {
            // Draw location pin
            ctx.save();
            ctx.fillStyle = '#ffd600';
            ctx.strokeStyle = '#ffd600';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(iconX + 16, itemY - 18, 10, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(iconX + 6, itemY - 14);
            ctx.lineTo(iconX + 16, itemY - 2);
            ctx.lineTo(iconX + 26, itemY - 14);
            ctx.stroke();
            ctx.restore();
            
            ctx.fillStyle = theme.textColor;
            ctx.fillText(item.value || 'N/A', iconX + 60, itemY - 5);
          } 
          else if (item.label === 'Rent') {
            // Draw Wallet
            ctx.save();
            ctx.fillStyle = '#ffd600';
            ctx.beginPath();
            ctx.roundRect(iconX, itemY - 25, 32, 24, 4);
            ctx.fill();
            ctx.fillStyle = selectedTheme === 'minimal_light' ? '#ffffff' : '#0f0f16';
            ctx.fillRect(iconX + 22, itemY - 20, 8, 8);
            ctx.restore();
            
            ctx.fillStyle = theme.textColor;
            ctx.fillText(item.value || 'N/A', iconX + 60, itemY - 5);
          } 
          else if (item.label === 'Amenities') {
            // Draw amenities badges
            let badgeX = iconX;
            ctx.font = `bold 28px ${FONTS.modern.family}`;
            item.value.forEach(am => {
              const amText = am.trim();
              const amWidth = ctx.measureText(amText).width;
              const padX = 20;
              
              ctx.fillStyle = selectedTheme === 'vibrant_dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)';
              ctx.strokeStyle = selectedTheme === 'vibrant_dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)';
              ctx.lineWidth = 2;
              
              ctx.beginPath();
              ctx.roundRect(badgeX, itemY - 32, amWidth + padX * 2, 44, 8);
              ctx.fill();
              ctx.stroke();
              
              ctx.fillStyle = theme.textColor;
              ctx.fillText(amText, badgeX + padX, itemY - 1);
              
              badgeX += amWidth + padX * 2 + 15;
            });
          }
        });
      }

      // 7. Load and Draw QR Code
      const qrImg = new Image();
      await new Promise((resolve, reject) => {
        qrImg.onload = resolve;
        qrImg.onerror = reject;
        qrImg.src = qrDataUrl;
      });

      const qrSize = 500;
      const qrX = (canvas.width - qrSize) / 2;
      const qrY = boxY + boxHeight + (detailsToDraw.length > 0 ? 90 : 120);

      // Draw QR border
      ctx.fillStyle = selectedTheme === 'minimal_light' ? '#ffffff' : '#0f0f16';
      ctx.fillRect(qrX - 20, qrY - 20, qrSize + 40, qrSize + 40);
      ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);

      // Draw custom logo in center of QR Code
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
      ctx.fillText('koodaram.vercel.app', canvas.width / 2, canvas.height - 120);

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
                <div className="brand-logo-container">
                  <img src={logoImg} alt="Koodaram Logo" className="brand-logo-img" />
                  <span className="brand-logo">KOODARAM</span>
                </div>
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
                      {showCollege && hostel.college && (
                        <div className="preview-detail-row">
                          <IoSchoolOutline size={18} className="preview-row-icon" />
                          <span>{hostel.college}</span>
                        </div>
                      )}
                      {showLocation && hostel.location && (
                        <div className="preview-detail-row">
                          <IoLocationOutline size={18} className="preview-row-icon" />
                          <span className="preview-address">{hostel.location}</span>
                        </div>
                      )}
                      {showPrice && hostel.price && (
                        <div className="preview-detail-row">
                          <IoWalletOutline size={18} className="preview-row-icon" />
                          <span>₹{hostel.price}/month {hostel.advance ? `(Adv: ₹${hostel.advance})` : ''}</span>
                        </div>
                      )}
                      {showAmenities && hostel.amenities?.length > 0 && (
                        <div className="preview-amenities-container">
                          {hostel.amenities.slice(0, 4).map((am, idx) => (
                            <span key={idx} className="preview-amenity-pill" style={{ 
                              borderColor: theme.boxBorder,
                              backgroundColor: selectedTheme === 'vibrant_dark' ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.02)'
                            }}>
                              {am}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="preview-qr-wrapper" style={{ backgroundColor: selectedTheme === 'minimal_light' ? '#ffffff' : '#0f0f16' }}>
                  <img src={qrDataUrl} alt="Hostel QR Code" className="preview-qr-img" />
                  <div className="qr-overlay-logo-container">
                    <img src={logoImg} alt="Koodaram" className="qr-overlay-logo" />
                  </div>
                </div>

                <p className="preview-cta" style={{ color: theme.subColor }}>
                  {subHeadline || 'Scan to view details, reviews, and verify info'}
                </p>
              </div>

              <div className="preview-footer" style={{ color: accentColor }}>
                koodaram.vercel.app
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QrPosterModal;
