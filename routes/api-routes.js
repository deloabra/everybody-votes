const Router = require('express').Router();
const orm = require("../config/orm");

//API Routes for:
//finding a question
//creating a question
//creating answer choices
//creating a vote
//finding a vote

Router.get('/question/:questionId', (req, res) => {
    orm.getQuestionInfo(req.params.questionId, (result) => {
        res.send(result);
    });
});

module.exports = Router;