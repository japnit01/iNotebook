const jwt = require('jsonwebtoken');

const  fetchuser = (req,res,next)=>{
    const token = req.header('token');

    if(!token)
    {
        res.status(401).send({error:"Please authenticate using a vaild token"});
    }

    try
    {
        const data = jwt.verify(token,'shhhhh')
        req.user = data.id;
        // console.log(token)
        next();
    }
    catch(error)
    {
        res.status(401).send({error:"Please authenticate using a vaild token"});
    }
}

module.exports = fetchuser;