import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './HomePage.jsx';
import HQStoryBook from './HQStorybook.jsx';
function App() {
  return (
    <div>
      <Routes>
        <Route path="/vqm-wedding/" element={<HomePage />} />
        <Route path="/vqm-wedding/hq-storybook" element={<HQStoryBook />} />
      </Routes>
    </div>
  )
}

export default App;
