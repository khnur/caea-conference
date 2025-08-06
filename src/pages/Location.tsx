import React, { useState, useEffect } from 'react';
import nazarbayevUniversityWebp from '../assets/images/nazarbayev_university_optimized.webp';
import nazarbayevUniversityJpg from '../assets/images/nazarbayev_university_optimized.jpg';
import astanaPhotoJpg from '../assets/images/Photo-of-Astana.jpg';

const Location: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Preload the main image for faster loading
  useEffect(() => {
    const img = new Image();
    img.src = nazarbayevUniversityWebp;
  }, []);

  return (
    <div className="pt-8">

      {/* Main Venue */}
      <section className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative h-[600px]">
          <div className="absolute inset-0">
            {/* Loading placeholder */}
            {!imageLoaded && !imageError && (
              <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
                <div className="text-gray-500 text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-500 mb-2"></div>
                  <div>Loading university image...</div>
                  <div className="text-xs mt-1">This may take a moment</div>
                </div>
              </div>
            )}
            
            {/* Error placeholder */}
            {imageError && (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-2">🏫</div>
                  <div className="text-lg font-medium">Nazarbayev University</div>
                  <div className="text-sm">Conference Venue</div>
                </div>
              </div>
            )}
            
            {/* Optimized university image with modern formats */}
            <picture>
              <source srcSet={nazarbayevUniversityWebp} type="image/webp" />
              <img
                src={nazarbayevUniversityJpg}
                alt="Nazarbayev University Campus"
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                loading="eager"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                style={{ display: imageError ? 'none' : 'block' }}
                decoding="async"
              />
            </picture>
          </div>
        </div>
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Nazarbayev University</h2>
          <p className="text-gray-700 mb-4">
            The CAE Conference 2025 will be held at Nazarbayev University, a leading research university in Kazakhstan.
          </p>
          <div className="mt-6 border-t border-gray-200 pt-6">
            <div className="flex flex-col sm:flex-row">
              <div className="mb-4 sm:mb-0 sm:w-1/2">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Address</h3>
                <p className="text-gray-700">
                  Nazarbayev University<br />
                  53 Kabanbay Batyr Avenue<br />
                  Astana, 010000<br />
                  Kazakhstan
                </p>
              </div>
              <div className="sm:w-1/2">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Directions</h3>
                <p className="text-gray-700 mb-2">
                  Nazarbayev University is located in the modern administrative district of Astana, approximately 15 km from the city center.
                </p>
                <button 
                  className="text-primary hover:text-secondary font-medium"
                  onClick={() => window.open('https://maps.app.goo.gl/Ls7eVBwjK9Z1mzAP6', '_blank')}
                >
                  View on Google Maps
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Getting to Astana */}
      <section className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Getting to Astana</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">By Air</h3>
              <p className="text-gray-700">
                Nursultan Nazarbayev International Airport (TSE) serves Astana with direct flights from major cities including Moscow, Istanbul, Dubai, Frankfurt, London, and Beijing. The airport is located approximately 16 km from the city center and 25 km from Nazarbayev University.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">By Train</h3>
              <p className="text-gray-700">
                Astana is well-connected by rail to major cities in Kazakhstan and neighboring countries. The main railway station, Astana Nurly Zhol, is located in the city center, approximately 12 km from Nazarbayev University.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Local Transportation</h3>
              <p className="text-gray-700">
                Taxis and ride-sharing services are readily available in Astana. The city also has a public bus system with routes connecting the airport, railway station, city center, and Nazarbayev University.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Travel Services */}
      <section className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Travel Services</h2>
          <p className="text-gray-700 mb-6">
            Special rates are available from BS Travel for our conference participants. Contact information is provided below:
          </p>
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">«Business and Sport Travel» LLP</h3>
            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-medium">Address:</span> 145 Kurmangazy Street, office 254, A05E8H3, Almaty city, Kazakhstan
              </p>
              <p>
                <span className="font-medium">Phone:</span> +7 727 276 11 11
              </p>
              <p>
                <span className="font-medium">Email:</span> <a href="mailto:traveltse@bstravel.kz" className="text-primary hover:text-secondary">traveltse@bstravel.kz</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Astana */}
      <section className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Explore Astana</h2>
          <p className="text-gray-700 mb-6">
            While you're here for the conference, take some time to explore Kazakhstan's modern capital city, known for its futuristic architecture and cultural attractions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Top Attractions</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Bayterek Tower</li>
                <li>• Hazret Sultan Mosque</li>
                <li>• National Museum of Kazakhstan</li>
                <li>• Nur-Alem Pavilion (Sphere)</li>
                <li>• Khan Shatyr Shopping Center</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Dining</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Traditional Kazakh cuisine</li>
                <li>• International restaurants</li>
                <li>• Riverside dining options</li>
                <li>• Modern cafes and coffee shops</li>
                <li>• Fine dining experiences</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Practical Information</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Currency: Kazakhstani Tenge (KZT)</li>
                <li>• Language: Kazakh and Russian</li>
                <li>• Time Zone: GMT+5</li>
                <li>• Electricity: 220V, European plugs</li>
                <li>• Emergency number: 112</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Visa Information */}
      <section className="bg-primary text-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-4">Visa Information</h2>
          <p className="mb-4">
            Participants from many countries may require a visa to enter Kazakhstan. We strongly recommend checking the visa requirements for your country as early as possible.
          </p>
          <p className="mb-4">
            The conference organizing committee can provide invitation letters to support your visa application. Please contact us at caec@nu.edu.kz with your details if you require an invitation letter.
          </p>

        </div>
      </section>
    </div>
  );
};

export default Location; 