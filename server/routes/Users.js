const express = require("express")
const users = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const User = require("../models/User")
users.use(cors())

// Load input validation
const validateRegisterInput = require("../Validator/register");
const validateLoginInput = require("../Validator/login");

process.env.SECRET_KEY = 'secret'



users.post('/register', (req, res) => {

    User.findOne({ email: req.body.email }).then(user => {
        //form validation
        const { errors, isValid } = validateRegisterInput(req.body);

        // Check validation
      if (!isValid) {
        return res.json({error: errors});
      }

        if (user) {
            errors.email = "Email already exists"
            return res.json({ error: errors });
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
    //form validation
    const { errors, isValid } = validateLoginInput(req.body);

    // Check validation
  if (!isValid) {
    return res.json({error: errors});
  }

    const email = req.body.email;
    const password = req.body.password;
// Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      errors.email = "Email not found";
      errors.password = null
      console.log(res)
      return res.json({ error: errors });
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
          errors.email = null;
          errors.password = "Password Incorrect"
          return res.json({ error: errors});
      }
    });
  });
});
    

module.exports = users