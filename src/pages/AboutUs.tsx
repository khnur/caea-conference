import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          About CAEA Conference
        </h1>
        <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
          The premier economics conference in Central Asia
        </p>
      </div>

      <div className="prose prose-lg mx-auto">
        <h2>About the Central Asian Economics Association</h2>
        <p>
          The Central Asian Economics Association (CAEA) is a professional organization dedicated to promoting economic research, education, and policy analysis in Central Asia. Founded in 2010, CAEA brings together economists, researchers, policymakers, and students from Kazakhstan, Kyrgyzstan, Tajikistan, Turkmenistan, Uzbekistan, and beyond.
        </p>
        <p>
          Our mission is to advance economic knowledge, foster collaboration among economists, and contribute to evidence-based policy making in the region. Through conferences, workshops, research projects, and publications, CAEA provides a platform for scholars and practitioners to exchange ideas, share research findings, and address economic challenges facing Central Asian countries.
        </p>

        <h2>About the Annual Conference</h2>
        <p>
          The CAEA Annual Conference is our flagship event, bringing together hundreds of participants from across Central Asia and around the world. The conference features keynote speeches by renowned economists, panel discussions on pressing economic issues, and parallel sessions for research presentations.
        </p>
        <p>
          Each year, the conference is hosted by a leading university in the region. We are proud to announce that the 2023 CAEA Conference will be held at Nazarbayev University in Astana, Kazakhstan. The theme of this year's conference is "Economic Resilience and Sustainable Development in Central Asia," focusing on strategies for building more resilient economies in the face of global challenges.
        </p>

        <h2>Conference Objectives</h2>
        <ul>
          <li>To provide a platform for sharing cutting-edge research on economic issues relevant to Central Asia</li>
          <li>To foster networking and collaboration among economists, policymakers, and students from the region and beyond</li>
          <li>To promote evidence-based policy making through dialogue between researchers and policymakers</li>
          <li>To support early-career economists and student researchers through specialized sessions and mentoring opportunities</li>
          <li>To strengthen the community of economists working on Central Asian economic development</li>
        </ul>

        <h2>Past Conferences</h2>
        <p>
          CAEA has successfully organized annual conferences since 2011, with each event focusing on a theme of critical importance to the region:
        </p>
        <ul>
          <li>2022: "Digital Transformation and Economic Growth" (Tashkent, Uzbekistan)</li>
          <li>2021: "Post-Pandemic Recovery in Central Asia" (Virtual Conference)</li>
          <li>2020: "Climate Change and Economic Policy" (Virtual Conference)</li>
          <li>2019: "Regional Integration and Trade" (Bishkek, Kyrgyzstan)</li>
          <li>2018: "Financial Development and Inclusion" (Almaty, Kazakhstan)</li>
        </ul>

        <h2>Organizing Committee</h2>
        <p>
          The 2023 CAEA Conference is organized by a dedicated committee of faculty members from Nazarbayev University's School of Sciences and Humanities, in collaboration with the CAEA Executive Board.
        </p>
        <ul>
          <li>Dr. Aigerim Kazakhova, Conference Chair (Nazarbayev University)</li>
          <li>Dr. Marat Ibragimov, Program Committee Chair (Nazarbayev University)</li>
          <li>Dr. Gulnara Abdullayeva, Local Organizing Committee Chair (Nazarbayev University)</li>
          <li>Prof. Timur Beketov, CAEA President (Kazakh-British Technical University)</li>
          <li>Dr. Aliya Nurgaziyeva, CAEA Secretary-General (Eurasian National University)</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutUs; 