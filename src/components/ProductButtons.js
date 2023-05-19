
import React from 'react';
import Home from '../pages/home';
import { useState, useEffect, useRef } from 'react';
import '../styles/style.css'

import { forwardRef, useImperativeHandle } from 'react';


const ProductButtons = React.forwardRef((props, ref) => {

    const [isBlackTshirtClicked, setBlackTshirtClicked] = useState(true);
    const [isWhiteHoodieClicked, setWhiteHoodieClicked] = useState(false);
    const [whiteHoodie, setHoveredWhiteHoodie] = useState(false);
    const [blackTshirt, setHoveredBlackTshirt] = useState(false);

    function productStateCheck() {
        if (isBlackTshirtClicked) {
            return "BT";
        }
        else {
            return "WH"
        }
    }
    useImperativeHandle(ref, () => ({ getMyState: () => { return productStateCheck() } }));


    const handleWhiteHoodieMouseEnter = () => {
        setHoveredWhiteHoodie(true);
    };

    const handleWhiteHoodieMouseLeave = () => {
        setHoveredWhiteHoodie(false);
    };

    const handleBlackTshirtMouseEnter = () => {
        setHoveredBlackTshirt(true);
    };

    const handleBlackTshirtMouseLeave = () => {
        setHoveredBlackTshirt(false);
    };


    const styleBlackTshirtButton = {
        width: blackTshirt ? "8rem" : "4rem",
        height: blackTshirt ? "8rem" : "4rem",
        border: isBlackTshirtClicked ? 'solid black' : ' ',
        borderRadius: '5px'



    };

    const styleWhitehHoodieButton = {
        width: whiteHoodie ? "8rem" : "4rem",
        height: whiteHoodie ? "8rem" : "4rem",
        border: isWhiteHoodieClicked ? 'solid black' : ' ',
        borderRadius: '5px'

    };

    return (
        <>
            <button className="image-button"
                onClick={() => { setWhiteHoodieClicked(false); setBlackTshirtClicked(true); }}
                onMouseEnter={handleBlackTshirtMouseEnter}
                onMouseLeave={handleBlackTshirtMouseLeave}><img style={styleBlackTshirtButton} src="/black_tshirt.png" alt='' className="button-image" />
            </button>

            <button className="image-button"
                onClick={() => { setWhiteHoodieClicked(true); setBlackTshirtClicked(false); }}
                onMouseEnter={handleWhiteHoodieMouseEnter}
                onMouseLeave={handleWhiteHoodieMouseLeave}>
                <img style={styleWhitehHoodieButton} src="/white_hoodie.png" alt='' className="button-image" />
            </button>


        </>
    );
});

export default ProductButtons;
