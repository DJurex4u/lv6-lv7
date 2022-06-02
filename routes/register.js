var express = require('express');
var methodOverride = require('method-override');
var router = express.Router();
var bodyParser = require('body-parser');
var  mongoose = require('mongoose'); 
    
router.route('/')
    .get(function (req, res, next) {
        const data = {
            "username": "",
            "email": "",
            "password": "",
            "confirmPassword": ""
        }
        res.render('register/index', {
            "data": data,
            "title": "Register",
        });
    })
    .post(function (req, res) {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;

        const data = {
            "username": username,
            "email": email,
            "password": password,
            "confirmPassword": confirmPassword
        }

        if (password == confirmPassword) 
        {
            mongoose.model('User').findOne({
                $or: [
                    { username: username },
                    { email: email },
                ]
            }, function (err, user) {
                if (err) {
                    return console.error(err);
                } else {
                    if (!user) 
                    {
                        mongoose.model('User').create({
                            username: username,
                            email: email,
                            password: password,
                        }, function (err, project) {
                            if (err) {
                                res.send("Error with database input.");
                            } else {
                                console.log('User registered: ' + username);
                                res.format({
                                    html: function () {                                        
                                        res.location("projects");                                        
                                        res.redirect("/projects");
                                    }
                                });
                            }
                        })
                    }
                }
            });
        }
    });

module.exports = router;
