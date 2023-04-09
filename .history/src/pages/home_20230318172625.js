import React from 'react';
import Tee from '../3dmodel/Tee';
import Teem from '../3dmodel/Tees';
import {useState, useEffect} from 'react';


const Home = () => {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
      fetch('/api/generate')
        .then(response => response.blob())
        .then(imageBlob => {
          const imageUrl = URL.createObjectURL(imageBlob);
          setImageUrl(imageUrl);
        });
    }, []);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '90vh',
            paddingTop: '10vh'
        }}
        >
            {/* <Tee></Tee> */}
            <Teem></Teem>
            <img src="ima"></img>
        </div>
    );
};


export default Home;