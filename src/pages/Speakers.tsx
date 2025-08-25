import React from 'react';
import { useSessionizeData, Speaker as SessionizeSpeaker } from '../services/sessionizeService';
import TruncatedText from '../components/TruncatedText';

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

  // Filter keynote speakers based on isTopSpeaker flag
  const keynoteSpeakers = data.speakers.filter(speaker => speaker.isTopSpeaker);
  
  // Regular speakers are those who are not keynote speakers
  const regularSpeakers = data.speakers.filter(speaker => !speaker.isTopSpeaker);

  const SpeakerCard: React.FC<SpeakerCardProps> = ({ speaker }) => {
    // Function to get initials from full name
    const getInitials = (name: string) => {
      return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase();
    };

    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="aspect-w-3 aspect-h-2">
          {speaker.profilePicture ? (
            <img 
              className="h-48 w-full object-cover" 
              src={speaker.profilePicture} 
              alt={speaker.fullName} 
            />
          ) : (
            <div className="h-48 w-full bg-primary flex items-center justify-center">
              <span className="text-4xl font-bold text-white">
                {getInitials(speaker.fullName)}
              </span>
            </div>
          )}
        </div>
        <div className="p-6 pb-8">
          <h3 className="text-lg font-bold text-gray-900">{speaker.fullName}</h3>
          <p className="text-sm text-primary mb-4">{speaker.tagLine || "Speaker"}</p>
          <div className="mt-3">
            <TruncatedText 
              text={speaker.bio}
              maxLength={150}
              className="text-sm text-gray-700 leading-relaxed"
              showMoreText="Read more"
              showLessText="Read less"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="pt-8">
      {/* Keynote Speakers Section */}
      {keynoteSpeakers.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{keynoteSpeakers.length === 1 ? 'Keynote Speaker' : 'Keynote Speakers'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {keynoteSpeakers.map(speaker => (
                <SpeakerCard key={speaker.id} speaker={speaker} />
              ))}
            </div>
          </section>
        </div>
      )}

      {/* All Other Speakers Section */}
      {regularSpeakers.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Speakers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularSpeakers.map(speaker => (
                <SpeakerCard key={speaker.id} speaker={speaker} />
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Speakers; 