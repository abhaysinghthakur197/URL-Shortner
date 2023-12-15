const express = require('express')

const URL = require('../models/url')
const router = express.Router();

router.get("/", async (req,res) =>{
    const allUrls = await URL.find({});
    return res.render("Home",{
       urls: allUrls
    });
})

module.exports = router;