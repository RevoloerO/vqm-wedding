import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/HQStoryBook.css';
import hqStamp2 from './assets/HQ-stamp-2-nobg.png'; 
// Import story data from the new external file
import { storyEvents } from './storyData.js';

const ANIMATION_DURATION = 1200; // Corresponds to CSS animation duration

/**
 * HQStoryBook Component
 * Displays a vertical timeline of a couple's story with book-like transitions.
 */
export default function HQStoryBook() {
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [isDetailView, setIsDetailView] = useState(false);
    const [animationState, setAnimationState] = useState('entering');
    const navigate = useNavigate();

    // On component mount, play the 'entering' animation
    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimationState('entered');
        }, ANIMATION_DURATION);
        return () => clearTimeout(timer);
    }, []);

    const handleNavigateHome = () => {
        setAnimationState('exiting');
        setTimeout(() => {
            navigate('/vqm-wedding/');
        }, ANIMATION_DURATION);
    };

    const selectedEvent = storyEvents.find(event => event.id === selectedEventId);

    const handleEventClick = (id) => {
        if (id === selectedEventId) {
            setSelectedEventId(null);
            setIsDetailView(false);
        } else {
            setSelectedEventId(id);
            setIsDetailView(true);
        }
    };

    const handleCloseDetail = () => {
        setSelectedEventId(null);
        setIsDetailView(false);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                handleCloseDetail();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className={`hq-story-book-wrapper ${animationState}`}>
            <div className="book-cover">
                <div className="journey-stamp-wrapper" style={{ WebkitMaskImage: `url(${hqStamp2})`, maskImage: `url(${hqStamp2})` }} />
                <h2 className="journey-book-title">Our Journey</h2>
                <p className="journey-book-subtitle">Walking together in faith and love.</p>
                <div className="journey-book-prompt"><span>Discover Love Story</span></div>
            </div>
            <div className={`hq-story-container ${isDetailView ? 'detail-view-active' : ''}`}>
                <div className="timeline-column">
                    <button onClick={handleNavigateHome} className="back-to-home-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                        <span>Home</span>
                    </button>
                    <div className="timeline-header">
                        <h1 className="story-title">Our Story</h1>
                        <p className="story-subtitle">A journey of love, faith, and countless memories.</p>
                    </div>
                    <div className="timeline">
                        {storyEvents.map((event) => (
                            <div key={event.id} className={`timeline-event ${event.id === selectedEventId ? 'active' : ''}`} onClick={() => handleEventClick(event.id)}>
                                <div className="timeline-node"></div>
                                <div className="timeline-brief">
                                    <span className="brief-date">{event.date}</span>
                                    <h3 className="brief-title">{event.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="detail-column">
                    {selectedEvent && (
                        <div className="detail-content-wrapper">
                            <button className="close-button" onClick={handleCloseDetail} aria-label="Close detail view">&times;</button>
                            <div className="detail-image-container">
                                <img src={selectedEvent.imageUrl} alt={selectedEvent.title} className="detail-image" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x800/cccccc/ffffff?text=Image+Not+Found'; }} />
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
        </div>
    );
}
