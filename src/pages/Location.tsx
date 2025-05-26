import React from 'react';
import nazarbayevUniversity from '../assets/images/nazarbayev_university.png';

const Location: React.FC = () => {
  return (
    <div className="pt-8">

      {/* Main Venue */}
      <section className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative h-[600px]">
          <div className="absolute inset-0">
            <img
              src={nazarbayevUniversity}
              alt="Nazarbayev University Campus"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Nazarbayev University</h2>
          <p className="text-gray-700 mb-4">
            The CAE Conference 2025 will be held at Nazarbayev University, a leading research university in Kazakhstan. The conference will take place in the School of Sciences and Humanities building, which features state-of-the-art facilities for academic events.
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
                <button className="text-primary hover:text-secondary font-medium">
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

      {/* Accommodation */}
      <section className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Accommodation</h2>
          <p className="text-gray-700 mb-6">
            We have arranged special rates for conference participants at the following hotels. Please mention the "CAE Conference 2025" when making your reservation to access these rates.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Hilton Astana</h3>
              <p className="text-gray-600 mb-1">⭐⭐⭐⭐⭐</p>
              <p className="text-gray-700 mb-4">
                Located in the Expo area, 5 minutes from Nazarbayev University. The conference dinner will be held here.
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-medium">Special Rate:</span> $150 per night
              </p>
              <p className="text-gray-700 mb-4">
                <span className="font-medium">Distance to Venue:</span> 1.5 km
              </p>
              <button className="text-primary hover:text-secondary font-medium">
                Book Accommodation
              </button>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Sheraton Astana</h3>
              <p className="text-gray-600 mb-1">⭐⭐⭐⭐</p>
              <p className="text-gray-700 mb-4">
                Located in the city center, with good transportation links to the university.
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-medium">Special Rate:</span> $120 per night
              </p>
              <p className="text-gray-700 mb-4">
                <span className="font-medium">Distance to Venue:</span> 12 km
              </p>
              <button className="text-primary hover:text-secondary font-medium">
                Book Accommodation
              </button>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Holiday Inn Astana</h3>
              <p className="text-gray-600 mb-1">⭐⭐⭐⭐</p>
              <p className="text-gray-700 mb-4">
                Comfortable hotel with good amenities, located in the business district.
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-medium">Special Rate:</span> $100 per night
              </p>
              <p className="text-gray-700 mb-4">
                <span className="font-medium">Distance to Venue:</span> 10 km
              </p>
              <button className="text-primary hover:text-secondary font-medium">
                Book Accommodation
              </button>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">University Guest House</h3>
              <p className="text-gray-600 mb-1">⭐⭐⭐</p>
              <p className="text-gray-700 mb-4">
                Basic but comfortable accommodation on the university campus. Limited availability.
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-medium">Special Rate:</span> $60 per night
              </p>
              <p className="text-gray-700 mb-4">
                <span className="font-medium">Distance to Venue:</span> On campus
              </p>
              <button className="text-primary hover:text-secondary font-medium">
                Book Accommodation
              </button>
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
                <li>• Time Zone: GMT+6</li>
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
            The conference organizing committee can provide invitation letters to support your visa application. Please contact us at visa@caeconference.org with your details if you require an invitation letter.
          </p>
          <button className="mt-2 bg-white text-primary hover:bg-gray-100 py-2 px-4 rounded-md font-medium">
            Visa Requirements Information
          </button>
        </div>
      </section>
    </div>
  );
};

export default Location; 