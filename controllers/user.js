const User = require("../models/user");

// Adding uuid for user i.e user unique id
const {v4: uuidv4} = require('uuid')

// add service dairy
const {setUser} = require('../service/auth')

async function handleUserSignUp(req,res) {
    const {name,email,password} = req.body;

    await User.create({
        name,
        email,
        password
    });

    return res.redirect("/");
}

async function handleUserLogin(req,res) {
   const {email,password} = req.body;

  const user =  await User.findOne({email,password})

   if(!user)
     return res.render("login",{
     error: "Invalid username or password",
    })

    // if login is successful then these will generate a session id
    const sessionId = uuidv4();
    // set user an id
    setUser(sessionId,user);

    // return unique id of user in cookies
    res.cookie("uid",sessionId);
    return res.redirect("/");
}

module.exports = {
    handleUserSignUp,
    handleUserLogin
}