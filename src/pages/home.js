import React, { useState, useEffect, useRef, useCallback } from 'react';
import { fabric } from 'fabric';
import ThemeButtons from '../components/ThemeButtons';
import BuyCard from '../components/BuyCard';
import ProductButtons from '../components/ProductButtons';
import { useLocation } from 'react-router-dom';
import { Slider } from 'antd';

const Home = () => {
    const location = useLocation();

    const [imageUrl, setImageUrl] = useState(null);
    const [hovered, setHovered] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(null);
    const [canvasObj, setCanvasObj] = useState(null);
    const themeRef = useRef();
    const [canvasImage, setCanvasImage] = useState(null);
    const [canvasURL, setCanvasURL] = useState(null);
    const [isImageOpen, setIsImageOpen] = useState(false);
    const [radiusVal, setRadiusVal] = useState(100);
    const userImageRef = useRef(null);

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    const handleCanvasClick = () => {
        setIsImageOpen(!isImageOpen);
    };

    async function generateImage() {
        setIsLoading(true);
        setImageUrl(null);
        setIsFetching(true);

        const endpoint = themeRef.current.getMyState() === false ? '/api/generate/rock' : '/api/generate';
        
        try {
            const response = await fetch(endpoint);
            const imageBlob = await response.blob();
            const imageUrl = URL.createObjectURL(imageBlob);
            setImageUrl(imageUrl);
            setIsFetching(false);
        } catch (err) {
            setIsFetching(false);
            setIsLoading(false);
        }
    }

    const addImgOnTshirt = () => {
        new fabric.Image.fromURL(imageUrl, img => {
            img.set({
                scaleX: 0.3,
                scaleY: 0.3,
                clipPath: new fabric.Circle({
                    radius: Math.min(img.width * radiusVal / 100, img.height * radiusVal / 100),
                    originX: 'center',
                    originY: 'center',
                })
            });
            if (canvasObj.getObjects().length > 1) {
                canvasObj.remove(userImageRef.current);
            }
            canvasObj.add(img);
            canvasObj.centerObject(img);
            canvasObj.renderAll();
            userImageRef.current = img;
            var image = canvasObj.toDataURL("image/png");
            setCanvasURL(image);
        });
    }

    async function generateAndAddImage() {
        await generateImage();
        addImgOnTshirt();
    }

    const canvasImageRef = useCallback(node => {
        if (node !== null) {
            if (node.getMyState() !== canvasImage) {
                setCanvasImage(node.getMyState() === "BT" ? "BT" : "WH");
            }
        }
    }, []);

    useEffect(() => {
        const canvas = new fabric.Canvas("canvas", {
            width: 500,
            height: 500
        });

        const addBackgroundImage = (url, scaleX, scaleY) => {
            new fabric.Image.fromURL(url, img => {
                img.set({
                    selectable: false,
                    evented: false,
                    scaleX,
                    scaleY
                });

                if(userImageRef.current){
                    canvas.add(img);
                    canvas.add(userImageRef.current);
                    var image = canvas.toDataURL("image/png");
                    canvas.renderAll();

                    setCanvasURL(image)

                }else{
                    canvas.add(img);
                    var image = canvas.toDataURL("image/png");
                    canvas.renderAll();

                    setCanvasURL(image)

                }
                setCanvasObj(canvas);
                
            });
        };

        if (canvasImage === "BT") {
            addBackgroundImage('/black_tshirt.png', 0.5, 0.5);
        } else if (canvasImage === "WH") {
            addBackgroundImage('/white_hoodie.png', 0.85, 0.85);
        }
    }, [canvasImage]);

    useEffect(() => {
        if (userImageRef.current) {
            userImageRef.current.set({
                clipPath: new fabric.Circle({
                    radius: Math.min(userImageRef.current.width * radiusVal / 100, userImageRef.current.height * radiusVal / 100),
                    originX: 'center',
                    originY: 'center',
                })
            });
            canvasObj.renderAll();
            setCanvasObj(canvasObj);
            var image = canvasObj.toDataURL("image/png");
            setCanvasURL(image);
        }
    }, [radiusVal]);

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
            justifyContent: 'center',
            alignItems: 'center',
            height: '65vh',
            paddingTop: '8vh',
            marginLeft: '25%',
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginRight: '2rem',
            }}>
                <ThemeButtons ref={themeRef} />
                <div style={{ display: 'flex', flexDirection: 'row-reverse', marginRight: '6rem', alignItems: 'center' }}>
                    <canvas id="canvas" />
                    <div style={{ display: 'inline-block', height: 300, marginLeft: 70 }}>
                        <Slider vertical defaultValue={100} onChange={(value) => { setRadiusVal(value); }} />
                    </div>
                </div>
                <div style={{
                    display: 'flex',
                    gap: "1rem"
                }}>
                    <button className="generate-buttons"
                        onClick={generateAndAddImage}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        hidden={isFetching}>
                        <span>Get new Image</span>
                    </button>
                    <button className="generate-buttons"
                        onClick={handleCanvasClick}>
                        <span>Maximize Image</span>
                    </button>
                </div>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}>
                    <ProductButtons ref={canvasImageRef}></ProductButtons>
                </div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}>
                    <BuyCard canvasIMG={canvasImage} canvasImgURL={canvasURL}></BuyCard>
                </div>
            </div>
            {isImageOpen && (
                <div
                    style={{
                        backgroundColor: "rgba(115, 114, 114, 0.5)",
                        width: "100%",
                        height: "100%",
                        zIndex: 10,
                        top: 0,
                        left: 0,
                        position: "fixed",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <button aria-label="Close" onClick={() => {
                        setIsImageOpen(!isImageOpen)
                    }} style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "transparent", border: "none", fontSize: "3rem", cursor: "pointer" }}>x</button>
                    <img src={imageUrl} alt=""
                        style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                        }} />
                </div>
            )}
        </div>
    );
};

export default Home;
