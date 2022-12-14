const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass){
        if(err){
            res.json({
                error: err
            })
        }
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPass
        })
        user.save()
        .then(response => {
            res.json({
                message: 'User Added Successfully '
            })
        })
        .catch(error => {
            res.json({
                message: 'An Error Occured!'
            })
        })
    })
}

const login = (req, res, next) => {
    var username = req.body.username
    var password = req.body.password

    User.findOne({$or: [{email:username}, {phone:username}]})
    .then(user => {
        if(user){      
            bcrypt.compare(password, user.password, function(err, result) {
                if(err){
                    res.json({
                        error: err
                    })
                }
                if(result){
                    let token =jwt.sign({name: user.name}, 'AZQ,PI)0(', {expiresIn: '1h'})
                    res.json({
                        message: 'Login Successful!',
                        token
                    })
                }else{
                    res.json({
                        message: 'Password does not matched'
                    })
                }
            })
        }else{
            res.json({
                message: 'No User Found!'
            })
        }
    })
}

module.exports = {
    register,login
}
