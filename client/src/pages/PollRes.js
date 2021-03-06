import React, { useState, useEffect } from "react";
import { useLocation, Redirect } from "react-router-dom";
import API from "../utils/API";

function PollRes() {

    const [showResults, setShowResults] = useState(false);
    const [castingVote, setCastingVote] = useState(false);
    const [questionData, setQuestionData] = useState();
    const [answerData, setAnswerData] = useState();
    const [voteData, setVoteData] = useState();
    const [selectedAnswer, setSelectedAnswer] = useState();
    const [parsedVotes, setParsedVotes] = useState();
    const [redirect, setRedirect] = useState("");

    const location = useLocation();
    const questionId = location.pathname.substring(location.pathname.indexOf("results/") + 8);

    //run on page load
    useEffect(() => {
        //location.pathname is /results/{id} and we want id
        //8 is length of results/ and we want the number after

        let mounted = true;

        API.getQuestion(questionId)
            .then(result => {
                setQuestionData(result.data[0]);
                if(result.data[0] === undefined){
                    mounted = false;
                    setRedirect("/");
                }
            });

        API.getAnswerChoices(questionId)
            .then(result => {
                if(mounted){
                    setAnswerData(result.data);
                }
            });

        // Check Local Storage to see if they can vote or just see results
        if(localStorage.everybodyVotesTracker){
            let localTemp = JSON.parse(localStorage.everybodyVotesTracker);
            if(arrayContains(localTemp, questionId)){
                setShowResults(true);
            }
        }
        else{
            localStorage.everybodyVotesTracker = JSON.stringify([]);
        }

        return () => mounted = false;

    }, []);

    //run when question or answerData get retrieved
    useEffect(() => {
        //do nothing if both questionData and answerData aren't loaded
        if(questionData === undefined || answerData === undefined){
            return;
        }
    }, [questionData, answerData]);

    //run when we move to results section to get votes
    useEffect(() => {

        setCastingVote(false);

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
        if(voteData === undefined){
            return;
        }
        const temp = parseVotes(voteData, answerData);
        setParsedVotes(temp);
    }, [voteData]);

    const handleRadioChange = event => {
        event.target.checked = true;
        setSelectedAnswer(event.target.id);
    };

    const handleCastVote = event => {
        event.preventDefault();
        setCastingVote(true);
        API.createVote(
            {
                questionId: questionId,
                choice: selectedAnswer
            }
        )
            .then(() => {
                setShowResults(true);
            });

        //add questionId to localstorage so they can't vote again
        let localTemp = JSON.parse(localStorage.everybodyVotesTracker);
        localTemp.push(parseInt(questionId));
        localStorage.everybodyVotesTracker = JSON.stringify(localTemp);
    }

    const handleViewResults = event => {
        event.preventDefault();
        setShowResults(true);
    }

    //--------HTML returns-----------

    //loading screen when not everything is loaded
    if(((questionData === undefined || answerData === undefined) && showResults === false) || (showResults === true && (voteData === undefined || parsedVotes === undefined)) || castingVote){
        return(
            <div>
                {redirect ? <Redirect to={"/"} />: ""}
                <h1 className="text-center mt-5">Loading</h1>
            </div>
        );
    }

    //voting screen
    if(showResults === false && questionData !== undefined && answerData !== undefined){
        return(
            <div className="container">
                
                {/* Question title */}
                <div className="row justify-content-center">
                    <h1 className="mt-5 mb-5">{questionData.question}</h1>
                </div>

                {/* Answer Choices */}
                {answerData.map((choice, index) => 
                    (<div key={index} className="row justify-content-center">
                        <div className="form-check col-1">
                            <input className="form-check-input" onChange={handleRadioChange} type="radio" name="answerChoices" id={index+1} value={`option${index+1}`}/>
                            <label className="form-check-label" htmlFor={index+1}>
                                {choice.choice}
                            </label>
                        </div>
                    </div>)
                )}

                <div className="row justify-content-center mt-5 mb-5">
                    <button className="castVote btn btn-success mr-5" onClick={handleCastVote}>Cast Vote</button>
                    <button className="viewResults btn btn-success" onClick={handleViewResults}> View Results</button>
                </div>

            </div>
        );
    }


    //results screen
    return(
        <div className="container">

            {/* Question title */}
            <div className="row justify-content-center">
                <h1 className="mt-5 mb-5">{questionData.question}</h1>
            </div>

            {answerData.map((choice, index) => (
                <div key={index} className="row justify-content-center">
                    <div className="col-8">
                        <h5>{choice.choice}</h5>

                        {/* bar illustrating voting percentage for the answer choice */}
                        <div className="mb-5">
                            <div className="progress">
                                <div className="progress-bar" role="progressbar" aria-valuenow={Math.round(parsedVotes[index] / voteData.length * 100)}
                                aria-valuemin="0" aria-valuemax="100" style={{width: Math.round(parsedVotes[index] / voteData.length * 100) + "%"}}>
                                    {Math.round(parsedVotes[index] / voteData.length * 100)}%
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            ))}
        </div>
    );

}

function parseVotes(voteData, answerData){
    let voteCounter = [];
    for(let i = 0; i < answerData.length; i++){
        voteCounter.push(0);
    }
    for(let i = 0; i < voteData.length; i++){
        voteCounter[voteData[i].choice -1]++;
    }
    return voteCounter;
}

function arrayContains(arr, value){
    let contains = false;
    for(let i in arr){
        if(i === value){
            contains = true;
        }
    }
    return contains;
}

export default PollRes;