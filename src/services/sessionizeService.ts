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

// New interfaces for GridSmart API
export interface GridSmartSpeaker {
  id: string;
  name: string;
}

export interface GridSmartSession {
  id: string;
  title: string;
  description: string | null;
  startsAt: string;
  endsAt: string;
  isServiceSession: boolean;
  isPlenumSession: boolean;
  speakers: GridSmartSpeaker[];
  categories: any[];
  roomId: number;
  room: string;
  liveUrl: string | null;
  recordingUrl: string | null;
  status: string | null;
  isInformed: boolean;
  isConfirmed: boolean;
}

export interface GridSmartRoom {
  id: number;
  name: string;
  sessions: GridSmartSession[];
  hasOnlyPlenumSessions: boolean;
}

export interface GridSmartTimeSlot {
  slotStart: string;
  rooms: {
    id: number;
    name: string;
    session: GridSmartSession;
    index: number;
  }[];
}

export interface GridSmartDay {
  date: string;
  isDefault: boolean;
  rooms: GridSmartRoom[];
  timeSlots: GridSmartTimeSlot[];
}

export type GridSmartData = GridSmartDay[];

const API_URL = 'https://sessionize.com/api/v2/i66sipcq/view/All';
const GRIDSMART_API_URL = 'https://sessionize.com/api/v2/i66sipcq/view/GridSmart';

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

// New hook for GridSmart API (used in Schedule page)
export const useGridSmartData = () => {
  const [data, setData] = useState<GridSmartData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(GRIDSMART_API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        console.error('Error fetching GridSmart data:', err);
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

// Helper functions for GridSmart data
export const formatGridSmartDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const getAllSessionsFromGridSmart = (data: GridSmartData): GridSmartSession[] => {
  const allSessions: GridSmartSession[] = [];
  
  data.forEach(day => {
    day.rooms.forEach(room => {
      room.sessions.forEach(session => {
        allSessions.push(session);
      });
    });
  });
  
  return allSessions;
};

export const groupGridSmartSessionsByDate = (data: GridSmartData) => {
  const grouped: Record<string, GridSmartSession[]> = {};
  
  data.forEach(day => {
    const formattedDate = formatGridSmartDate(day.date);
    const sessions = getAllSessionsFromGridSmart([day]);
    
    // Sort sessions by start time
    sessions.sort((a, b) => 
      new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()
    );
    
    grouped[formattedDate] = sessions;
  });
  
  return grouped;
}; 