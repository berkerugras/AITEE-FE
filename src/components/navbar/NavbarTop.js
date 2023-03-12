import React from "react";
import './navbar.css';

const Navbar = () => {
    return (
        <>
            <div class="Nav">
                <div class="NavLink">
                    <img src={require('../../images/logos/logo1.png')} alt="" />
                </div>

                <div class="Bars" />
                <div class="NavMenu">
                    <a class="NavLink" href='/'>home</a>
                    <a class="NavLink" href='/aitee'>aitee</a>
                    <a class="NavLink" href='/profile'>profile</a>
                    <a class="NavLink" href='/signup'>sign up</a>
                    <a class='NavLink' href='/signin'>sign in</a>
                </div>
               
                <div class="NavButton">
                    <a class='NavButtonLink' href='/cart'>Checkout</a>
                </div>
            </div>
        </>
    );

}

export default Navbar