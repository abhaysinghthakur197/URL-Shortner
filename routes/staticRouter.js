const express = require('express')

const URL = require('../models/url')
const router = express.Router();

router.get("/", async (req,res) =>{

    // last mint -> to show url of user only 
      if(!req.user) return res.redirect("/login")
      const userUrls = await URL.find({createdBy: req.user._id})
    //  ******* //
    // const allUrls = await URL.find({});
    return res.render("Home",{
    //    urls: allUrls
          urls: userUrls
    });
})

router.get("/signup", (req,res) => {
    return res.render("signup")
})


router.get("/login", (req,res) => {
    return res.render("login");
})

module.exports = router;