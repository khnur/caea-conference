import React from 'react';
import { Link } from 'react-router-dom';
// Import the local image
import universityImage from '../assets/images/nazarbayev_university.png';
// Import the Sessionize service
import { useSessionizeData } from '../services/sessionizeService';

const Home: React.FC = () => {
  const { data, loading } = useSessionizeData();

  // Select up to 3 speakers to feature (if API data is available)
  const featuredSpeakers = data && data.speakers ? data.speakers.slice(0, 3) : [];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative py-16 rounded-lg overflow-hidden" style={{minHeight: "600px"}}>
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={universityImage}
            alt="Nazarbayev University Campus" 
            className="w-full h-full object-cover"
          />
          {/* Dark overlay to make text readable */}
          <div className="absolute inset-0 bg-primary opacity-60"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
              Central Asian Economics Conference 2025
            </h1>
          </div>
        </div>
      </section>

      {/* About Conference Section */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              About the Conference
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Fostering economic research and collaboration in Central Asia
            </p>
          </div>
          <div className="mt-10">
            <p className="text-lg text-gray-700">
              The Central Asian Economics Association Conference is the premier gathering for economists, policymakers, and researchers focused on Central Asian economic development and policy. Hosted by Nazarbayev University, this year's conference will explore themes of sustainable economic growth, regional integration, and post-pandemic recovery.
            </p>
            <p className="mt-4 text-lg text-gray-700">
              Join us for three days of keynote speeches, panel discussions, research presentations, and networking opportunities with leading experts from across the region and around the world.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Speakers */}
      <section className="bg-gray-50 py-12 rounded-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Keynote Speakers
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              <div className="col-span-3 flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : featuredSpeakers.length > 0 ? (
              featuredSpeakers.map((speaker) => (
                <div key={speaker.id} className="flex flex-col items-center">
                  <div className="h-40 w-40 rounded-full bg-gray-300 overflow-hidden">
                    <img 
                      src={speaker.profilePicture || "https://via.placeholder.com/300"} 
                      alt={speaker.fullName} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="text-lg font-medium text-gray-900">{speaker.fullName}</h3>
                    <p className="text-sm text-gray-500">{speaker.tagLine || "Speaker"}</p>
                    <p className="mt-2 text-sm text-gray-700 line-clamp-2">
                      {speaker.bio}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-8">
                <p className="text-gray-500">Speaker information coming soon</p>
              </div>
            )}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/speakers"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              View All Speakers
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-accent py-12 rounded-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Join Us at CAE Conference 2025
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-white opacity-90">
              Register today to secure your spot at this premier event
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                to="/register"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-accent bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
              >
                Register Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 