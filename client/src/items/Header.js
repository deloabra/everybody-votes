import React from "react";

function Header(){
    return(
        <div>
            <header className="App-header">
            </header>

            {/* navbar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-warning">

                {/* Add Home link to website name on navbar */}
                <a className="navbar-brand" href="index.html">Everbody Votes</a>

                {/* create navbar toggler icon for small screens */}
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* navbar links */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">

                        {/* create new list elements like this to add more links to navbar */}
                        <li className="nav-item active">
                            <a className="nav-link" href="index.html">test</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Header;