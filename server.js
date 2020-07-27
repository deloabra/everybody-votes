const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 8080;
const app = express();
const orm = require("./config/orm.js");

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//static assets
//maybe need to change to /client/build
if (process.env.NODE_ENV === "production") {
    app.use(express.static("build"));
}


//             define API routes here
//one to retrieve a question
//one to write a question
//one to create a vote
//one to check if a vote exists

//find a specific question to create a webpage around
//maybe change the questionId to a different parameter if needed
app.get('/question/:questionId', (req, res) => {
    orm.getQuestionInfo(req.params.questionId, (result) => {
        res.send(result);
    });
});

//write question


//create vote


//check vote

//define send main page
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "./build/index.html"));
});

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});