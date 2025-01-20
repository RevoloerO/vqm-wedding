import { useState } from 'react'
import NavBar from './NavBar.jsx';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const Banner = () => {
    return (
      <div className='banner'>
        <h1>Quyen Mai & Hien Dang</h1>
      </div>
    )
  }
  return (
    <div>
      <NavBar />
      <Banner />
    </div>
  )
}

export default App;
