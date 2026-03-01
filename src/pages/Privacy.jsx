import { Link } from 'react-router-dom';
import './Privacy.css';

function Privacy() {
  return (
    <div className="privacy-page">
      <div className="privacy-content">
        <h1>Privacy Policy 🕵️</h1>
        <p className="subtitle">Or: "The Page Where We Tell You We Don't Care About Your Data"</p>
        <p><strong>Last Updated: March 2026</strong></p>
        
        <div className="tldr-box">
          <h3>TL;DR</h3>
          <p>We don't track you. We don't sell your data. We don't even <em>want</em> your data. We're students, not a Silicon Valley startup trying to monetize your bathroom breaks.</p>
        </div>

        <h2>🤷 What Data Do We Collect?</h2>
        <p><strong>None. Nada. Zilch. Zero. പൂജ്യം.</strong></p>
        <p>Okay fine, technically your web browser might send us some info when you visit (like your IP address), but we don't store it, analyze it, or do anything creepy with it. It just... exists for a moment and then disappears into the digital void.</p>

        <h2>🍪 Cookies?</h2>
        <p>The only cookies we're interested in are the ones from the college canteen. We don't use tracking cookies, analytics cookies, or any other kind of digital cookies. Your browser is safe from our cookie monster.</p>
        <p>If you see cookies on this site, they're probably from your browser itself doing browser things. Take it up with Chrome/Firefox/Safari, not us.</p>

        <h2>📊 Analytics?</h2>
        <p>We use basic analytics (Vercel Analytics) to see how many people visit and which pages are popular. But here's the thing: <strong>it's completely anonymous</strong> and doesn't track you across sites or build a profile on you. It just tells us stuff like "127 people visited the homepage today" without telling us who those people are.</p>
        <p>No creepy ads will follow you around the internet because of us. Promise.</p>

        <h2>🔓 Why Should You Trust Us?</h2>
        <p>Because <strong>we're 100% open source!</strong> Every line of code is on <a href="https://github.com/Koodaram-Inc/koodaram-data" target="_blank" rel="noopener noreferrer">GitHub</a>. You can literally read our code and verify that we're not doing anything sketchy. If you find something sus, open an issue and roast us publicly.</p>
        <p>We're students building this for students. We hate data-hungry apps as much as you do.</p>

        <h2>💌 Do You Share Data With Third Parties?</h2>
        <p>You can't share what you don't have. 🧠</p>
        <p>We're not selling your data to advertisers, data brokers, or that one uncle who keeps asking about "business opportunities." The only third parties involved are:</p>
        <ul>
          <li><strong><a href="https://vercel.com/legal/privacy-policy">Vercel:</a></strong> Hosts our website (they're privacy-friendly)</li>
          <li><strong><a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">GitHub:</a></strong> Stores our code (also privacy-friendly)</li>
          <li><strong>Your ISP:</strong> (but that's beyond our control!)</li>
        </ul>

        <h2>📧 Emails & Contact Forms</h2>
        <p>If you email us or reach out via our socials, we'll obviously see that message. We might store it to respond to you. But we're not adding you to some marketing list or spam database. We're too lazy for email campaigns anyway.</p>

        <h2>🎯 Targeted Advertising?</h2>
        <p>LOL. We don't even have ads. We're a student project, not a for-profit company. The only thing we're targeting is... better hostel discovery for students.</p>

        <h2>🔐 How Do We Protect Your Data?</h2>
        <p>Again, we don't collect data to protect! But our site uses HTTPS, so your connection is encrypted. Your browser and our server have a secret handshake that nobody else can spy on.</p>

        <h2>👶 Children's Privacy</h2>
        <p>If you're under 18, cool, but also... aren't hostels usually for 18+ students? Anyway, we don't knowingly collect data from anyone, kids included. You're safe.</p>

        <h2>🌍 International Users</h2>
        <p>We're based in Kerala, India, but students from anywhere can use Koodaram. Since we don't collect personal data, we don't have to worry about GDPR, CCPA, or any other alphabet soup regulations. Isn't that nice?</p>

        <h2>🔄 Changes to This Policy</h2>
        <p>If our privacy practices change (plot twist: they won't), we'll update this page. But realistically, we're going to keep not collecting your data because... why would we start?</p>

        <h2>📞 Questions?</h2>
        <p>If you have questions about our privacy practices, feel free to reach out. We'll probably respond with "we don't track you" but in a slightly different wording.</p>

        <div className="final-note">
          <p><strong>🏕️ The Bottom Line:</strong></p>
          <p>Koodaram is built by students, for students. We're here to help you find hostels, not to monetize your digital footprint. Browse freely, click around, and rest assured that we're not building a profile on you.</p>
          <p>Stay private. Stay safe. Stay cool. 😎</p>
        </div>

        <footer className="privacy-footer">
          <p><Link to="/">← Back to Home</Link> | <Link to="/terms">Terms & Conditions</Link></p>
        </footer>
      </div>
    </div>
  );
}

export default Privacy;
