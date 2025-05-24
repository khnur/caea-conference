import React from 'react';

interface Sponsor {
  id: number;
  name: string;
  level: 'platinum' | 'gold' | 'silver' | 'bronze' | 'partner';
  description: string;
  logoUrl: string;
  websiteUrl: string;
}

const sponsorsData: Sponsor[] = [
  {
    id: 1,
    name: "Ministry of Education and Science of Kazakhstan",
    level: "platinum",
    description: "The Ministry of Education and Science is the main government body responsible for educational and scientific policy in Kazakhstan.",
    logoUrl: "https://via.placeholder.com/300x150",
    websiteUrl: "#"
  },
  {
    id: 2,
    name: "World Bank",
    level: "platinum",
    description: "The World Bank Group is one of the world's largest sources of funding and knowledge for developing countries.",
    logoUrl: "https://via.placeholder.com/300x150",
    websiteUrl: "#"
  },
  {
    id: 3,
    name: "Asian Development Bank",
    level: "gold",
    description: "The Asian Development Bank is committed to achieving a prosperous, inclusive, resilient, and sustainable Asia and the Pacific.",
    logoUrl: "https://via.placeholder.com/300x150",
    websiteUrl: "#"
  },
  {
    id: 4,
    name: "European Bank for Reconstruction and Development",
    level: "gold",
    description: "The EBRD invests in projects that foster the transition towards open and democratic market economies.",
    logoUrl: "https://via.placeholder.com/300x150",
    websiteUrl: "#"
  },
  {
    id: 5,
    name: "Samruk-Kazyna JSC",
    level: "silver",
    description: "Samruk-Kazyna is a sovereign wealth fund and joint stock company in Kazakhstan which owns many important companies in the country.",
    logoUrl: "https://via.placeholder.com/300x150",
    websiteUrl: "#"
  },
  {
    id: 6,
    name: "Kazakh-British Technical University",
    level: "silver",
    description: "KBTU is one of Kazakhstan's leading technical universities with international partnerships and industry connections.",
    logoUrl: "https://via.placeholder.com/300x150",
    websiteUrl: "#"
  },
  {
    id: 7,
    name: "Central Asian Journal of Economics",
    level: "bronze",
    description: "A peer-reviewed journal publishing research on economic issues relevant to Central Asia.",
    logoUrl: "https://via.placeholder.com/300x150",
    websiteUrl: "#"
  },
  {
    id: 8,
    name: "Kazakhstan Economic Association",
    level: "bronze",
    description: "A professional association of economists working in Kazakhstan.",
    logoUrl: "https://via.placeholder.com/300x150",
    websiteUrl: "#"
  },
  {
    id: 9,
    name: "Eurasian National University",
    level: "partner",
    description: "One of Kazakhstan's leading universities and research institutions.",
    logoUrl: "https://via.placeholder.com/300x150",
    websiteUrl: "#"
  },
  {
    id: 10,
    name: "CAREC Institute",
    level: "partner",
    description: "An intergovernmental organization dedicated to promoting economic cooperation in the Central Asia region.",
    logoUrl: "https://via.placeholder.com/300x150",
    websiteUrl: "#"
  }
];

const Sponsors: React.FC = () => {
  const platinumSponsors = sponsorsData.filter(sponsor => sponsor.level === 'platinum');
  const goldSponsors = sponsorsData.filter(sponsor => sponsor.level === 'gold');
  const silverSponsors = sponsorsData.filter(sponsor => sponsor.level === 'silver');
  const bronzeSponsors = sponsorsData.filter(sponsor => sponsor.level === 'bronze');
  const partners = sponsorsData.filter(sponsor => sponsor.level === 'partner');

  const SponsorCard = ({ sponsor }: { sponsor: Sponsor }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6 flex flex-col h-full">
        <div className="flex-shrink-0 flex justify-center mb-4">
          <img 
            className="h-24 object-contain" 
            src={sponsor.logoUrl} 
            alt={`${sponsor.name} logo`} 
          />
        </div>
        <div className="flex-grow">
          <h3 className="text-lg font-bold text-gray-900 mb-2">{sponsor.name}</h3>
          <p className="text-sm text-gray-600 mb-4">{sponsor.description}</p>
        </div>
        <div className="mt-auto">
          <a 
            href={sponsor.websiteUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:text-secondary font-medium text-sm"
          >
            Visit Website →
          </a>
        </div>
      </div>
    </div>
  );

  const SponsorSection = ({ title, sponsors, colCount }: { title: string, sponsors: Sponsor[], colCount: string }) => (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      <div className={`grid ${colCount} gap-6`}>
        {sponsors.map(sponsor => (
          <SponsorCard key={sponsor.id} sponsor={sponsor} />
        ))}
      </div>
    </section>
  );

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Sponsors & Partners
        </h1>
        <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
          The organizations making the CAE Conference possible
        </p>
      </div>

      {platinumSponsors.length > 0 && (
        <SponsorSection 
          title="Platinum Sponsors" 
          sponsors={platinumSponsors}
          colCount="grid-cols-1 md:grid-cols-2" 
        />
      )}

      {goldSponsors.length > 0 && (
        <SponsorSection 
          title="Gold Sponsors" 
          sponsors={goldSponsors}
          colCount="grid-cols-1 md:grid-cols-2" 
        />
      )}

      {silverSponsors.length > 0 && (
        <SponsorSection 
          title="Silver Sponsors" 
          sponsors={silverSponsors}
          colCount="grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
        />
      )}

      {bronzeSponsors.length > 0 && (
        <SponsorSection 
          title="Bronze Sponsors" 
          sponsors={bronzeSponsors}
          colCount="grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
        />
      )}

      {partners.length > 0 && (
        <SponsorSection 
          title="Academic & Institutional Partners" 
          sponsors={partners}
          colCount="grid-cols-1 md:grid-cols-3" 
        />
      )}

      {/* Sponsorship Opportunities */}
      <section className="bg-primary text-white rounded-lg p-8 mt-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Sponsorship Opportunities</h2>
          <p className="mb-6">
            Join our prestigious sponsors and gain visibility among economists, researchers, and policymakers from Central Asia and beyond. We offer various sponsorship packages designed to maximize your organization's exposure to this influential audience.
          </p>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-white text-primary flex items-center justify-center mt-0.5">
                <span className="font-bold text-sm">P</span>
              </div>
              <p className="ml-3">
                <span className="font-medium">Platinum Sponsor</span> - Prominent logo placement on all conference materials, exhibition space, speaking opportunity, and 5 complimentary registrations.
              </p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-yellow-300 text-primary flex items-center justify-center mt-0.5">
                <span className="font-bold text-sm">G</span>
              </div>
              <p className="ml-3">
                <span className="font-medium">Gold Sponsor</span> - Logo on key conference materials, exhibition space, and 3 complimentary registrations.
              </p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-300 text-primary flex items-center justify-center mt-0.5">
                <span className="font-bold text-sm">S</span>
              </div>
              <p className="ml-3">
                <span className="font-medium">Silver Sponsor</span> - Logo on conference website and program, and 2 complimentary registrations.
              </p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-amber-700 text-white flex items-center justify-center mt-0.5">
                <span className="font-bold text-sm">B</span>
              </div>
              <p className="ml-3">
                <span className="font-medium">Bronze Sponsor</span> - Logo on conference website and 1 complimentary registration.
              </p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
              Download Sponsorship Prospectus
            </button>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="bg-gray-50 p-8 rounded-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us About Sponsorship</h2>
          <p className="text-gray-700 mb-6">
            To discuss sponsorship opportunities, please contact our Sponsorship Coordinator:
          </p>
          <p className="font-medium">
            Dr. Aliya Nurgaziyeva<br />
            Email: sponsorship@caeconference.org<br />
            Phone: +7 (7172) 123-4567
          </p>
        </div>
      </section>
    </div>
  );
};

export default Sponsors; 