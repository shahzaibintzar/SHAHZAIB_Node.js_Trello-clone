const express = require('express');
const router = express.Router();
const User = require('../models/userAuth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// signup routes API
router.post('/signup', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const userData = new User({
        name: req.body.name,
        email: req.body.email,
        password:  hashedPassword
    })

    try {
        const user = await userData.save();
        res.status(201).json({message: 'User saved successfully ' , user});
    } catch (error) {
        res.status(400).json({message: 'Error saving user', error});
    }

    
})

// login routes API
router.post('/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
    });
    if(!user) {
        return res.status(400).json({message: 'User not found'});
    }

    try {
        const userPassword = await bcrypt.compare(
            req.body.password,
            user.password 
        )

        console.log('userPassword', userPassword)

        if(!userPassword){
            return res.status(404).json({message: 'User incorrect Password'});
        }
            const token = jwt.sign({ id: user._id, admin: false,email:user.email }, process.env.SECRET);

              res.cookie("token", token,{ httpOnly: true });
            return res.status(404).json({message: 'User Logged In'});
    } catch (error) {
        res.status(400).json({message: 'Error logging in user', error});
    }
});

// log out routes API

router.post('/logout',async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({message: 'User successfully logged out'});
})

// get All users API
router.get('/user', async (req, res) => {
    const AllUsers = await User.find();
    res.status(200).json(AllUsers);
    console.log(AllUsers);
})


// get current user using jwt token API

router.get('/user/current', async (req, res) => {
    const token = req.cookies.token;
    if(!token) {
        return res.status(400).json({message: 'User not logged in'});
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        const user = await User.findById(decoded.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({message: 'User not logged in'});
    }
})

module.exports = router
