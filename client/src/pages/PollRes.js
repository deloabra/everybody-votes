import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import API from "../utils/API";

function PollRes() {

    const [showResults, setShowResults] = useState(false);
    const [questionData, setQuestionData] = useState();
    const [answerData, setAnswerData] = useState();
    const [voteData, setVoteData] = useState();

    const location = useLocation();
    const questionId = location.pathname.substring(location.pathname.indexOf("results/") + 8);

    //run on page load
    useEffect(() => {
        //location.pathname is /results/{id} and we want id
        //8 is length of results/ and we want the number after

        API.getQuestion(questionId)
            .then(result => {
                setQuestionData(result.data[0]);
            });

        API.getAnswerChoices(questionId)
            .then(result => {
                setAnswerData(result.data);
            });


    }, []);

    //run when question or answerData get retrieved
    useEffect(() => {

        //do nothing if both questionData and answerData aren't loaded
        if(questionData === undefined || answerData === undefined){
            return;
        }

        console.log(questionData);
        console.log(answerData);
    }, [questionData, answerData]);

    //run when we move to results section to get votes
    useEffect(() => {

        if(showResults === false){
            return;
        }

        API.getVotes(questionId)
            .then(results => {
                setVoteData(results.data);
            });
    }, [showResults]);

    //run when votes are updated
    useEffect(() => {
        console.log(voteData);
    }, [voteData]);

    //--------HTML returns-----------

    //loading screen when not everything is loaded
    if(((questionData === undefined || answerData === undefined) && showResults === false) || (showResults === true && voteData === undefined)){
        return(
            <div>
                <h1 className="text-center mt-5">Loading</h1>
            </div>
        );
    }

    //voting screen
    if(showResults === false){
        return(
            <div>
                
            </div>
        );
    }


    //results screen
    return(
        <div></div>
    );

}

export default PollRes;