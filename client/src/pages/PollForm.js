import React, { useState } from 'react';
import API from "../utils/API";
import './PollForm.css';
//import { Pie } from 'react-chartjs-2';

function Homepage() {

  const [question, setQuestion] = useState("");
  const [answerChoices, setAnswerChoices] = useState(["", ""]);

  const handleQuestionChange = event => {
    event.preventDefault();

    setQuestion(event.target.value);
  }

  const handleAnswerChange = event => {
    event.preventDefault();

    let temp = [...answerChoices];
    temp[event.target.dataset.id] = event.target.value;

    setAnswerChoices(temp);
  }

  const deleteAnswerChoice = event => {
    event.preventDefault();

    let temp = [...answerChoices];
    temp.splice(event.target.dataset.id, 1);

    setAnswerChoices(temp);
  }

  const addAnswerChoice = event => {
    event.preventDefault();
    let temp = [...answerChoices];
    temp.push("");
    setAnswerChoices(temp);
  }

  const handleSubmit = async function(){

    console.log(window.location.href);
    //make sure there is a question
    if(question.length === 0){
      alert("Please add a question to create a poll.");
      return;
    }

    if(answerChoices.length < 2){
      alert("There must be at least 2 answer choices for this to be a poll.");
      return;
    }

    for(let i = 0; i < answerChoices.length; i++){
      if(answerChoices[i] === ""){
        alert("Make sure that no answer choices are blank.");
        return;
      }
    }

    //after everything is checked out

    const questionBody = {
      question: question
    };

    const questionData = await API.createQuestion(questionBody);

    const questionId = questionData.data.insertId;

    console.log(questionId + " -- " + typeof questionId);

    console.log("question saved");

    console.log("saving answer choices");

    for(let i = 0; i < answerChoices.length; i++){
      let choiceBody = {
        questionId: questionId,
        choiceNum: i,
        choice: answerChoices[i]
      };
      await API.createAnswerChoice(choiceBody);
    }

    console.log("saved all answer choices");
  }


  return (
    <div className="App">
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

    <div className="container justify-content-center">
      <h3>Question</h3>

      <input
      value={question}
      onChange={handleQuestionChange}
      ></input>

      {/* Create answer choices */}

      <h3>Answer Choices</h3>

      {answerChoices.map((choice, index) => (
        <div key={index} className="answerChoiceRow">
          <input
          data-id={index}
          value={choice}
          placeholder={"Answer Choice " + (index + 1)}
          onChange={handleAnswerChange}>
          </input>
          <button className="answerChoiceDelete btn btn-danger" data-id={index} onClick={deleteAnswerChoice}><span data-id={index} className="fas fa-times"/></button>
        </div>
      ))}

      <button className="addAnswerChoice btn btn-success" onClick={addAnswerChoice}>Add another answer choice</button>

      <button className="submitQuestion btn btn-warning" onClick={handleSubmit}>Create Poll</button>

    </div>
    </div>
  );
}

export default Homepage;
