import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Dither from "../component/Dither";
import "./Datasheet.css";

const GITHUB_USER = "Koodaram-Inc";
const REPO = "koodaram-data";
const API_BASE = `https://api.github.com/repos/${GITHUB_USER}/${REPO}/contents/hostels`;
const RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_USER}/${REPO}/main/hostels`;

const Datasheet = () => {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAllHostels = async () => {
      try {
        const res = await fetch(API_BASE);
        if (!res.ok) throw new Error("Failed to fetch hostels list");
        const folders = await res.json();

        const hostelPromises = folders.map(folder => {
          const jsonURL = `${RAW_BASE}/${folder.name}/data.json`;
          return fetch(jsonURL)
            .then(res => {
              if (!res.ok) return null;
              return res.json();
            })
            .then(data => {
              if (!data) return null;
              data.id = folder.name;
              data.folderName = folder.name;
              return data;
            })
            .catch(() => null);
        });

        const hostelsData = (await Promise.all(hostelPromises)).filter(Boolean);
        setHostels(hostelsData);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllHostels();
  }, []);

  // Compute stats
  const totalHostels = hostels.length;
  
  // Normalize and count gender
  let maleCount = 0;
  let femaleCount = 0;
  let unisexCount = 0;

  // College-wise map: { collegeName: { male: 0, female: 0, unisex: 0, total: 0 } }
  const collegeStatsMap = {};

  hostels.forEach(h => {
    const gender = h.gender?.toLowerCase() || 'unisex';
    if (gender === 'male' || gender === 'boys') {
      maleCount++;
    } else if (gender === 'female' || gender === 'girls') {
      femaleCount++;
    } else {
      unisexCount++;
    }

    // Clean college name (trim, uppercase or standard casing)
    let college = (h.college || 'Other').trim();
    
    // Quick standardizations
    const upperCol = college.toUpperCase();
    if (upperCol.includes('CUCEK')) college = 'CUCEK';
    else if (upperCol.includes('CUSAT')) college = 'CUSAT';
    else if (upperCol.includes('TRIVANDRUM') && (upperCol.includes('CET') || upperCol.includes('ENGINEERING'))) college = 'College of Engineering Trivandrum';
    else if (upperCol.includes('UCEK') || upperCol.includes('KARIAVATTOM')) college = 'UCEK';
    else if (upperCol.includes('SCT')) college = 'SCT Trivandrum';
    else if (upperCol.includes('RIT') || upperCol.includes('KOTTAYAM')) college = 'RIT Kottayam';
    else if (upperCol.includes('THRISSUR') && upperCol.includes('GEC')) college = 'GEC Thrissur';
    else if (upperCol.includes('PALAKKAD') && upperCol.includes('GEC')) college = 'GEC Palakkad';
    else if (upperCol.includes('KOZHIKODE') && upperCol.includes('GEC')) college = 'GEC Thrissur'; // Quick grouping
    else if (upperCol.includes('NSS')) college = 'NSS College Palakkad';

    if (!collegeStatsMap[college]) {
      collegeStatsMap[college] = { male: 0, female: 0, unisex: 0, total: 0 };
    }

    collegeStatsMap[college].total++;
    if (gender === 'male' || gender === 'boys') {
      collegeStatsMap[college].male++;
    } else if (gender === 'female' || gender === 'girls') {
      collegeStatsMap[college].female++;
    } else {
      collegeStatsMap[college].unisex++;
    }
  });

  const collegesList = Object.keys(collegeStatsMap).sort((a, b) => a.localeCompare(b));
  const totalColleges = collegesList.filter(c => c !== 'Other').length;

  const malePercent = totalHostels ? Math.round((maleCount / totalHostels) * 100) : 0;
  const femalePercent = totalHostels ? Math.round((femaleCount / totalHostels) * 100) : 0;
  const unisexPercent = totalHostels ? Math.round((unisexCount / totalHostels) * 100) : 0;

  // Filtered colleges list based on search
  const filteredColleges = collegesList.filter(col => 
    col.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="page-dither" style={{ minHeight: '100vh', width: '100vw', position: 'fixed', top: 0, left: 0, zIndex: 0, filter: 'blur(10px) saturate(1.2)' }}>
        <Dither />
      </div>

      <div style={{ position: 'relative', zIndex: 10, padding: '2rem 1rem' }}>
        <div className="datasheet-container">
          <div className="datasheet-header-row">
            <Link to="/" className="datasheet-back-btn">← Back to Home</Link>
            <h1>SUMMARY STATISTICS</h1>
            <div style={{ width: '60px' }}></div> {/* Spacer */}
          </div>
          
          {loading ? (
            <div className="datasheet-loader-container">
              <div className="datasheet-spinner"></div>
              <p>Fetching dynamic live data from GitHub...</p>
            </div>
          ) : error ? (
            <div className="datasheet-error-container">
              <p>⚠️ Error loading datasheet: {error}</p>
              <button onClick={() => window.location.reload()} className="datasheet-retry-btn">Retry</button>
            </div>
          ) : (
            <>
              <div className="datasheet-summary">
                <ul>
                  <li><strong>Total Hostels:</strong> {totalHostels}</li>
                  <li><strong>Total Colleges:</strong> {totalColleges}</li>
                  <li><strong>Male Hostels:</strong> {maleCount} ({malePercent}%)</li>
                  <li><strong>Female Hostels:</strong> {femaleCount} ({femalePercent}%)</li>
                  {unisexCount > 0 && <li><strong>Unisex Hostels:</strong> {unisexCount} ({unisexPercent}%)</li>}
                </ul>

                {/* Progress bar visual */}
                <div className="datasheet-progress-container">
                  <div className="datasheet-progress-bar male" style={{ width: `${malePercent}%` }} title={`Male: ${malePercent}%`}></div>
                  <div className="datasheet-progress-bar female" style={{ width: `${femalePercent}%` }} title={`Female: ${femalePercent}%`}></div>
                  {unisexCount > 0 && <div className="datasheet-progress-bar unisex" style={{ width: `${unisexPercent}%` }} title={`Unisex: ${unisexPercent}%`}></div>}
                </div>
                <div className="datasheet-progress-legend">
                  <span className="legend-item"><span className="legend-dot male"></span> Male ({malePercent}%)</span>
                  <span className="legend-item"><span className="legend-dot female"></span> Female ({femalePercent}%)</span>
                  {unisexCount > 0 && <span className="legend-item"><span className="legend-dot unisex"></span> Unisex ({unisexPercent}%)</span>}
                </div>
              </div>

              <div className="datasheet-table-header">
                <h2>Hostel Count by College and Gender</h2>
                <input 
                  type="text" 
                  placeholder="Search college..." 
                  className="datasheet-search" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="datasheet-table-wrapper">
                <table className="datasheet-table">
                  <thead>
                    <tr>
                      <th>College</th>
                      <th>Male</th>
                      <th>Female</th>
                      {unisexCount > 0 && <th>Unisex</th>}
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredColleges.length === 0 ? (
                      <tr>
                        <td colSpan={unisexCount > 0 ? 5 : 4} style={{ textAlign: 'center', color: '#888' }}>
                          No colleges found matching "{searchTerm}"
                        </td>
                      </tr>
                    ) : (
                      filteredColleges.map(col => {
                        const stats = collegeStatsMap[col];
                        return (
                          <tr key={col}>
                            <td><strong>{col}</strong></td>
                            <td>{stats.male}</td>
                            <td>{stats.female}</td>
                            {unisexCount > 0 && <td>{stats.unisex}</td>}
                            <td><strong>{stats.total}</strong></td>
                          </tr>
                        );
                      })
                    )}
                    <tr className="datasheet-total">
                      <td><strong>TOTAL</strong></td>
                      <td><strong>{maleCount}</strong></td>
                      <td><strong>{femaleCount}</strong></td>
                      {unisexCount > 0 && <td><strong>{unisexCount}</strong></td>}
                      <td><strong>{totalHostels}</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        {/* Global Styled Footer */}
        <section className="info-section" style={{
          marginTop: '4rem',
          padding: '3rem 1rem',
          textAlign: 'center',
          color: '#888',
          backdropFilter: 'blur(10px) saturate(1.2)'
        }}>
          <h2 style={{ fontFamily: 'Thomeo, sans-serif', fontSize: '4rem', margin: 0, color: '#fff' }}>KOODARAM</h2>
          <div style={{ margin: '1.5rem 0', color: '#ffd600' }}>
            <Link to="/" style={{color: '#ffd600'}}>Home</Link> | <Link to="/about" style={{color: '#ffd600'}}>About Us</Link> | <Link to="/browse" style={{color: '#ffd600'}}>Browse Hostels</Link> | <Link to="/list-hostel" style={{color: '#ffd600'}}>List Hostel</Link> | <Link to="/datasheet" style={{color: '#ffd600'}}>Datasheet</Link> | <Link to="/credits" style={{color: '#ffd600'}}>Credits</Link> | <Link to="/terms" style={{color: '#ffd600'}}>Terms</Link> | <Link to="/privacy" style={{color: '#ffd600'}}>Privacy</Link>
          </div>
          <div style={{ fontSize: '1rem', color: '#fff', marginBottom: '0.5rem' }}>Open Source Initiative</div>
          <div style={{ fontSize: '1rem', color: '#fff' }}>© 2026 Koodaram</div>
          <div style={{ fontSize: '1rem', color: '#fff', marginTop: '1.5rem' }}>
            Made with <span style={{color: 'red', fontSize: '1.2em', verticalAlign: 'middle'}}>♥</span> by <a href="https://github.com/rohankishore" target="_blank" rel="noopener noreferrer" style={{color: '#ffd600', textDecoration: 'underline'}}>Rohan Kishore</a>
          </div>
        </section>
      </div>
    </>
  );
};

export default Datasheet;
