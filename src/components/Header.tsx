import { useState, useEffect } from 'react';
import './Header.css';

interface HeaderProps {
  onThemeToggle: () => void;
  isDarkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ onThemeToggle, isDarkMode }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'search', 'carousel', 'attractions', 'restaurants', 'info-table', 'video', 'contact'];
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { id: 'home', name: 'Acasă', href: '#home' },
    { id: 'carousel', name: 'Galerie', href: '#carousel' },
    { id: 'attractions', name: 'Atracții', href: '#attractions' },
    { id: 'restaurants', name: 'Restaurante', href: '#restaurants' },
    { id: 'info-table', name: 'Informații', href: '#info-table' },
    { id: 'contact', name: 'Contact', href: '#contact' }
  ];

  return (
    <header className={`header ${isVisible ? 'header-visible' : ''}`}>
      <div className="header-content">
        <h1 className="logo">
          <span className="logo-bold">Brașov</span> <span className="logo-light">CityGuide</span>
        </h1>

        <nav className="nav desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
            >
              {link.name}
              <span className="nav-underline" />
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <button 
            className="search-icon-button" 
            onClick={() => window.dispatchEvent(new CustomEvent('openSearch'))}
            aria-label="Deschide căutare"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m22 22-5.5-5.5"></path>
            </svg>
          </button>
          <button 
            className="theme-toggle" 
            onClick={onThemeToggle}
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>
          <button 
            className="mobile-menu-button"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <div className="hamburger">
              <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`} />
              <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`} />
              <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      <div className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-content">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`mobile-nav-link ${activeSection === link.id ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
