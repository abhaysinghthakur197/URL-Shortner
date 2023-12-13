const express = require('express');
const { handleGenerateNewShortURL } = require('../controllers/url')
const router = express.Router();



// post
router.post("/",handleGenerateNewShortURL);



module.exports = router;