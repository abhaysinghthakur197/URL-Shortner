const express = require('express');


// path 
const path = require('path')

const urlRoute = require('./routes/url');

const staticRouter = require('./routes/staticRouter');

// Route for user signup and login
const userRoute = require('./routes/user')

// To use the cookie in project
const cookieParser = require('cookie-parser')


// To restrict the user 
const {restrictToLoggedInUserOnly} = require('./middleware/auth')

// To show the url to login user of himself -> last in lec video
const {checkAuth} = require('./middleware/auth')
//  ******** //



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

// To use the cookie 
app.use(cookieParser());

// Before restricted
// app.use("/url", urlRoute);

// After restricted
app.use("/url", restrictToLoggedInUserOnly, urlRoute)

// For Sign up and login 
app.use("/user",userRoute);

// Before -> // For Frontend Static Pages
// app.use("/",staticRouter);

// last min -> to show only user url
app.use("/",checkAuth,staticRouter)



// get
app.get('/url/:shortId', async (req, res) => {
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

