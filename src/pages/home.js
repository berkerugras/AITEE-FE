import React from 'react';
import Tee from '../3dmodel/test';

const Home = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '90vh',
            paddingTop: '10vh'
        }}
        >
            <Tee></Tee>
        </div>
    );
};


export default Home;