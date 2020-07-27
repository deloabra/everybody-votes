const path = require("path");
const router = require("express").Router();

//API Routes are not implemented yet. Uncomment code below to use them when they are

 const apiRoutes = require("./api-routes");

// // API Routes
 router.use("", apiRoutes);

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
