const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 8080;
const app = express();


//require routes folder to display pages and get info
const routes = require("./routes");

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//static assets
//server doesn't give react page if not in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static("/client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

//require routes
app.use(routes);

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});