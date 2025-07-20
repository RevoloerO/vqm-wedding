import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/HQStoryBook.css';

// --- MOCK DATA for the story events ---
// You can easily replace this with your actual story.
const storyEvents = [
  {
    id: 1,
    date: 'October 15, 2021',
    title: 'Event 1: Our First "Hello"',
    brief: 'A casual meeting that sparked something special.',
    fullText: 'This is the detailed story for Event 1. It was a crisp autumn day when our paths first crossed. Neither of us knew that a simple conversation would be the beginning of our forever. We talked for hours, the connection was instant and undeniable. The world seemed to fade away, and in that moment, it was just us.',
    imageUrl: 'https://placehold.co/600x800/5F7C5D/FFFFFF?text=Our+First+Hello'
  },
  {
    id: 2,
    date: 'April 5, 2022',
    title: 'Event 2: The First Adventure',
    brief: 'Our first trip together, creating memories.',
    fullText: 'This is the detailed story for Event 2. We decided to take a spontaneous road trip. The destination was less important than the journey itself. We discovered new places, shared countless laughs, and learned so much about each other. It was on this trip that we realized our shared love for exploration and adventure.',
    imageUrl: 'https://placehold.co/600x800/A3B899/FFFFFF?text=First+Adventure'
  },
  {
    id: 3,
    date: 'December 24, 2023',
    title: 'Event 3: A Holiday to Remember',
    brief: 'Spending the holidays together for the first time.',
    fullText: 'This is the detailed story for Event 3. The magic of the holiday season brought us even closer. We decorated the tree, exchanged heartfelt gifts, and spent time with family. It felt like we were already building a home together, filled with warmth, love, and traditions.',
    imageUrl: 'https://placehold.co/600x800/D4AF37/36454F?text=Holiday+Magic'
  },
  {
    id: 4,
    date: 'June 8, 2024',
    title: 'Event 4: The "Yes" Day',
    brief: 'A heartfelt proposal and the easiest "yes".',
    fullText: 'This is the detailed story for Event 4. Under a sky full of stars, one of us got down on one knee. It was a moment of pure magic and emotion. The world stood still as we promised each other a lifetime of love and happiness. It was, without a doubt, the easiest "yes" ever spoken.',
    imageUrl: 'https://placehold.co/600x800/C0A172/FFFFFF?text=The+Proposal'
  },
    {
    id: 5,
    date: 'July 1, 2028',
    title: 'Event 5: Beginning Our Forever',
    brief: 'The day we say "I Do" and start our next chapter.',
    fullText: 'This is the detailed story for Event 5. Today, surrounded by our dearest friends and family, we begin our greatest adventure yet. We are filled with so much joy and gratitude as we step into our future as husband and wife, ready for all the love and laughter that lies ahead.',
    imageUrl: 'https://placehold.co/600x800/5F7C5D/FFFFFF?text=Our+Wedding+Day'
  },
];

/**
 * HQStoryBook Component
 * Displays a vertical timeline of a couple's story.
 * Clicking an event transitions the view to show detailed information.
 */
export default function HQStoryBook() {
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [isDetailView, setIsDetailView] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  // Find the selected event object from the array
  const selectedEvent = storyEvents.find(event => event.id === selectedEventId);

  // Handle clicking on a timeline event
  const handleEventClick = (id) => {
    // If clicking the same event again, close it. Otherwise, open the new one.
    if (id === selectedEventId) {
      setSelectedEventId(null);
      setIsDetailView(false);
    } else {
      setSelectedEventId(id);
      setIsDetailView(true);
    }
  };

  // Handle closing the detail view
  const handleCloseDetail = () => {
    setSelectedEventId(null);
    setIsDetailView(false);
  };
  
  // Add a listener for the 'Escape' key to close the detail view
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleCloseDetail();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);


  return (
    <div className={`hq-story-container ${isDetailView ? 'detail-view-active' : ''}`}>
      {/* Timeline Column */}
      <div className="timeline-column">
        <button onClick={() => navigate('/vqm-wedding/')} className="back-to-home-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span>Home</span>
        </button>
        <div className="timeline-header">
          <h1 className="story-title">Our Story</h1>
          <p className="story-subtitle">A journey of love, faith, and countless memories.</p>
        </div>
        <div className="timeline">
          {storyEvents.map((event) => (
            <div
              key={event.id}
              className={`timeline-event ${event.id === selectedEventId ? 'active' : ''}`}
              onClick={() => handleEventClick(event.id)}
            >
              <div className="timeline-node"></div>
              <div className="timeline-brief">
                <span className="brief-date">{event.date}</span>
                <h3 className="brief-title">{event.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Information Column */}
      <div className="detail-column">
        {selectedEvent && (
          <div className="detail-content-wrapper">
             <button className="close-button" onClick={handleCloseDetail} aria-label="Close detail view">
                &times;
             </button>
            <div className="detail-image-container">
               <img 
                 src={selectedEvent.imageUrl} 
                 alt={selectedEvent.title} 
                 className="detail-image"
                 onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x800/cccccc/ffffff?text=Image+Not+Found'; }}
               />
            </div>
            <div className="detail-text-container">
              <h2 className="detail-title">{selectedEvent.title}</h2>
              <p className="detail-date">{selectedEvent.date}</p>
              <p className="detail-full-text">{selectedEvent.fullText}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
