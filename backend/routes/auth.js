const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require("../models/user");
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchUser")

router.post('/', [
    body('email', 'Enter a valid email').isEmail(),
    body('name', 'Enter a valid name').isLength({ min: 5 }),
    body('password', 'Password must have 5 characters').isLength({ min: 5 }),
], async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user)
            return res.status(404).json({ error: "Sorry!! A user with this email id already exists" })

        const salt = await bcrypt.genSalt(10);
        const passgen = await bcrypt.hash(req.body.password, salt)
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: passgen
        })

        let token = jwt.sign({ id: user.id }, 'shhhhh');

        res.json({ token })
    }
    catch (error) {
        console.log(err)
        res.status(500).send('Some error occured')
    }
})


router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter password').exists()
], async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user)
            return res.status(404).json({ error: "Wrong email or password" })

        const checkingpassword = await bcrypt.compare(req.body.password, user.password);
        if (!checkingpassword)
            return res.status(404).json({ error: "Wrong email or password" })

        let token = jwt.sign({ id: user.id }, 'shhhhh');

        res.json({ token })
    }
    catch (error) {
        console.log(err)
        res.status(500).send('Internal server error')
    }


})

router.post("/getuser",fetchuser,async(req,res)=>{
    try
    {
        userId = req.user;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    }
    catch(error)
    {
        res.status(500).send({error:"Internal server error"});
    }
});

module.exports = router;
