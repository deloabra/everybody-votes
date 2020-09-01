import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import API from "../utils/API";

function PollRes() {

    const [location, setLocation] = useState(useLocation());

    useEffect(() => {
        console.log(location.pathname.substring(9));
    }, []);

    return(
        <div></div>
    );

}

export default PollRes;