import React, { useState } from 'react';
import { useGridSmartData, groupGridSmartSessionsByDate, formatSessionTime, GridSmartSession } from '../services/sessionizeService';
import TruncatedText from '../components/TruncatedText';

const Schedule: React.FC = () => {
  const { data, loading, error } = useGridSmartData();
  const [activeDay, setActiveDay] = useState<string | null>(null);


  const handleDownloadPDF = () => {
    // Download the static PDF file
    const link = document.createElement('a');
    link.href = '/CAEC2025Program_v2.pdf';
    link.download = 'CAEC2025Program_v2.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle loading and error states
  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <h3 className="text-lg font-medium text-red-800">Error loading schedule</h3>
        <p className="mt-2 text-sm text-red-700">
          Unable to load the conference schedule. Please try again later.
        </p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900">No schedule available</h2>
        <p className="mt-2 text-gray-600">The conference schedule has not been published yet. Please check back later.</p>
      </div>
    );
  }

  // Group sessions by date using the new GridSmart data structure
  const groupedSessions = groupGridSmartSessionsByDate(data);
  const days = Object.keys(groupedSessions);
  
  // Initialize active day if not set
  if (!activeDay && days.length > 0) {
    setActiveDay(days[0]);
  }

  const currentDaySessions = activeDay && groupedSessions[activeDay] ? groupedSessions[activeDay] : [];

  return (
    <div className="pt-8">
      {/* Schedule Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Date Selection Tabs */}
        <div className="mb-8">
          <div className="sm:hidden">
            <label htmlFor="dateSelect" className="sr-only">Select date</label>
            <select
              id="dateSelect"
              name="dateSelect"
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
              value={activeDay || ''}
              onChange={(e) => setActiveDay(e.target.value)}
            >
              {days.map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>
          <div className="hidden sm:block">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Dates">
                {days.map((day) => (
                  <button
                    key={day}
                    onClick={() => setActiveDay(day)}
                    className={`${
                      activeDay === day
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  >
                    {day}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Schedule List */}
        {activeDay && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="bg-primary px-4 py-5 sm:px-6">
              <h2 className="text-xl leading-6 font-medium text-white">
                {activeDay}
              </h2>
            </div>
            <ul className="divide-y divide-gray-200">
              {currentDaySessions.map((session: GridSmartSession) => {
                const startTime = formatSessionTime(session.startsAt);
                const endTime = formatSessionTime(session.endsAt);
                
                return (
                  <li key={session.id}>
                    <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex min-w-0 flex-1 items-center">
                          <div className="min-w-0 flex-1 px-4">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-primary truncate">
                                {startTime} - {endTime}
                              </p>
                              <p className="text-sm text-gray-500">
                                {session.room || 'Room TBA'}
                              </p>
                            </div>
                            <p className="mt-2 text-md font-medium text-gray-900">{session.title}</p>
                            {session.speakers.length > 0 && (
                              <p className="mt-1 text-sm text-gray-500">
                                Speakers: {session.speakers.map(speaker => speaker.name).join(', ')}
                              </p>
                            )}
                            {session.description && (
                              <TruncatedText 
                                text={session.description}
                                maxLength={200}
                                className="mt-1 text-sm text-gray-500"
                                showMoreText="Show more"
                                showLessText="Show less"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Program Downloads</h3>
          <p className="text-gray-600 mb-4">
            The conference program is subject to change. Please check back regularly for updates.
          </p>
          <div>
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              onClick={handleDownloadPDF}
            >
              <svg className="-ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Program
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule; 