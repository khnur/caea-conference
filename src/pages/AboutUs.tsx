import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div className="pt-8">
      <div className="prose prose-lg mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">ABOUT</h1>
        
        <div className="space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            The <strong>Central Asian Economic Conference 2025</strong>, hosted by Nazarbayev University, is designed to bring together economists connected to the Central Asian region—whether by origin, academic interest, or professional ties. The conference serves as a platform for scholarly exchange and collaboration, with a particular focus on advancing economic research relevant to the region.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed">
            This year's event is held as part of <strong>Nazarbayev University's 15th anniversary celebrations</strong>. Since its founding, NU has established itself as the leading research university in Central Asia, ranked #1 in the region according to the <strong>Times Higher Education World University Rankings 2025</strong>, with a strong emphasis on academic excellence, global engagement, and innovation. As a hub for economic research and higher education, NU attracts students and scholars from across Central Asia and beyond, playing a growing role in shaping academic and policy discourse in the region.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed">
            The 2025 conference also marks the first step toward launching the <strong>Central Asian Economic Association (CAEA)</strong>—a platform dedicated to promoting, coordinating, and supporting economic research on the region. The Association will foster collaboration among scholars, encourage knowledge exchange, and support the development of academic initiatives, including regional conferences, a job market, and new opportunities for PhD students in Central Asia.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed">
            The conference will take place from the afternoon of August 29 through the morning of August 31, featuring research presentations, networking opportunities, and planning discussions for the formal launch of the Association.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed">
            We warmly invite you to be part of this important initiative to strengthen the regional economic research community.
          </p>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Conference Committee</h2>
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <div className="text-lg text-gray-700 space-y-2">
                <p>Giulio Seccia</p>
                <p>Charles Becker</p>
                <p>Shlomo Weber</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Programme Committee</h2>
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <div className="text-lg text-gray-700 mb-4">
                <p className="font-semibold mb-2">Chair:</p>
                <p className="ml-4 mb-4">Levent Koçkesen</p>
                
                <p className="font-semibold mb-2">Members:</p>
                <div className="ml-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                  <p>Ahmet Altinok</p>
                  <p>Alexis Belianin (Almaty Management University)</p>
                  <p>Dana Bazarkulova</p>
                  <p>Bauyrzhan Yedgenov (SDU University)</p>
                  <p>Rajarshi Bhowal</p>
                  <p>Julio Dávila</p>
                  <p>Mehmet Demir</p>
                  <p>Zhanna Kapsalyamova</p>
                  <p>Josef Ruzicka</p>
                  <p>Giulio Seccia</p>
                  <p>Andrey Tkachenko</p>
                  <p>Okan Yilankaya</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Local Organizing Committee</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-lg text-gray-700">
                The conference is organized by members of the Department of Economics – Central Asian Economic Conference, School of Sciences and Humanities, at Nazarbayev University.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs; 