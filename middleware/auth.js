
// Adding middleware to check the login user uid 

const { getUser } = require('../service/auth')

async function restrictToLoggedInUserOnly(req,res,next) {
   
     const userUid = req.cookies?.uid;
     console.log(userUid);
     if(!userUid) return res.redirect("/login");

     const user = getUser(userUid);
     console.log(user);

     if(!user) return res.redirect("/login");

     req.user = user;
     next();
}


// It is not enforcing you to logged in -> added in last mint of auth video
async function checkAuth(req,res,next) {
    
    const userUid = req.cookies?.uid;
    console.log(userUid);
    
    const user = getUser(userUid);
    console.log(user);

    req.user = user;
    next();
}

// ********* //

 
module.exports = {
    restrictToLoggedInUserOnly,
    checkAuth,
}