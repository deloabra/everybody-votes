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
//define API routes here
app.get('/question/:questionId', (req, res) => {
    orm.getQuestionInfo(req.params.questionId, (result) => {
        res.send(result);
    });
});

//define send main page
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "./build/index.html"));
});

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});