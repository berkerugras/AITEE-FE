import React from 'react';
import Tee from '../3dmodel/Tee';
import Teem from '../3dmodel/Tees';
import { useState, useEffect } from 'react';


const Home = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const [hovered, setHovered] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(null);

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    const styleButton = {
        display: !isFetching ? 'flex' : "none",
        marginBottom: '2rem',
        backgroundColor: hovered ? "DeepSkyBlue" : "blue",
        padding: "1.25rem",
        borderRadius: "1.10rem"
    };

    function generateImage() {

        setIsLoading(true);
        setImageUrl(null);
        setIsFetching(true);

        fetch('/api/generate')
            .then(response => response.blob())
            .then(imageBlob => {
                console.log("1", isFetching);
                const imageUrl = URL.createObjectURL(imageBlob);
                setImageUrl(imageUrl);
                setIsFetching(false);
                console.log("2", isFetching);

            })
            .catch(err => {
                setIsFetching(false);
                setIsLoading(false);
                console.log(err);
            })
    }
    useEffect(() => generateImage(), []);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh',
            paddingTop: '10vh',
        }}
        >
            <Teem></Teem>
            <button style={styleButton}
                onClick={generateImage}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                hidden={isFetching}>
                <span style={{ color: "white" }}>Get new Image</span>
            </button>
            <div style={{ height: '20vh' }}>

                {isLoading && !imageUrl ? (<p>Loading...</p>) :
                    (<img src={imageUrl} alt="Generated" />)
                }
            </div>
        </div>

    );
};


export default Home;