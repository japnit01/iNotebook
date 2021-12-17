const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require("../models/user");

// router.get('/',(req,res)=>{
//     console.log("hello");
// });

router.post('/',[
    body('email','Enter a valid email').isEmail(),
    body('name','Enter a valid name').isLength({ min: 5 }),
    body('password','Password must have 5 characters').isLength({ min: 5 }),
    ],async(req, res)=> {
    const errors = validationResult(req);

    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});
    } 

    let user = await User.findOne({email:req.body.email});
    if(user)
        return res.status(404).json({error:"Sorry!! A user with this email id already exists"})
    user = await User.create({
        name: req.body.name,
        email:req.body.email,
        password:req.body.password
    })
    // .then(user => res.json(user))
    // .catch(err=>{console.log(err)
    // res.json({error:'Enter a unique value',message:err.message})});

    req.json(user)
})

module.exports = router;
