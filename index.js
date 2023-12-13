const express = require('express');

const urlRoute = require('./routes/url');

// url 
const URL = require('../URL_Shortner/models/url');

// mongodb connect
const { connectToMongoDB } = require('./connect');
const e = require('express');

const app = express();

const PORT = 8001;


// parse request in json format
app.use(express.json());

// mongodb url
connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() => console.log('connect mongodb')).catch((e) => console.log(e));
app.use("/url", urlRoute);




// get
app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
   const entry =  await URL.findOneAndUpdate({
        shortId
    }, 
    {
        $push: {
            visitHistory: {
                timestamp: Date.now()
            },
        },
    })

    res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started  at PORT ${PORT}`));

