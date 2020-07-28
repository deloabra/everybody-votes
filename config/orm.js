var connection = require("./connection");

var orm = {
    getQuestionInfo: function(questionId, cb){
        var queryString = "SELECT * FROM question WHERE id = ?;";
        connection.query(queryString, [questionId], function(err, res){
            if(err){
                throw err;
            }
            cb(res);
        });
    },

    createQuestion: function(createdQuestion, cb){
        var queryString = "INSERT INTO question (question) values (?);";
        connection.query(queryString, [createdQuestion], (err, res) => {
            if(err){
                throw err;
            }
            cb(res);
        });
    },

    getAnswerChoice: function(questionId, cb){
        var queryString = "SELECT * FROM answerchoice where questionId = ?";
        connection.query(queryString, [questionId], (err, res) => {
            if(err){
                throw err;
            }
            cb(res);
        });
    },

    createAnswerChoice: function(questionId, choice, cb){
        var queryString = "INSERT INTO answerchoice (questionId, choice) VALUES (?, ?)";
        connection.query(queryString, [questionId, choice], (err, res) => {
            if(err){
                throw err;
            }
            cb(res);
        });
    },

    createVote: function(questionId, ip, choice, cb){
        var queryString = "INSERT INTO vote (questionId, ip, choice) VALUES (?, ?, ?)";
        connection.query(queryString, [questionId, ip, choice], (err, res) => {
            if(err){
                throw err;
            }
            cb(res);
        });
    },

    //get all votes for a question
    getVotesByQuestion: function(questionId, cb){
        var queryString = "SELECT * FROM vote WHERE questionId = ?";
        connection.query(queryString, [questionId], (err, res) => {
            if(err){
                throw err;
            }
            cb(res);
        });
    },

    //get a vote for a specific question with a specific id(to check if it exists)
    //unused and untested
    getVoteByIp: function(questionId, ip, cb){
        var queryString = "SELECT * FROM vote WHERE questionId = ? AND ip = ?"
        connection.query(queryString, [questionId, ip], (err, res) => {
            if(err){
                throw err;
            }
            cb(res);
        });
    }
}

module.exports = orm;