import React from 'react';

const CallForPapers: React.FC = () => {
  return (
    <div className="pt-8">
      <div className="prose prose-lg mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">CALL FOR PAPERS</h1>
        
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Central Asian Economics Conference (CAEC)</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Dear colleagues,
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              The Department of Economics at Nazarbayev University invites paper submissions for the Central Asian Economics Conference (CAEC), which will be held from <strong>August 29-31, 2025</strong>, at Nazarbayev University, Astana, Kazakhstan. This event seeks to bring together economists connected to Central Asia - through origin, research focus, or institutional affiliation - in order to promote scholarly exchange and strengthen regional collaboration. The conference is held as part of <strong>Nazarbayev University's 15th Anniversary</strong> celebrations. We kindly ask you to <strong>share this call for papers</strong> with colleagues whose work relates to Central Asia.
            </p>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Fields of Interest</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              We welcome submissions in all fields of economics, including but not limited to:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <ul className="space-y-2 text-lg text-gray-700">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                  Macroeconomics
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                  Microeconomics
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                  Development Economics
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                  Behavioral Economics
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                  Econometrics
                </li>
              </ul>
              <ul className="space-y-2 text-lg text-gray-700">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                  Labor Economics
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                  Public Economics
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                  Political Economy
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                  Environmental and Energy Economics
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                  Finance and Banking
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                  Industrial Organization
                </li>
              </ul>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Both theoretical and empirical contributions are welcome. Submissions from early-career researchers and PhD students are particularly encouraged.
            </p>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Plenary Sessions</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <ul className="space-y-3 text-lg text-gray-700">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  <strong>Rustam Ibragimov</strong>, Imperial College London
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  <strong>Sergey Paltsev</strong>, MIT Center for Sustainability Science and Strategy
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  <span dangerouslySetInnerHTML={{ __html: 'Round Table on <strong>Central Asian Economics Association</strong> (TBA)' }} />
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  More plenary sessions might be added to the program at a later stage
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Submissions</h2>
            <div className="bg-accent/5 border border-accent/20 p-6 rounded-lg">
              <ul className="space-y-3 text-lg text-gray-700 mb-6">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-accent rounded-full mr-3 mt-2 flex-shrink-0"></span>
                  Submissions in all fields for both seminar and poster presentations are welcome!
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-accent rounded-full mr-3 mt-2 flex-shrink-0"></span>
                  Please submit a paper or an extended abstract (1-2 pages) and indicate if you are applying for a seminar and/or a poster presentation using the following link:
                </li>
              </ul>
              
              <div className="text-center">
                <a
                  href="https://sessionize.com/caec/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-lg font-medium rounded-md shadow-sm text-white bg-accent hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-all duration-200"
                >
                  Paper Submission Portal
                  <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
              
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-lg font-semibold text-red-800 text-center">
                  The submission deadline is July 15, 2025, at 23:59 Astana time (GMT+5).
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Important Dates</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-gray-200 pb-3">
                  <span className="text-lg font-medium text-gray-900">Deadline for submissions:</span>
                  <span className="text-lg text-red-600 font-semibold mt-1 sm:mt-0">July 15, 2025</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-gray-200 pb-3">
                  <span className="text-lg font-medium text-gray-900">Decisions are communicated by:</span>
                  <span className="text-lg text-gray-600 mt-1 sm:mt-0">July 25, 2025</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-gray-200 pb-3">
                  <span className="text-lg font-medium text-gray-900">Deadline for registration of presenters:</span>
                  <span className="text-lg text-gray-600 mt-1 sm:mt-0">August 1, 2025</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <span className="text-lg font-medium text-gray-900">Registration of non-presenters:</span>
                  <span className="text-lg text-gray-600 mt-1 sm:mt-0">August 2 - 20, 2025</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="bg-primary/5 border border-primary/20 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Contact Information</h3>
              <p className="text-lg text-gray-700">
                Please contact us at{' '}
                <a 
                  href="mailto:caec@nu.edu.kz" 
                  className="text-accent hover:text-accent-dark underline font-medium"
                >
                  caec@nu.edu.kz
                </a>{' '}
                for inquiries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallForPapers; 