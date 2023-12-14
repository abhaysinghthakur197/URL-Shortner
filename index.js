const express = require('express');


// path 
const path = require('path')

const urlRoute = require('./routes/url');

const staticRouter = require('./routes/staticRouter');

// mongodb connect
const { connectToMongoDB } = require('./connect');

// url 
const URL = require('./models/url');




const app = express();

const PORT = 8001;




// mongodb url
connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() => console.log('connect mongodb')).catch((e) => console.log(e));

// set the view engine to ejs
app.set('view engine', 'ejs');
// path of views page
app.set('views',path.resolve('./views'))

// Middleware - parse request in json format
app.use(express.json());

// Middleware - To pass the form data 
app.use(express.urlencoded({extended: false}));


app.use("/url", urlRoute);

// For Frontend Static Pages
app.use("/",staticRouter);

 


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

