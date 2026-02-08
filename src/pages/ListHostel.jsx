import { Link } from 'react-router-dom';
import './ListHostel.css';

function ListHostel() {
  return (
    <div className="list-hostel-page">
      <header className="list-header">
        <h1>Add Your Hostel</h1>
        <p>Koodaram is Kerala's #1 Open Hostel Finder. Every listing is open source, transparent, and free forever — no accounts needed.</p>
      </header>

      <section className="content">
        <h2>What is Koodaram?</h2>
        <p>Koodaram is Kerala's first <strong>100% open-source hostel network</strong>, built for and by students. We believe hostel data should never be locked behind paywalls, login screens, or private companies.</p>

        <h2>How It Works</h2>
        <ul>
          <li>Students collect verified hostel details (rent, facilities, distance, reviews).</li>
          <li><strong>All listings are open-source</strong> and publicly viewable on{' '}
            <a href="https://github.com/Koodaram-Inc/koodaram-data" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>.
          </li>
          <li>No ads. No accounts. No hidden pricing. Just transparent info for everyone.</li>
        </ul>

        <h2>Want to Add Your Hostel?</h2>
        <p>Be part of the open-source movement. If your hostel isn't listed yet, you can add it right now — either through our upcoming form or by contacting us directly.</p>

        <a 
          href="https://wa.me/918089990317" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="discord-button"
        >
          💬 List Your Hostel on Koodaram
        </a>
      </section>

      <footer className="list-footer">
        © 2025 <strong>Koodaram</strong> — Kerala's #1 Open Hostel Finder. Open. Transparent. Student-driven.
        <br />
        <Link to="/">← Back to Home</Link> |{' '}
        <a href="https://github.com/Koodaram-Inc/koodaram-data" target="_blank" rel="noopener noreferrer">
          ⭐ View on GitHub
        </a>
      </footer>
    </div>
  );
}

export default ListHostel;
