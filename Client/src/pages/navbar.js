import React from 'react';
import { Link } from "react-router-dom";
import "@fontsource/itim"
import "./navbar.css"

const logo = require('../images/uflogo.png')
const logo2 = require('../images/account.png')


const Navbar = () => {

    const isAuthenticatedUser = localStorage.getItem("isUserAuthenticated");

    function signout() {
        localStorage.removeItem("isUserAuthenticated")
        window.location.pathname = '/login'

    }


    function account() {
        if (isAuthenticatedUser) {
            return <>
            </>
        }

        return <>
            <span className="logo">
                <Link to="/"><img src={logo} alt="" /></Link>
            </span>
                <span className="account">
                <Link to="/account"><img src={logo2} alt="" /></Link>
            </span>

        </>
    }

    return (
        <header>
            <nav>
                
                {account()}
            </nav>
        </header>
    );
}
export default Navbar;