import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import { FaPlay } from 'react-icons/fa';

function App() {
  return (
    <div className="container">
      <h1 className="title">Video Player</h1>
      <Link to="/reproductor">
        <button className="button"><FaPlay /></button>
      </Link>
    </div>
  );
}

export default App;

// npm install react-icons