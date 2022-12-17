import React from "react";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavButton,
    NavButtonLink
} from './navbarElements'

const Navbar = () => {
    return (
        <>
            <Nav>
                <NavLink to="/">
                    <img src={require('../../images/templogo1.png')} alt="" />
                </NavLink>

                <Bars />
                <NavMenu>
                    <NavLink to="/" activeStyle>
                        home
                    </NavLink>
                    <NavLink to="/aitee" activeStyle>
                        aitee
                    </NavLink>
                    <NavLink to="/profile" activeStyle>
                        profile
                    </NavLink>
                    <NavLink to="/signup" activeStyle>
                        sign up
                    </NavLink>
                </NavMenu>
                <NavButton>
                    <NavButtonLink to='/signin'>sign in</NavButtonLink>
                </NavButton>
            </Nav>
        </>
    );

}

export default Navbar