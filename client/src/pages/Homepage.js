import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import API from "../utils/API";

function Homepage(){

    const [idQuery, setIdQuery] = useState("");
    const [redirect, setRedirect] = useState("");

    const handleIdInputChange = event => {
        event.preventDefault();
        setIdQuery(event.target.value);
    };

    const handleSearch = async function(event){
        event.preventDefault();

        const data = await API.getQuestion(idQuery);

        if(data.data[0] === undefined){
            alert("poll not found");
            setIdQuery("");
            return;
        }
        setRedirect(data.data[0].id);
    };

    return(
        <div>

            {redirect ? <Redirect to={`/results/${redirect}`}/> : ""}

            <h1 className="text-center mt-4 mb-4">Welcome to Everybody Votes</h1>

            {/* container */}
            <div className="container">

                <div className="row justify-content-center">

                    {/* create poll button */}
                    <Link to="/create">
                        <button className="btn btn-success" id="createPoll">Create a poll</button>
                    </Link>

                </div>

                <h2 className="text-center mt-4 mb-4">or search by id</h2>

                <div className="row justify-content-center">

                    <div className="input-group col-4 col-md-4 col-sm-6 col-xs-6">
                        <input type="text" className="form-control" value={idQuery} onChange={handleIdInputChange}></input>
                        <div className="input-group-append">
                            <button onClick={handleSearch} className="btn btn-outline-success">search</button>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    );

}

export default Homepage;