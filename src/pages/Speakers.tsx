import React from 'react';
import { useSessionizeData, Speaker as SessionizeSpeaker } from '../services/sessionizeService';

interface SpeakerCardProps {
  speaker: SessionizeSpeaker;
}

const Speakers: React.FC = () => {
  const { data, loading, error } = useSessionizeData();

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
        <h3 className="text-lg font-medium text-red-800">Error loading speakers</h3>
        <p className="mt-2 text-sm text-red-700">
          Unable to load the conference speakers. Please try again later.
        </p>
      </div>
    );
  }

  if (!data || !data.speakers || data.speakers.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900">No speakers available</h2>
        <p className="mt-2 text-gray-600">The conference speakers have not been published yet. Please check back later.</p>
      </div>
    );
  }

  // For demonstration, let's mark specific speakers as keynote speakers
  // In a real application, this information might come from the API or be stored elsewhere
  const keynoteSpeakers = data.speakers.filter(speaker => 
    speaker.id === "00000000-0000-0000-0000-000000000005" || 
    speaker.id === "00000000-0000-0000-0000-000000000001"
  );
  
  const regularSpeakers = data.speakers.filter(speaker => 
    !keynoteSpeakers.some(keynote => keynote.id === speaker.id)
  );

  const SpeakerCard: React.FC<SpeakerCardProps> = ({ speaker }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="aspect-w-3 aspect-h-2">
        <img 
          className="h-48 w-full object-cover" 
          src={speaker.profilePicture || "https://via.placeholder.com/300"} 
          alt={speaker.fullName} 
        />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900">{speaker.fullName}</h3>
        <p className="text-sm text-primary">{speaker.tagLine || "Speaker"}</p>
        <div className="mt-3">
          <p className="text-sm text-gray-700 line-clamp-3">{speaker.bio}</p>
        </div>
        {speaker.sessions && speaker.sessions.length > 0 && (
          <div className="mt-4">
            <p className="text-xs text-gray-500 uppercase font-semibold">Sessions</p>
            <p className="text-sm text-gray-700">{speaker.sessions.length} {speaker.sessions.length === 1 ? 'session' : 'sessions'}</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Conference Speakers
        </h1>
        <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
          Leading experts from around the world
        </p>
      </div>

      {/* Keynote Speakers */}
      {keynoteSpeakers.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Keynote Speakers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {keynoteSpeakers.map(speaker => (
              <SpeakerCard key={speaker.id} speaker={speaker} />
            ))}
          </div>
        </section>
      )}

      {/* All Other Speakers */}
      {regularSpeakers.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Speakers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularSpeakers.map(speaker => (
              <SpeakerCard key={speaker.id} speaker={speaker} />
            ))}
          </div>
        </section>
      )}

      {/* Call for Papers */}
      <section className="bg-gray-50 p-8 rounded-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Become a Speaker</h2>
          <p className="text-gray-700 mb-6">
            We're still accepting submissions for parallel sessions and poster presentations.
            Submit your research paper or abstract by July 15, 2023.
          </p>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            Submit Your Paper
          </button>
        </div>
      </section>
    </div>
  );
};

export default Speakers; 