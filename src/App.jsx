import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CardNav from './component/CardNav';
import Home from './pages/Home';
import Browse from './pages/Browse';
import HostelDetail from './pages/HostelDetail';
import ListHostel from './pages/ListHostel';
import About from './pages/About';
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
        { label: 'About Us', href: '/about', ariaLabel: 'About Koodaram' }
      ]
    },
    {
      label: 'Resources',
      bgColor: '#16213e',
      textColor: '#fff',
      links: [
        { label: 'GitHub', href: 'https://github.com/Koodaram-Inc/koodaram-data', ariaLabel: 'View on GitHub' },
        { label: 'Open Source Data', href: 'https://github.com/Koodaram-Inc/koodaram-data', ariaLabel: 'Access open source data' }
      ]
    },
    {
      label: 'Connect',
      bgColor: '#0f3460',
      textColor: '#fff',
      links: [
        { label: 'Home', href: '/', ariaLabel: 'Go to home page' },
        { label: 'Support', href: '/about', ariaLabel: 'Get support' }
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
          baseColor="#fff"
          menuColor="#000"
          buttonBgColor="#e94560"
          buttonTextColor="#fff"
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/hostel/:id" element={<HostelDetail />} />
          <Route path="/list-hostel" element={<ListHostel />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
