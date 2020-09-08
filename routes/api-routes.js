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
    orm.createAnswerChoice(req.body.questionId, req.body.choiceNum, req.body.choice, (result) => {
        res.status(201);
        res.send(result);
    });
});


//create vote
Router.post('/api/createvote', (req, res) => {
    //   0 (ZERO) parameter is a placeholder for the ip, which is not implemented yet
    orm.createVote(req.body.questionId, req.body.userIp, req.body.choice, (result) => {
        res.status(201);
        res.send(result);
    });
});


//find all votes for a question
Router.get("/api/getvotes/:questionId", (req, res) => {
    orm.getVotesByQuestion(req.params.questionId, (result) => {
        res.status(200);
        res.send(result);
    });
});


//TO DO - find a vote for a question AND ip - for when we only allow one vote per ip per question

module.exports = Router;