import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div className="pt-8">
      <div className="prose prose-lg mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">About the Conference</h1>
        
        <div className="space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            The Central Asian Economics Conference 2025, hosted by Nazarbayev University, is designed to bring together economists connected to the Central Asian region-whether by origin, academic interest, or professional ties.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed">
            This event marks the first step toward establishing the <strong>Central Asian Economics Association (CAEA)</strong>, a platform dedicated to promoting, coordinating, and supporting economic research on the region. The Association will foster collaboration among scholars, encourage knowledge exchange, and support the development of academic initiatives focused on Central Asia, including regional conferences, a job market, and new opportunities for PhD students.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed">
            The conference will take place from the afternoon of <strong>August 29</strong> through the morning of <strong>August 31</strong>, and will feature research presentations, networking opportunities, and planning discussions for the formal launch of the Association.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed">
            We hope you will join us in this important initiative to strengthen the regional economics research community.
          </p>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Organizing Committee</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-lg text-gray-700 mb-4">
                <strong>Giulio Seccia (Chair)</strong>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-gray-700">
                <p>Julio Dávila</p>
                <p>Levent Koçkesen</p>
                <p>Okan Yilankaya</p>
                <p>Ahmet Altinok</p>
                <p>Dana Bazarkulova</p>
                <p>Rajarshi Bhowal</p>
                <p>Nino Buliskeria</p>
                <p>Mehmet Demir</p>
                <p>Ali Elminejad</p>
                <p>Alejandro Melo Ponce</p>
                <p>Vladyslav Nora</p>
                <p>Oleg Rubanov</p>
                <p>Josef Ruzicka</p>
                <p>Galiya Sagyndykova</p>
                <p>Aigerim Sarsenbayeva</p>
                <p>Andrey Tkachenko</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs; 