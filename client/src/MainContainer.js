import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./items/Header";

function MainContentContainer(){



    return(
        <div>
            <Router>

                <Header/>
                
            </Router>
        </div>
    );
}

export default MainContentContainer;