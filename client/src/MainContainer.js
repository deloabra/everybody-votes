import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./items/Header";
import Homepage from "./pages/Homepage";
import PollForm from "./pages/PollForm";
import PollRes from "./pages/PollRes"

function MainContentContainer(){

    const [userIp, setUserIp] = useState("");

    const ip = require('ip');

    useEffect(() => {
        setUserIp(ip.address());
    });

    return(
        <div>
            <Router>

                {/* Header unused for now */}
                <Header/>

                <Switch>

                    <Route exact path="/create" component={PollForm} />

                    <Route path="/results/" render={(props) => (
                        <PollRes
                            {...props}
                            userIp={userIp}
                        />
                    )}/>

                    <Route component={Homepage} />

                </Switch>

            </Router>
        </div>
    );
}

export default MainContentContainer;