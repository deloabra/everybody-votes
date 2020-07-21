const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//static assets
if (process.env.NODE_ENV === "production") {
    app.use(express.static("build"));
}
else{
    app.use(express.static("client"));
}
//define API routes here


//define send main page
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "./build/index.html"));
});

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});