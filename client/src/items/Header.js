import React from "react";
import { Link } from "react-router-dom";

function Header(){
    return(
        <div>
            <header className="App-header">
            </header>

            {/* navbar */}
            <nav className="navbar navbar-expand-lg navbar-light">

                {/* Add Home link to website name on navbar */}
                <Link to="/">
                    <a className="navbar-brand">Everybody Votes</a>
                </Link>

                {/* create navbar toggler icon for small screens */}
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* navbar links */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">

                        {/* create new list elements like this to add more links to navbar */}
                        <li className="nav-item active">
                            {/* Add list items here */}
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Header;