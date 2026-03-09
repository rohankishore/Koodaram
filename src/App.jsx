import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import CardNav from './component/CardNav';
import Home from './pages/Home';
import Browse from './pages/Browse';
import HostelDetail from './pages/HostelDetail';
import ListHostel from './pages/ListHostel';
import About from './pages/About';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Datasheet from './pages/Datasheet';
import Footer from './components/Footer';
import './App.css';

function App() {
  const navItems = [
    {
      label: 'Explore',
      bgColor: '#1a1a2e',
      textColor: '#fff',
      links: [
        { label: 'Browse Hostels', href: '/browse', ariaLabel: 'Browse hostels' },
        { label: 'List Your Hostel', href: '/list-hostel', ariaLabel: 'List your hostel' },
        { label: 'Datasheet', href: '/datasheet', ariaLabel: 'View hostel statistics' },
        { label: 'About', href: '/about', ariaLabel: 'About Koodaram' }
      ]
    },
    {
      label: 'Legal',
      bgColor: '#16213e',
      textColor: '#fff',
      links: [
        { label: 'Privacy Policy', href: '/privacy', ariaLabel: 'Privacy Policy' },
        { label: 'Terms & Conditions', href: '/terms', ariaLabel: 'Terms and Conditions' }
      ]
    },
    {
      label: 'Community',
      bgColor: '#0f3460',
      textColor: '#fff',
      links: [
        { label: 'GitHub', href: 'https://github.com/Koodaram-Inc/koodaram-data', ariaLabel: 'View on GitHub' },
        { label: 'Instagram', href: 'https://instagram.com/koodaram.app', ariaLabel: 'Instagram' },
        { label: 'Contact', href: '/about', ariaLabel: 'Contact and Support' },
      ]
    }
  ];

  return (
    <Router>
      <div className="app">
        <CardNav 
          logo="🏠"
          logoAlt="Koodaram Logo"
          items={navItems}
          baseColor="#1a1a1a"
          menuColor="#fff"
          buttonBgColor="#e94560"
          buttonTextColor="#fff"
          ctaLabel="List Hostel"
          ctaHref="/list-hostel"
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse/:slug?" element={<Browse />} />
          <Route path="/hostel/:id" element={<HostelDetail />} />
          <Route path="/list-hostel" element={<ListHostel />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        <Route path="/datasheet" element={<Datasheet />} />
        </Routes>
        <Analytics />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
