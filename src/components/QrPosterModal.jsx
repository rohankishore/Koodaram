import React, { useState, useEffect, useRef } from 'react';
import { IoClose } from 'react-icons/io5';
import './QrPosterModal.css';

const THEMES = {
  vibrant_dark: {
    id: 'vibrant_dark',
    name: 'Vibrant Dark',
    bgColor: '#0f0f16',
    textColor: '#ffffff',
    subColor: '#a1a1aa',
    accentColor: '#e94560',
    borderColor: '#e94560',
  },
  retro_dither: {
    id: 'retro_dither',
    name: 'Retro Dither',
    bgColor: '#f4f4f5',
    textColor: '#09090b',
    subColor: '#71717a',
    accentColor: '#18181b',
    borderColor: '#18181b',
  },
  minimal_light: {
    id: 'minimal_light',
    name: 'Minimal Light',
    bgColor: '#ffffff',
    textColor: '#000000',
    subColor: '#4b5563',
    accentColor: '#2563eb',
    borderColor: '#000000',
  }
};

function QrPosterModal({ hostel, onClose }) {
  const [selectedTheme, setSelectedTheme] = useState('vibrant_dark');
  const [headline, setHeadline] = useState('Find Us on Koodaram');
  const [subHeadline, setSubHeadline] = useState('Scan to view details, reviews, and verify info');
  const [downloading, setDownloading] = useState(false);
  const previewRef = useRef(null);

  const hostelUrl = `${window.location.origin}/hostel/${hostel.id || hostel.name.toLowerCase().replace(/\s+/g, '-')}`;
  const qrCodeApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(hostelUrl)}&color=${selectedTheme === 'minimal_light' ? '000000' : selectedTheme === 'retro_dither' ? '18181b' : 'ffffff'}&bgcolor=${selectedTheme === 'minimal_light' ? 'ffffff' : selectedTheme === 'retro_dither' ? 'f4f4f5' : '0f0f16'}`;

  const theme = THEMES[selectedTheme];

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const canvas = document.createElement('canvas');
      // 9:16 aspect ratio (High Resolution)
      canvas.width = 1200;
      canvas.height = 1920;
      const ctx = canvas.getContext('2d');

      // 1. Draw Background
      if (selectedTheme === 'vibrant_dark') {
        const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        grad.addColorStop(0, '#0f0f16');
        grad.addColorStop(1, '#050508');
        ctx.fillStyle = grad;
      } else if (selectedTheme === 'retro_dither') {
        ctx.fillStyle = '#f4f4f5';
      } else {
        ctx.fillStyle = '#ffffff';
      }
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Draw Borders / Decorative Lines
      ctx.lineWidth = 12;
      if (selectedTheme === 'vibrant_dark') {
        ctx.strokeStyle = '#e94560';
        ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#ffffff20';
        ctx.strokeRect(55, 55, canvas.width - 110, canvas.height - 110);
      } else if (selectedTheme === 'retro_dither') {
        ctx.strokeStyle = '#18181b';
        ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);
        // Inner dashed border
        ctx.setLineDash([15, 15]);
        ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120);
        ctx.setLineDash([]);
      } else {
        ctx.strokeStyle = '#000000';
        ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);
      }

      // 3. Draw Brand Header
      ctx.fillStyle = theme.textColor;
      ctx.textAlign = 'center';
      
      // Draw Koodaram logo / icon
      ctx.font = 'bold 80px "Outfit", "Inter", sans-serif';
      ctx.fillText('🏠 KOODARAM', canvas.width / 2, 200);

      ctx.font = '36px "Inter", sans-serif';
      ctx.fillStyle = theme.subColor;
      ctx.fillText("Kerala's Open Hostel Finder", canvas.width / 2, 260);

      // 4. Draw Divider
      ctx.strokeStyle = selectedTheme === 'vibrant_dark' ? '#ffffff10' : '#00000010';
      ctx.beginPath();
      ctx.moveTo(150, 310);
      ctx.lineTo(canvas.width - 150, 310);
      ctx.stroke();

      // 5. Draw Headline
      ctx.fillStyle = selectedTheme === 'vibrant_dark' ? '#e94560' : theme.textColor;
      ctx.font = 'bold 72px "Outfit", "Inter", sans-serif';
      
      // Wrap headline text
      const words = headline.split(' ');
      let line = '';
      let y = 420;
      const lineHeight = 90;
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
      const boxY = y + 100;
      const boxHeight = 440;
      const boxWidth = canvas.width - 300;
      const boxX = (canvas.width - boxWidth) / 2;

      // Draw Details Box Background
      if (selectedTheme === 'vibrant_dark') {
        ctx.fillStyle = '#ffffff05';
        ctx.strokeStyle = '#ffffff10';
      } else if (selectedTheme === 'retro_dither') {
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#18181b';
      } else {
        ctx.fillStyle = '#f9fafb';
        ctx.strokeStyle = '#e5e7eb';
      }
      ctx.lineWidth = 4;
      ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
      ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);

      // Draw details content
      ctx.textAlign = 'left';
      ctx.fillStyle = theme.textColor;
      ctx.font = 'bold 54px "Outfit", "Inter", sans-serif';
      ctx.fillText(hostel.name, boxX + 60, boxY + 100);

      ctx.fillStyle = theme.subColor;
      ctx.font = '38px "Inter", sans-serif';
      ctx.fillText(`🎓 College: ${hostel.college || 'N/A'}`, boxX + 60, boxY + 190);
      ctx.fillText(`📍 Location: ${hostel.location || 'N/A'}`, boxX + 60, boxY + 260);
      ctx.fillText(`💰 Price: ₹${hostel.price}/month`, boxX + 60, boxY + 330);
      
      const amenitiesText = hostel.amenities ? hostel.amenities.slice(0, 4).join(', ') : 'N/A';
      ctx.fillText(`🛹 Amenities: ${amenitiesText}`, boxX + 60, boxY + 400);

      // 7. Load and Draw QR Code
      const qrImg = new Image();
      qrImg.crossOrigin = 'anonymous';
      
      await new Promise((resolve, reject) => {
        qrImg.onload = resolve;
        qrImg.onerror = reject;
        qrImg.src = qrCodeApiUrl;
      });

      const qrSize = 480;
      const qrX = (canvas.width - qrSize) / 2;
      const qrY = boxY + boxHeight + 100;

      // Draw QR border
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(qrX - 20, qrY - 20, qrSize + 40, qrSize + 40);
      ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);

      // 8. Draw Sub-headline
      ctx.textAlign = 'center';
      ctx.fillStyle = theme.subColor;
      ctx.font = '36px "Inter", sans-serif';
      
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
      ctx.fillStyle = selectedTheme === 'vibrant_dark' ? '#e94560' : theme.textColor;
      ctx.font = 'bold 38px "Outfit", "Inter", sans-serif';
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
            <p>Generate a high-quality printable poster to place at your hostel entrance, notice board, or share on social media.</p>

            <div className="qr-control-group">
              <label>Select Poster Theme</label>
              <div className="qr-theme-options">
                {Object.values(THEMES).map((t) => (
                  <button
                    key={t.id}
                    className={`qr-theme-btn ${selectedTheme === t.id ? 'active' : ''}`}
                    onClick={() => setSelectedTheme(t.id)}
                    style={{
                      '--theme-color': t.borderColor,
                      borderColor: selectedTheme === t.id ? t.borderColor : 'transparent'
                    }}
                  >
                    {t.name}
                  </button>
                ))}
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
                borderColor: selectedTheme === 'vibrant_dark' ? '#e94560' : selectedTheme === 'retro_dither' ? '#18181b' : '#000000',
              }}
            >
              <div className="preview-brand">
                <span className="brand-logo">🏠 KOODARAM</span>
                <span className="brand-sub" style={{ color: theme.subColor }}>Kerala's Open Hostel Finder</span>
              </div>

              <div className="preview-divider"></div>

              <div className="preview-content">
                <h3 className="preview-headline" style={{ color: selectedTheme === 'vibrant_dark' ? '#e94560' : theme.textColor }}>
                  {headline || 'Find Us on Koodaram'}
                </h3>

                <div className="preview-hostel-box" style={{ 
                  backgroundColor: selectedTheme === 'vibrant_dark' ? '#ffffff05' : selectedTheme === 'retro_dither' ? '#ffffff' : '#f9fafb',
                  borderColor: selectedTheme === 'vibrant_dark' ? '#ffffff10' : selectedTheme === 'retro_dither' ? '#18181b' : '#e5e7eb'
                }}>
                  <h4 className="preview-hostel-name">{hostel.name}</h4>
                  <div className="preview-hostel-details" style={{ color: theme.subColor }}>
                    <p>🎓 {hostel.college || 'N/A'}</p>
                    <p>📍 {hostel.location || 'N/A'}</p>
                    <p>💰 ₹{hostel.price}/month</p>
                  </div>
                </div>

                <div className="preview-qr-wrapper">
                  <img src={qrCodeApiUrl} alt="Hostel QR Code" className="preview-qr-img" />
                </div>

                <p className="preview-cta" style={{ color: theme.subColor }}>
                  {subHeadline || 'Scan to view details, reviews, and verify info'}
                </p>
              </div>

              <div className="preview-footer" style={{ color: selectedTheme === 'vibrant_dark' ? '#e94560' : theme.textColor }}>
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
