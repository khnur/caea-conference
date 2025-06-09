import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Import available images statically
import astanaImage from '../assets/images/Photo-of-Astana.jpg';
import astanaImage1 from '../assets/images/Photo-of-Astana-1.webp';
// Import the Sessionize service
import { useSessionizeData } from '../services/sessionizeService';

const Home: React.FC = () => {
  const { data, loading } = useSessionizeData();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Define available images array
  const availableImages = [astanaImage, astanaImage1];

  // Auto-advance slideshow every 5 seconds
  useEffect(() => {
    if (availableImages.length > 1) {
      const interval = setInterval(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentImageIndex((prevIndex) => (prevIndex + 1) % availableImages.length);
          setIsTransitioning(false);
        }, 500); // Half of transition duration
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [availableImages.length]);

  // Log for debugging
  useEffect(() => {
    console.log(`Slideshow initialized with ${availableImages.length} images`);
    console.log(`Current image index: ${currentImageIndex}`);
  }, [currentImageIndex, availableImages.length]);

  // Select keynote speakers (those with isTopSpeaker flag)
  const featuredSpeakers = data && data.speakers ? data.speakers.filter(speaker => speaker.isTopSpeaker) : [];

  // Function to get initials from full name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden w-screen h-screen -ml-[calc((100vw-100%)/2)]">
        {/* Background Images with Crossfade */}
        <div className="absolute inset-0 z-0">
          {availableImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt="Astana Cityscape with Baiterek Tower"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
          {/* Enhanced gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/60 to-primary/80"></div>
        </div>
        
        <div className="relative z-10 h-full flex items-center justify-center px-4">
          <div className="max-w-6xl mx-auto text-center">
            {/* Main Title with enhanced typography */}
            <div className="mb-12 animate-fade-in-up">
              <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight mb-6">
                <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                  Central Asian Economics Conference 
                </span>
                <span className="text-accent font-black tracking-wider ml-2 sm:ml-4">
                  2025
                </span>
              </h1>
            </div>

            {/* Event Details in Cards */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8 animate-fade-in-up animation-delay-300">
              {/* Date Card */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
                <div className="flex items-center space-x-4">
                  <div className="bg-accent/20 rounded-full p-3">
                    <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-blue-200 text-sm font-medium uppercase tracking-wide">Date</p>
                    <p className="text-white text-lg font-bold">August 29–31, 2025</p>
                  </div>
                </div>
              </div>

              {/* Location Card */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
                <div className="flex items-center space-x-4">
                  <div className="bg-accent/20 rounded-full p-3">
                    <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-blue-200 text-sm font-medium uppercase tracking-wide">Venue</p>
                    <p className="text-white text-lg font-bold">Nazarbayev University</p>
                    <p className="text-blue-100 text-sm">Astana, Kazakhstan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating elements for visual enhancement */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-accent/20 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-full animate-float animation-delay-1000"></div>
        <div className="absolute bottom-32 left-20 w-12 h-12 bg-accent/30 rounded-full animate-float animation-delay-2000"></div>
      </section>

      {/* About Conference Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-12">
              About the Conference
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed">
              The <span className="font-bold">Central Asian Economics Conference 2025</span> aims to bring together economists connected to the Central Asian region, whether by origin, research interest, or professional engagement.
            </p>
            <p className="mt-8 text-lg text-gray-700 leading-relaxed">
              Hosted by Nazarbayev University from <span className="font-bold">August 29 to 31</span> as part of its <span className="font-bold">15th anniversary celebrations</span>, the event marks the first step toward launching the <span className="font-bold">Central Asian Economics Association (CAEA)</span>, a platform to support research coordination, funding, and future academic initiatives.
            </p>
          </div>
        </div>
      </section>

      {/* Keynote Speakers */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Keynote Speakers
            </h2>
          </div>
          <div className={`mt-10 grid grid-cols-1 gap-12 ${
            featuredSpeakers.length === 1 ? 'max-w-md mx-auto' :
            featuredSpeakers.length === 2 ? 'sm:grid-cols-2 max-w-2xl mx-auto' :
            'sm:grid-cols-2 lg:grid-cols-3'
          }`}>
            {loading ? (
              <div className="col-span-3 flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : featuredSpeakers.length > 0 ? (
              featuredSpeakers.map((speaker) => (
                <div key={speaker.id} className="flex flex-col items-center">
                  <div className="h-40 w-40 rounded-full bg-primary overflow-hidden mb-6">
                    {speaker.profilePicture ? (
                      <img 
                        src={speaker.profilePicture} 
                        alt={speaker.fullName} 
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center">
                        <span className="text-4xl font-bold text-white">
                          {getInitials(speaker.fullName)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{speaker.fullName}</h3>
                    <p className="text-sm text-gray-500 mb-3">{speaker.tagLine || "Speaker"}</p>
                    <p className="text-base text-gray-700 leading-relaxed line-clamp-2">
                      {speaker.bio}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-gray-500 text-lg">Speaker information coming soon</p>
              </div>
            )}
          </div>
          {/* <div className="mt-16 text-center">
            <Link
              to="/speakers"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
            >
              View All Speakers
            </Link>
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default Home; 