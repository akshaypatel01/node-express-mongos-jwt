const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")

const auth = (req, res, next) => {
  try {
    let token = req.rawHeaders[1]
    
    if(token){
        token = token.split(" ")[1]
         const secret= process.env.secret_key
        let user= jwt.verify(token,secret )
        req.body.userId = user.id
       
        
    }else{
        res.status(401).json({message:"Unauthorised request"})
    }
    next()
   
  } catch (error) {
    console.log(error);
    res.status(401).json({message:"Unauthorised request :"+error})
  }
   
}

module.exports = auth