import React, { useState, useEffect } from "react";
import './navbar.css';
import { Button } from "antd";

const Navbar = () => {
    const [showProfileButton, setShowProfileButton] = useState(false);

    const deleteLocalStorage = () => {
        localStorage.clear();
        window.dispatchEvent(new Event("storage"));

    }

    const isLoggedIn = () => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData && userData.token) {
            return <Button onClick={deleteLocalStorage}  style={{ marginLeft: '50%' }}>Logout</Button>

        }
    }
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        try {
            if (userData && userData.token) {
                setShowProfileButton(true);
            } else {
                setShowProfileButton(false);
            }
        } catch {
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
                    {isLoggedIn()}
                </div>
            </div>
        </>
    );
};

export default Navbar;
