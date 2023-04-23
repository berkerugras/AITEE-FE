import React from 'react';
import { useState, useEffect } from 'react';
import { fabric } from 'fabric';
import ThemeButtons from '../components/ThemeButtons';

const Home = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const [hovered, setHovered] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(null);
    const [canvas, setCanvas] = useState('');
    const [imgURL, setImgURL] = useState('');

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

    const initCanvas = () => (
        new fabric.Canvas('canvas', {
            height: 500,
            width: 500,
            backgroundColor: 'transparent'
        })
        // new fabric.Image.fromURL('/public/black_tshirt.png', img => {
        //     img.scale(0.75);
        //     canvas.add(img);
        //     canvas.renderAll();
        //     setImgURL('/public/black_tshirt.png');
        // })

    );

    useEffect(() => generateImage(), []);
    useEffect(() => setCanvas(initCanvas()), []);


    const addImg = (e, canvi) => {
        e.preventDefault();
        new fabric.Image.fromURL(imageUrl, img => {
            img.scale(0.75);
            canvi.add(img);
            canvi.renderAll();
            setImgURL('');
        });
    }

    function a(e,canvi){
        generateImage();
        addImg(e,canvi);
    }

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
            <ThemeButtons></ThemeButtons>
            <button style={styleButton}
                onClick={e=>a(e,canvas)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                hidden={isFetching}>
                <span style={{ color: "white" }}>Get new Image</span>
            </button>
            
            <canvas id="canvas" />
            <div style={{ height: '20vh' }}>

                {isLoading && !imageUrl ? (<p>Loading...</p>) :
                    (<img src={imageUrl} alt="Generated" />)
                }
            </div>
        </div>

    );
};


export default Home;