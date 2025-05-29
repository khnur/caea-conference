import jsPDF from 'jspdf';
import { Session, Speaker, Room, groupSessionsByDate, formatSessionTime, findRoomForSession, findSpeakersForSession } from './sessionizeService';
import logoImg from '../assets/logo/nu_15_years_logo.png';

export interface PDFExportData {
  sessions: Session[];
  speakers: Speaker[];
  rooms: Room[];
}

export const exportScheduleToPDF = async (data: PDFExportData) => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  let yPosition = margin;

  // Load and add logo
  try {
    const logoResponse = await fetch(logoImg);
    const logoBlob = await logoResponse.blob();
    const logoBase64 = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(logoBlob);
    });

    // Create an image element to get natural dimensions
    const img = new Image();
    await new Promise<void>((resolve) => {
      img.onload = () => resolve();
      img.src = logoBase64;
    });

    // Calculate proper dimensions maintaining aspect ratio
    const maxLogoWidth = 60; // Maximum width for the logo
    const aspectRatio = img.naturalHeight / img.naturalWidth;
    const logoWidth = Math.min(maxLogoWidth, img.naturalWidth);
    const logoHeight = logoWidth * aspectRatio;

    pdf.addImage(logoBase64, 'PNG', margin, yPosition, logoWidth, logoHeight);
    yPosition += logoHeight + 10;
  } catch (error) {
    console.warn('Could not load logo:', error);
    yPosition += 10;
  }

  // Add title
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Conference Program', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 15;

  // Add download date and time
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  const downloadDate = new Date().toLocaleString();
  pdf.text(`Downloaded: ${downloadDate}`, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 20;

  // Group sessions by date
  const groupedSessions = groupSessionsByDate(data.sessions);
  const days = Object.keys(groupedSessions);

  for (const day of days) {
    const sessions = groupedSessions[day];

    // Check if we need a new page
    if (yPosition > pageHeight - 60) {
      pdf.addPage();
      yPosition = margin;
    }

    // Add day header
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text(day, margin, yPosition);
    yPosition += 15;

    // Add sessions for this day
    for (const session of sessions) {
      const room = data.rooms ? findRoomForSession(session, data.rooms) : null;
      const speakers = data.speakers ? findSpeakersForSession(session, data.speakers) : [];
      
      const startTime = formatSessionTime(session.startsAt);
      const endTime = formatSessionTime(session.endsAt);

      // Check if we need a new page for this session
      const estimatedSessionHeight = 30; // Rough estimate
      if (yPosition + estimatedSessionHeight > pageHeight - margin) {
        pdf.addPage();
        yPosition = margin;
      }

      // Session time and room
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      const timeText = `${startTime} - ${endTime}`;
      const roomText = room ? ` | ${room.name}` : ' | Room TBA';
      pdf.text(timeText + roomText, margin, yPosition);
      yPosition += 8;

      // Session title
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      const titleLines = pdf.splitTextToSize(session.title, contentWidth);
      pdf.text(titleLines, margin, yPosition);
      yPosition += titleLines.length * 6;

      // Speakers
      if (speakers.length > 0) {
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        const speakersText = `Speakers: ${speakers.map(speaker => speaker.fullName).join(', ')}`;
        const speakerLines = pdf.splitTextToSize(speakersText, contentWidth);
        pdf.text(speakerLines, margin, yPosition);
        yPosition += speakerLines.length * 5;
      }

      // Session description
      if (session.description) {
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'normal');
        const descriptionLines = pdf.splitTextToSize(session.description, contentWidth);
        // Limit description to prevent overly long content
        const maxDescriptionLines = 3;
        const limitedLines = descriptionLines.slice(0, maxDescriptionLines);
        pdf.text(limitedLines, margin, yPosition);
        yPosition += limitedLines.length * 4;
        
        if (descriptionLines.length > maxDescriptionLines) {
          pdf.text('...', margin, yPosition);
          yPosition += 4;
        }
      }

      yPosition += 8; // Space between sessions
    }

    yPosition += 10; // Extra space between days
  }

  // Save the PDF
  const fileName = `conference-program-${new Date().toISOString().split('T')[0]}.pdf`;
  pdf.save(fileName);
}; 