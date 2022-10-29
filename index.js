const jwt = require("jsonwebtoken");


rapid={

   generateAuthToken : (privatekey,expiry)=> {
   const token = jwt.sign({ _id: this._id }, privatekey, {
     expiresIn: expiry,
   });
   return token;
 },
  
 verifyToken : (privatekey) => {
   return (req, res, next) => {
  let authHeader = req.headers.token;
  if (authHeader) {
    authHeader = authHeader.replaceAll('"', "");
    const token = authHeader.split(" ")[1];
    jwt.verify(token,privatekey, (err, user) => {
      if (err) {
        console.log(err, "invalid token");
        res.status(403).json({ authError: true });
      } else {
        console.log("inside");
        next();
      }
    });
  } else {
    return res.status(401).json("you are not authenticated");
  }
}
 }


}

module.exports=rapid;