const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../../config/keys').secretOrKey
// Load gravatar library
const gravatar = require('gravatar');
// Load User
const User = require('../../models/User')
const router = express.Router();
const passport = require('passport')

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
            // I could use bcrypt if it was working, but no
            if(password === user.password){// more like if bcrypt.compare checks out
                // we generate token here 
                const payload = {// generating the payload needed
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
                jwt.sign(
                    payload, 
                    secret, 
                    { expiresIn: 3600},
                    (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer '+ token
                        })
                    }
                    )
            }
            else {
                return res.status(400).json({password: "password incorrect"})
            }
        })
})
module.exports = router;