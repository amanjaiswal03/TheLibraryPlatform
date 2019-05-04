const express = require("express")
const users = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const User = require("../models/User")
users.use(cors())

process.env.SECRET_KEY = 'secret'

users.post('/register', (req, res) => {

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.json({ error: "Email already exists" });
        } 
        const today = new Date()
        const newUser = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            created: today
        });
// Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
            });
        });
    });
});

users.post('/login', (req, res) => {

    const email = req.body.email;
    const password = req.body.password;
// Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.json({ error: "Email not found" });
    }
// Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          _id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email
        };
// Sign token
        jwt.sign(
          payload,
          process.env.SECRET_KEY,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.send(token);
          }
        );
      } else {
        return res
          .json({ error: "Password incorrect" });
      }
    });
  });
});
    

module.exports = users