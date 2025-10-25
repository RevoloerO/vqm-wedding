import './App.css';
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Route-based code splitting - lazy load pages
const HomePage = lazy(() => import('./HomePage.jsx'));
const HQStoryBook = lazy(() => import('./HQStoryBook.jsx'));

// Loading fallback component
const PageLoader = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '1.2rem',
    color: '#2A4036'
  }}>
    Loading...
  </div>
);

function App() {
  return (
    <div>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/vqm-wedding/" element={<HomePage />} />
          <Route path="/vqm-wedding/hq-storybook" element={<HQStoryBook />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App;
