require('dotenv').config()
const jwt = require('jsonwebtoken');

const authmiddleware = (req,res,next)=>{
    const token = req.cookies.token;
    if(!token) return res.json("token not found");
     try {
        const decode = jwt.verify(token,process.env.JWT_SECRETKEY)
        req.user = decode
        next()
    } catch (error) {
        return res.json(error)
     }
}


const checkRole = (role) =>(req,res,next)=>{
    if(!role.includes(req.user.role)){
        return res.status(403),json({msg:"Access denied"})
    }
    next();
}


const generateToken = (user)=>{
    const payload = {
        id: user.id,
        name: user.name,
        email:user.email,
        role:user.role
    }
    const token = jwt.sign(payload,process.env.JWT_SECRETKEY,{
        expiresIn:'2d'
    })
    return token;
}



module.exports = {
    generateToken,
    checkRole,
    authmiddleware
}