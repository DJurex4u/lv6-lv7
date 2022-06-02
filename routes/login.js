var express = require('express');
var methodOverride = require('method-override');
var router = express.Router();
var bodyParser = require('body-parser');
var  mongoose = require('mongoose'); 

router.route('/')
    .get(function (req, res, next) {
        const data = {
            "email": "",
            "password": ""
        }
        res.render('login/index', {
            "data": data,
            "title": "Login",
        });
    })
    .post(function (req, res) {
        const email = req.body.email;
        const password = req.body.password;

        const data = {
            "email": email,
            "password": password
        }

        mongoose.model('User').findOne({ email: email, password: password }, function (err, user) {
                if (err) {
                    return console.error(err);
                } else {
                    if (user) {
                        req.session.uid = user.id;
                        res.redirect('/');
                    } 
                }
            }
        )
    });

module.exports = router;
