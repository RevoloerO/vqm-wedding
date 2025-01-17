import React from "react";
import { Link } from "react-router-dom";

function Nav() {
    return (
        <nav className="navBar">
            <div className="container">
                <div className="row">

                </div>
                <Link to="/" className="Nav__brand">
                    <img src="logo.svg" className="Nav__logo" />
                </Link>
                <ul>
                <li><Link className="navLink" to="/path1">Home</Link></li>
                <li><Link className="navLink" to="/path2">Story</Link></li>
                <li class="has-dropdown">
                    <a href="services.html">Services</a>
                    <ul class="dropdown">
                        <li><a href="#">Web Design</a></li>
                        <li><a href="#">eCommerce</a></li>
                        <li><a href="#">Branding</a></li>
                        <li><a href="#">API</a></li>
                    </ul>
                </li>
                <li class="has-dropdown">
                    <a href="gallery.html">Gallery</a>
                    <ul class="dropdown">
                        <li><a href="#">HTML5</a></li>
                        <li><a href="#">CSS3</a></li>
                        <li><a href="#">Sass</a></li>
                        <li><a href="#">jQuery</a></li>
                    </ul>
                </li>
            </ul>
            </div>
            
        </nav>
    );
}

export default Nav;