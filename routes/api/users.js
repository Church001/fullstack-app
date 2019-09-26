const express = require('express');
const bcrypt = require('bcryptjs');

// Load gravatar library
const gravatar = require('gravatar');

// Load User
const User = require('../../models/User')
const router = express.Router();

// @Router  GET /api/users/test
// @Desc    Tests users route
// @Access  Public route
router.get('/test', 
    (req, res) => res.json({msg:"User Works"})
)

// @Router  POST /api/users/register
// @Desc    Registers a user
// @Access  Public route
router.post('/register', (req, res) => {
    User.findOne({
        email: req.body.email
    })
    .then(user => {
        if(user){
            return res.status(400).json({email: "email already exists"})
        }
        else {
            const avatar = gravatar.url(req.body.email, {
                s: '200', // size
                r: 'pg', // rating
                d: 'mm' // default
            })
            const newUser = new User({
                name: req.body.name, 
                email: req.body.email,
                avatar: avatar,
                password: req.body.password
            })
            newUser.save()
            .then(user => {
                res.json(user)
            })
            .catch(err => {
                console.log(err)
            })
            // bcrypt.genSalt(10, (err, salt) => {
            //     bcrypt.hash(newUser, salt, (err, hash) => {
            //         if(err) console.log(err)
            //         newUser.password = hash
            //         newUser.save()
            //             .then(user => {
            //                 res.json(user)
            //             })
            //             .catch(err => {
            //                 console.log(err)
            //             })
            //     })
            // })
            
        }
    })
})

// @Router  POST /api/users/login
// @Desc    Logs in a user (returns JWToken)
// @Access  Public route
router.post('/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password
    
    // find User by Email
    User.findOne({email})
        .then( user => {
            // checking user availability
            if(!user){
                return res.status(404).json({email: "user not found"})
            }

            // check password
            // I could use bcrypt if it was working
            if(password === user.password){
                // we generate token here
                res.json({msg: "success"})
            }
            else {
                return res.status(400).json({password: "password incorrect"})
            }
        })
})
module.exports = router;