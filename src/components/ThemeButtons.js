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
    backgroundColor: isClicked ? "#2c3169" : '#16193a',
    border: hoveredArt ? 'solid black' : ' ',
    marginRight: "6px",
  };

  const styleRockButton = {
    backgroundColor: isRockClicked ? "#2c3169" : '#16193a',
    border: hoveredRock ? 'solid black' : ''
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <button
        style={styleArtButton}
        className='generate-buttons'
        onClick={() => { setArt(true); setClicked(true); setRockClicked(false); }}
        onMouseEnter={handleArtMouseEnter}
        onMouseLeave={handleArtMouseLeave}
      >
        Art
      </button>
      <button
        style={styleRockButton}
        className='generate-buttons'
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