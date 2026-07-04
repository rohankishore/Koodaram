import React from "react";
import { Link } from "react-router-dom";
import Dither from "../component/Dither";
import "./Datasheet.css";

const Datasheet = () => (
  <>
    <div className="page-dither" style={{ minHeight: '100vh', width: '100vw', position: 'fixed', top: 0, left: 0, zIndex: 0, filter: 'blur(10px) saturate(1.2)' }}>
      <Dither />
    </div>

    <div style={{ position: 'relative', zIndex: 10, padding: '2rem 1rem' }}>
      <div className="datasheet-container">
        <h1>SUMMARY STATISTICS 📊</h1>
        
        <div className="datasheet-summary">
          <ul>
            <li><strong>Total Hostels:</strong> 127</li>
            <li><strong>Total Colleges:</strong> 9</li>
            <li><strong>Male Hostels:</strong> 66</li>
            <li><strong>Female Hostels:</strong> 60</li>
            <li><strong>Gender Distribution:</strong> 66 M (51%) | 60 F (47%)</li>
          </ul>
        </div>

        <h2>Hostel Count by College and Gender</h2>
        <div className="datasheet-table-wrapper">
          <table className="datasheet-table">
            <thead>
              <tr>
                <th>College</th>
                <th>Male</th>
                <th>Female</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>CUCEK</td><td>25</td><td>17</td><td>42</td></tr>
              <tr><td>CUSAT</td><td>7</td><td>5</td><td>12</td></tr>
              <tr><td>College of Engineering Trivandrum</td><td>13</td><td>9</td><td>22</td></tr>
              <tr><td>GEC Kozhikode</td><td>0</td><td>0</td><td>1</td></tr>
              <tr><td>GEC Palakkad</td><td>0</td><td>7</td><td>7</td></tr>
              <tr><td>GEC Thrissur</td><td>9</td><td>8</td><td>17</td></tr>
              <tr><td>NSS College Palakkad</td><td>1</td><td>1</td><td>2</td></tr>
              <tr><td>RIT Kottayam</td><td>3</td><td>2</td><td>5</td></tr>
              <tr><td>SCT Trivandrum</td><td>9</td><td>11</td><td>20</td></tr>
              <tr className="datasheet-total"><td><strong>TOTAL</strong></td><td><strong>66</strong></td><td><strong>60</strong></td><td><strong>127</strong></td></tr>
            </tbody>
          </table>
        </div>
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

export default Datasheet;
