const express = require('express');
const { handleGenerateNewShortURL,handleTotalClicksAnalytics } = require('../controllers/url')
const router = express.Router();



// post
router.post("/",handleGenerateNewShortURL);

// get total click
router.get("/analytics/:shortId",handleTotalClicksAnalytics)



module.exports = router;