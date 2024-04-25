//imports
import React from 'react';
import { Link } from "react-router-dom";
import "@fontsource/itim"
import "./navbar.css"

//images for navbar
const logo = require('../images/uflogo.png')
const logo2 = require('../images/account.png')
const logo3 = require('../images/announcement.png')


const Navbar = () => {

    //create links to pages with images as buttons
    function account() {
        return <>
            <span className="logo">
                <Link to="/"><img src={logo} alt="" /></Link>
            </span>
            <span className="account">
                <Link to="/announcement"><img src={logo3} alt=""/></Link>
                <Link to="/account"><img src={logo2} alt="" /></Link>
            </span>
        </>
    }

    //render navbar to webpage
    return (
        <header>
            <nav>
                {account()}
            </nav>
        </header>
    );
}
export default Navbar;