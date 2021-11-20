const jwt = require('jsonwebtoken')

const requireAuth = async (req, res, next) => {
    
    try {
      if(req.headers.authorization == null){
        return res.status(500).send({
          message : "No JWT Provided"
        })
      }
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;
        const JWT_SECRET = process.env.SECRET
    
        let decodedData;
    
        if (token && isCustomAuth) {      
          decodedData = jwt.verify(token, JWT_SECRET);
    
          req.userId = decodedData?.id;
        } else {
          decodedData = jwt.decode(token);
    
          req.userId = decodedData?.sub;
        }    
    
        next();
      } catch (error) {
        console.log(error);
      }
}

module.exports = {requireAuth}