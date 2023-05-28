import React from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { fabric } from 'fabric';
import ThemeButtons from '../components/ThemeButtons';
import BuyCard from '../components/BuyCard';
import ProductButtons from '../components/ProductButtons';
import { useLocation, useNavigate } from 'react-router-dom';
const Home = () => {
    const location = useLocation()


    const [imageUrl, setImageUrl] = useState(null);
    const [hovered, setHovered] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(null);
    const [canvasObj, setCanvas] = useState(null);
    const themeRef = useRef();
    const [canvasImage, setCanvasImage] = useState(null);


    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    const styleButton = {
        display: !isFetching ? 'flex' : "none",
        marginBottom: '2rem',
        backgroundColor: hovered ? "#0065c4" : "#001a33",
        padding: "1.25rem",
        borderRadius: "1.10rem",
        fontFamily: 'HomeFont',
        fontSize: "32px",
    };

    async function generateImage() {

        setIsLoading(true);
        setImageUrl(null);
        setIsFetching(true);

        if (themeRef.current.getMyState() === false) {
            await fetch('/api/generate/rock')
                .then(response => response.blob())
                .then(imageBlob => {
                    const imageUrl = URL.createObjectURL(imageBlob);
                    setImageUrl(imageUrl);
                    setIsFetching(false);

                })
                .catch(err => {
                    setIsFetching(false);
                    setIsLoading(false);
                    console.log(err);
                })
        } else {
            await fetch('/api/generate')
                .then(response => response.blob())
                .then(imageBlob => {
                    console.log("1", isFetching);
                    const imageUrl = URL.createObjectURL(imageBlob);
                    setImageUrl(imageUrl);
                    setIsFetching(false);

                })
                .catch(err => {
                    setIsFetching(false);
                    setIsLoading(false);
                    console.log(err);
                })
        }
    }

    const addImgOnTshirt = () => {
        new fabric.Image.fromURL(imageUrl, img => {
            img.set({

                scaleX: 0.3,
                scaleY: 0.3
            });
            if (canvasObj.getObjects().length > 1) {
                canvasObj.remove(canvasObj.item(1));
            }
            canvasObj.add(img);
            canvasObj.centerObject(img);
            canvasObj.renderAll();
        });
    }

    async function generateAndAddImage() {
        await generateImage();
        addImgOnTshirt();
    }

    const canvasImageRef = useCallback(node => {
        if (node !== null) {
            if (node.getMyState() !== canvasImage) {
                if (node.getMyState() === "BT") {
                    setCanvasImage("BT");
                }
                else {
                    setCanvasImage("WH");
                }
            }
            else {
                setCanvasImage("BT");
            }
        }
    }, []);;



    useEffect(() => {
        const canvas = new fabric.Canvas("canvas", {
            width: 500,
            height: 500
        });

        if (canvasImage === "BT") {
            new fabric.Image.fromURL('/black_tshirt.png', img => {
                img.set({
                    selectable: false,
                    evented: false,
                    scaleX: 0.5,
                    scaleY: 0.5
                });
                canvas.add(img);
                if (canvasObj) {
                    new fabric.Image.fromURL(imageUrl, img => {
                        img.set({

                            scaleX: 0.3,
                            scaleY: 0.3
                        });

                        canvas.add(img);
                        canvas.centerObject(img);
                        canvas.renderAll();
                    });

                }
                setCanvas(canvas);

            });
        } else if (canvasImage === "WH") {
            new fabric.Image.fromURL('/white_hoodie.png', img => {
                img.set({
                    selectable: false,
                    evented: false,
                    scaleX: 0.85,
                    scaleY: 0.85
                });
                canvas.add(img);
                if (canvasObj) {
                    new fabric.Image.fromURL(imageUrl, img => {
                        img.set({

                            scaleX: 0.3,
                            scaleY: 0.3
                        });

                        canvas.add(img);
                        canvas.centerObject(img);
                        canvas.renderAll();
                    });

                }
                setCanvas(canvas);

            });
        }


    }, [canvasImage]);

    useEffect(() => {
        generateImage();
    }, []);

    useEffect(() => {
        if (imageUrl) {
            addImgOnTshirt();
        }
    }, [imageUrl]);




    return (

        <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh',
            paddingTop: '10vh',
        }}
        >
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginRight: '2rem',
            }}>
                <ThemeButtons ref={themeRef} />
                <canvas id="canvas" />
                <button style={styleButton}
                    onClick={generateAndAddImage}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    hidden={isFetching}>
                    <span style={{ color: "white" }}>Get new Image</span>
                </button>


            </div>
            <div>
                <ProductButtons ref={canvasImageRef}></ProductButtons>
                <BuyCard></BuyCard>
            </div>
        </div>
    );
};


export default Home;