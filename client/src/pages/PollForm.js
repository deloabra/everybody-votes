import React, { useState } from 'react';
import { Redirect } from "react-router-dom"
import API from "../utils/API";
import './PollForm.css';
//import { Pie } from 'react-chartjs-2';

function PollForm() {

  const [question, setQuestion] = useState("");
  const [answerChoices, setAnswerChoices] = useState(["", ""]);
  const [redirect, setRedirect] = useState("");

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

    for(let i = 0; i < answerChoices.length; i++){
      let choiceBody = {
        questionId: questionId,
        choiceNum: i,
        choice: answerChoices[i]
      };
      await API.createAnswerChoice(choiceBody);
    }


    alert("Question Created. Question id is " + questionId);
    setQuestion("");
    setAnswerChoices(["", ""]);
    setRedirect(questionId);

  }


  return (
    <div className="App">

    {redirect ? <Redirect to={`/results/${redirect}`}/> : ""}


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

export default PollForm;
