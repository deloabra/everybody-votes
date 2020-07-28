const Router = require('express').Router();
const orm = require("../config/orm");

//API Routes for:
//finding a question
//creating a question
//creating answer choices
//creating a vote
//finding a vote


//find question
Router.get('/question/:questionId', (req, res) => {
    orm.getQuestionInfo(req.params.questionId, (result) => {
        res.status(200);
        res.send(result);
    });
});

//create question
Router.post('/api/createquestion', (req, res) => {
    orm.createQuestion(req.body.question, (result) => {
        res.status(201);
        res.send(result);
    });
});

//find answer choice
Router.get('/api/answerchoices/:questionId', (req, res) => {
    orm.getAnswerChoice(req.params.questionId, (result) => {
        res.status(200);
        res.send(result);
    });
});

//create answer choice
Router.post('/api/createanswerchoice', (req, res) => {
    orm.createAnswerChoice(req.body.questionId, req.body.choice, (result) => {
        res.status(201);
        res.send(result);
    });
});


//create vote


//find vote

module.exports = Router;