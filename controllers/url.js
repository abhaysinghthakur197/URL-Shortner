const shortid = require("shortid");

const URL = require('../models/url')


async function handleGenerateNewShortURL(req,res) {

     const body = req.body;
     if(!body.url) return res.status(400).json({error:'error loading url'});

     const shortID = shortid();
     await URL.create({
        shortId:shortID,
        redirectURL: body.url,
        visitHistory:[],
     });
     
    //  Before adding frontend return shortId in json format
    //  return res.json({id: shortID});

    // After adding frontend
    return res.render("Home", {
    id: shortID
    })
}

async function handleTotalClicksAnalytics(req,res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({
        shortId,
    });
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}

module.exports = {
    handleGenerateNewShortURL,
    handleTotalClicksAnalytics,
}