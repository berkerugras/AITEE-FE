import React from 'react';
import Home from '../pages/home';
import { useState, useEffect, useRef } from 'react';
import '../styles/style.css'

import { forwardRef, useImperativeHandle } from 'react';



const ThemeButtons = React.forwardRef((props, ref) => {

  const [isArt, setArt] = useState(true);
  const [isClicked, setClicked] = useState(true);
  const [isRockClicked, setRockClicked] = useState(false);
  const [hoveredArt, setHoveredArt] = useState(false);
  const [hoveredRock, setHoveredRock] = useState(false);

  useImperativeHandle(ref, () => ({ getMyState: () => { return isArt } }), [isArt]);



  const handleArtMouseEnter = () => {
    setHoveredArt(true);
  };

  const handleArtMouseLeave = () => {
    setHoveredArt(false);
  };

  const handleRockMouseEnter = () => {
    setHoveredRock(true);
  };

  const handleRockMouseLeave = () => {
    setHoveredRock(false);
  };
  const styleArtButton = {
    backgroundColor: isClicked ? "#0065c4" : '#001a33',
    color: '#ffffff',
    padding: '10px 20px',
    border: hoveredArt ? 'solid black' : ' ',
    borderRadius: '5px',
    marginRight: '10px',
    fontFamily: 'HomeFont',
    fontSize: '40px',
    cursor: "pointer"

  };

  const styleRockButton = {
    backgroundColor: isRockClicked ? "#0065c4" : '#001a33',
    color: '#ffffff',
    padding: '10px 20px',
    border: hoveredRock ? 'solid black' : '',
    borderRadius: '5px',
    fontFamily: 'HomeFont',
    fontSize: '40px',
    cursor: "pointer"

  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div className='main-text'>Choose a Theme</div>
      <button
        style={styleArtButton}
        onClick={() => { setArt(true); setClicked(true); setRockClicked(false); }}
        onMouseEnter={handleArtMouseEnter}
        onMouseLeave={handleArtMouseLeave}
      >
        Art
      </button>
      <button
        style={styleRockButton}
        onClick={() => { setArt(false); setClicked(false); setRockClicked(true); }}
        onMouseEnter={handleRockMouseEnter}
        onMouseLeave={handleRockMouseLeave}
      >
        Rock
      </button>
    </div>
  );
});

export default ThemeButtons;