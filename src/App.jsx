import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './HomePage.jsx';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/vqm-wedding/" element={<HomePage />} />
      </Routes>
    </div>
  )
}

export default App;
