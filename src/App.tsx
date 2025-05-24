import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Page components
const Home = React.lazy(() => import('./pages/Home'));
const AboutUs = React.lazy(() => import('./pages/AboutUs'));
const Schedule = React.lazy(() => import('./pages/Schedule'));
const Speakers = React.lazy(() => import('./pages/Speakers'));
const Location = React.lazy(() => import('./pages/Location'));
const Register = React.lazy(() => import('./pages/Register'));

function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <div className="min-h-screen font-sans">
        {/* Navigation Bar */}
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Link to="/" className="text-2xl font-bold text-primary">
                    CAE Conference
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link
                    to="/about"
                    className="border-transparent text-gray-600 hover:text-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    About Us
                  </Link>
                  <Link
                    to="/schedule"
                    className="border-transparent text-gray-600 hover:text-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Schedule
                  </Link>
                  <Link
                    to="/speakers"
                    className="border-transparent text-gray-600 hover:text-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Speakers
                  </Link>
                  <Link
                    to="/location"
                    className="border-transparent text-gray-600 hover:text-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Location
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
                <Link
                  to="/register"
                  className="hidden sm:inline-flex ml-8 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-accent hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
                >
                  Register
                </Link>
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
              <Link
                to="/about"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-primary hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                to="/schedule"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-primary hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Schedule
              </Link>
              <Link
                to="/speakers"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-primary hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Speakers
              </Link>
              <Link
                to="/location"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-primary hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Location
              </Link>
              <Link
                to="/register"
                className="block pl-3 pr-4 py-2 border-l-4 border-accent text-base font-medium text-gray-600 bg-accent-light hover:bg-accent-lighter"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <React.Suspense fallback={<div className="text-center py-12">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/speakers" element={<Speakers />} />
              <Route path="/location" element={<Location />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </React.Suspense>
        </main>

        {/* Footer */}
        <footer className="bg-primary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-bold mb-4">CAE Conference</h3>
                <p className="text-sm">
                  Central Asian Economics Association Annual Conference hosted by Nazarbayev University
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Contact</h3>
                <p className="text-sm">
                  Email: info@caeconference.org<br />
                  Phone: +7 (7172) 123-4567
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

export default App; 