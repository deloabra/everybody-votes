var connection = require("./connection");

var orm = {
    getQuestionInfo: function(questionId, cb){
        var queryString = "SELECT * FROM question WHERE id = ?";
        connection.query(queryString, [questionId], function(err, res){
            if(err){
                throw err;
            }
            cb(res);
        });
    }
}

module.exports = orm;