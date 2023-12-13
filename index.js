const express = require('express');

const urlRoute = require('./routes/url');

// mongodb connect
const { connectToMongoDB } = require('./connect');

// url 
const URL = require('./models/url');




const app = express();

const PORT = 8001;



// mongodb url
connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() => console.log('connect mongodb')).catch((e) => console.log(e));


// parse request in json format
app.use(express.json());


app.use("/url", urlRoute);

 


// get
app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry =  await URL.findOneAndUpdate({
        shortId,
    }, 
    {
        $push: {
            visitHistory: {
                timestamp: Date.now(),
            },
        },
    });
    res.redirect(entry.redirectURL);
});



app.listen(PORT, () => console.log(`Server Started  at PORT ${PORT}`));

