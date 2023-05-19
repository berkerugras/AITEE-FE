import React from "react";
import './navbar.css';

const Navbar = () => {
    return (
        <>
            <div class="Nav">
                <div class="NavLink">
                    <img class="Image" src={require('../../images/logos/logo1.png')} alt="" />
                </div>

                <div class="Bars" />
                <div class="NavMenu">
                    <a class="NavLink" href='/home'>home</a>
                    <a class="NavLink" href='/aitee'>aitee</a>
                    <a class="NavLink" href='/profile'>profile</a>                    
                </div>
               
                <div class="NavButton">
                    <a class='NavButtonLink' href='/cart'>Cart</a>
                    <a class='NavButtonLink' href='/market' style={{marginLeft:'5%'}}>Marketplace</a>
                </div>
            </div>
        </>
    );

}

export default Navbar