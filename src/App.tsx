import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import logo from './assets/logo/nu_15_years_logo.png';

// Page components
const Home = React.lazy(() => import('./pages/Home'));
const AboutUs = React.lazy(() => import('./pages/AboutUs'));
const Schedule = React.lazy(() => import('./pages/Schedule'));
const Speakers = React.lazy(() => import('./pages/Speakers'));
const Location = React.lazy(() => import('./pages/Location'));
const Register = React.lazy(() => import('./pages/Register'));
const CallForPapers = React.lazy(() => import('./pages/CallForPapers'));

// Navigation component that uses location
function Navigation() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isNavVisible, setIsNavVisible] = React.useState(!isHomePage);

  // Navigation items
  const navItems = [
    { path: '/about', label: 'About' },
    { path: '/call-for-papers', label: 'Call for Papers' },
    // { path: '/schedule', label: 'Program' },
    // { path: '/speakers', label: 'Speakers' },
    { path: '/location', label: 'Venue' }
  ];

  // Toggle menu for mobile
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Effect to handle visibility based on page
  React.useEffect(() => {
    if (isHomePage) {
      setIsNavVisible(false);
      setIsMenuOpen(false);
    } else {
      setIsNavVisible(true);
      setIsMenuOpen(false);
    }
  }, [isHomePage]);

  // Mouse tracking and scroll detection for home page
  React.useEffect(() => {
    if (!isHomePage) return;

    const findAboutSection = () => {
      const h2Elements = document.querySelectorAll('h2');
      return Array.from(h2Elements).find(h2 => 
        h2.textContent?.includes('About the Conference')
      );
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Show navigation when mouse is in the top 100px of the screen
      if (e.clientY <= 100) {
        setIsNavVisible(true);
      } else if (e.clientY > 150) {
        // Hide navigation when mouse moves away from top area (with some buffer)
        // But only if we haven't scrolled past the "About the Conference" section
        const aboutSection = findAboutSection();
        if (aboutSection) {
          const aboutRect = aboutSection.getBoundingClientRect();
          const centerOfScreen = window.innerHeight / 2;
          
          // If "About the Conference" section is not yet in center, allow hiding
          if (aboutRect.top > centerOfScreen) {
            setIsNavVisible(false);
            setIsMenuOpen(false);
          }
        } else {
          setIsNavVisible(false);
          setIsMenuOpen(false);
        }
      }
    };

    const handleScroll = () => {
      // Find the "About the Conference" section
      const aboutSection = findAboutSection();
      
      // If user scrolls back to the very top, hide navigation
      if (window.scrollY === 0) {
        setIsNavVisible(false);
        return;
      }
      
      if (aboutSection) {
        const aboutRect = aboutSection.getBoundingClientRect();
        const centerOfScreen = window.innerHeight / 2;
        
        // Show navigation when "About the Conference" section is visible or has passed
        // This handles fast scrolling better than exact center positioning
        if (aboutRect.top <= centerOfScreen) {
          setIsNavVisible(true);
        }
      } else {
        // Fallback: show navigation after scrolling down 200px
        if (window.scrollY > 200) {
          setIsNavVisible(true);
        }
      }
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHomePage]);

  return (
    <>
      <nav className={`bg-white fixed w-full z-50 transition-transform duration-300 ${
        isHomePage && !isNavVisible ? '-translate-y-full' : 'translate-y-0'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-14">
            {/* Logo on the left */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center group transition-all duration-300 hover:scale-105">
                <div className="relative">
                  <img 
                    src={logo} 
                    alt="Nazarbayev University 15 Years Logo" 
                    className="h-12 w-auto drop-shadow-md transition-all duration-300 group-hover:drop-shadow-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </div>
                <div className="ml-4 flex flex-col">
                  <span className="text-xl font-bold text-primary transition-colors duration-300 group-hover:text-blue-600">
                    CAE Conference
                  </span>
                </div>
              </Link>
            </div>

            {/* Navigation items and register button on the right */}
            <div className="flex items-center">
              <div className="hidden sm:flex sm:space-x-8">
                {navItems.map((item, index) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="border-transparent text-gray-600 hover:text-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-200"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <a
                href="https://sessionize.com/caec/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex ml-8 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-accent hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-all duration-200"
              >
                Submit Paper
              </a>
              <div className="-mr-2 ml-4 flex items-center sm:hidden">
                <button
                  onClick={toggleMenu}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                >
                  <span className="sr-only">Open main menu</span>
                  {isMenuOpen ? (
                    <div className="block h-6 w-6">
                      <svg 
                        fill="currentColor" 
                        viewBox="0 0 352 512" 
                        aria-hidden="true"
                        className="h-6 w-6"
                      >
                        <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
                      </svg>
                    </div>
                  ) : (
                    <div className="block h-6 w-6">
                      <svg 
                        fill="currentColor" 
                        viewBox="0 0 448 512" 
                        aria-hidden="true"
                        className="h-6 w-6"
                      >
                        <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z" />
                      </svg>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-primary hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://sessionize.com/caec/"
              target="_blank"
              rel="noopener noreferrer"
              className="block pl-3 pr-4 py-2 border-l-4 border-accent text-base font-medium text-gray-600 bg-accent-light hover:bg-accent-lighter"
              onClick={() => setIsMenuOpen(false)}
            >
              Submit Paper
            </a>
          </div>
        </div>
      </nav>

      {/* Subtle visual hint for home page navigation */}
      {isHomePage && !isNavVisible && (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-40 pointer-events-none">
          <div className="mt-2">
            <svg 
              className="w-8 h-8 text-white/50 animate-bounce" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M7 10l5 5 5-5z"/>
            </svg>
          </div>
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen font-sans">
        {/* Navigation Bar */}
        <Navigation />

        {/* Main Content */}
        <MainContent />

        {/* Footer */}
        <footer className="bg-primary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 gap-8 text-center">
              <div>
                <h3 className="text-lg font-bold mb-4">CAE Conference</h3>
                <p className="text-sm">
                  Central Asian Economic Conference in celebration of the 15th year anniversary of the Nazarbayev University.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Contact</h3>
                <p className="text-sm">
                  Email: caec@nu.edu.kz
                </p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-secondary text-center">
              <p className="text-sm">&copy; {new Date().getFullYear()} CAE Conference. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

// Main content component that adjusts padding based on page
function MainContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isHomePage ? 'py-0' : 'py-8'}`}>
      <React.Suspense fallback={<div className="text-center py-12">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/call-for-papers" element={<CallForPapers />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/speakers" element={<Speakers />} />
          <Route path="/location" element={<Location />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </React.Suspense>
    </main>
  );
}

export default App; 