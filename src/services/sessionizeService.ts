import { useEffect, useState } from 'react';

export interface Session {
  id: string;
  title: string;
  description: string;
  startsAt: string;
  endsAt: string;
  isServiceSession: boolean;
  isPlenumSession: boolean;
  speakers: string[];
  roomId: number;
  status: string;
  liveUrl: string | null;
  recordingUrl: string | null;
}

export interface Speaker {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  bio: string;
  tagLine: string;
  profilePicture: string;
  isTopSpeaker: boolean;
  sessions: number[];
}

export interface Room {
  id: number;
  name: string;
  sort: number;
}

export interface SessionizeData {
  sessions: Session[];
  speakers: Speaker[];
  rooms: Room[];
  categories: any[];
  questions: any[];
}

const API_URL = 'https://sessionize.com/api/v2/i66sipcq/view/All';

export const useSessionizeData = () => {
  const [data, setData] = useState<SessionizeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        console.error('Error fetching Sessionize data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

// Helper function to get speaker details for a session
export const findSpeakersForSession = (session: Session, allSpeakers: Speaker[]) => {
  return allSpeakers.filter(speaker => session.speakers.includes(speaker.id));
};

// Helper function to get room details for a session
export const findRoomForSession = (session: Session, allRooms: Room[]) => {
  return allRooms.find(room => room.id === session.roomId);
};

// Helper function to group sessions by date
export const groupSessionsByDate = (sessions: Session[]) => {
  const grouped = sessions.reduce((acc, session) => {
    const date = new Date(session.startsAt).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    if (!acc[date]) {
      acc[date] = [];
    }
    
    acc[date].push(session);
    return acc;
  }, {} as Record<string, Session[]>);
  
  // Sort sessions by start time within each day
  Object.keys(grouped).forEach(date => {
    grouped[date].sort((a, b) => 
      new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()
    );
  });
  
  return grouped;
};

// Format date and time from ISO string
export const formatSessionTime = (isoString: string) => {
  return new Date(isoString).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
}; 