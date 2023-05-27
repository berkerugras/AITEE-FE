import React, { useState, useEffect } from "react";
import './navbar.css';

const Navbar = () => {
    const [showProfileButton, setShowProfileButton] = useState(false);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData && userData.token) {
            setShowProfileButton(true);
        } else {
            setShowProfileButton(false);
        }
    }, []);

    useEffect(() => {
        const handleStorageChange = () => {
            const userData = JSON.parse(localStorage.getItem('userData'));
            if (userData && userData.token) {
                setShowProfileButton(true);
            } else {
                setShowProfileButton(false);
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <>
            <div className="Nav">
                <div className="NavLink">
                    <img className="Image" src={require('../../images/logos/logo1.png')} alt="" />
                </div>

                <div className="Bars" />
                <div className="NavMenu">
                    <a className="NavLink" href='/home'>home</a>
                    <a className="NavLink" href='/aitee'>aitee</a>
                    {showProfileButton ? (
                        <a className="NavLink" href="/profile">profile</a>
                    ) : (
                        <a className="NavLink" href="/signup">signup</a>
                    )}
                </div>

                <div className="NavButton">
                    <a className='NavButtonLink' href='/market' style={{ marginLeft: '5%' }}>Marketplace</a>
                </div>
            </div>
        </>
    );
};

export default Navbar;
