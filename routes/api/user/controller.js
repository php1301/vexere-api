const { User } = require("../../../models/User")
const { promisify } = require('util')
const bcrypt = require('bcrypt')
const _ = require('lodash')
// const genSaltPromise = promisify(bcrypt.genSalt)
// const hashPromise = promisify(bcrypt.hash)
const jwt = require('jsonwebtoken')
const jwtSign = promisify(jwt.sign)
module.exports.createUser = (req, res, next) => {
    const { email, password, fullName } = req.body
    // let newUser
    console.log(req.body)
    const newUser = new User({
        email, password, fullName
    })
    newUser.save()
        // return newUser.save()
        // User.findOne({ email })
        //     .then(user => {
        //         if (user) return Promise.reject({ message: "Email exist" })


        // bcrypt.genSalt(10, (err, salt) => {
        //     bcrypt.hash(password, salt, (err, hash) => {
        //         newUser.password = hash
        //         newUser.save()
        //             .then(user => res.status(200).json(user))
        //             .catch(err => res.status(500).json(err))

        //     })
        // })
        // return genSaltPromise(10)
        // })

        // .then(salt => hashPromise(password, salt))
        // .then(hash => {
        //     newUser.password = hash
        // return newUser.save()
        // })
        .then(user => res.status(200).json(user))
        .catch(err => res.status(500).json(err))
}
//update email, fullname, checknull
module.exports.updateUser = () => {

}
module.exports.updatePassword = () => {

}
//gui password moi ngau nghien va cho nguoi dung update
module.exports.resetPassword = () => {

}
//login (passport)
module.exports.login = (req, res, next) => {
    const { email, password } = req.body
    let user
    User.findOne({ email })
        .then(_user => {
            user = _user
            if (!_user) return Promise.reject({ message: "Email Not Exist" })
            return bcrypt.compare(password, _user.password)
        })
        .then(isMatched => {
            if (!isMatched) return Promise.reject({ message: "Wrong password" })
            // const payload = {
            //     email,
            //     userType: user.userType,
            //     fullName: user.fullName
            // }
            const payload = _.pick(user, ["_id", "email", "fullName", "userType"])
            // console.log(payload)
            return jwtSign(
                payload,
                "Cybersoft2020",
                { expiresIn: '1h' }
            )
            // res.status(200).json({ message: "Login succesfully" })
        })
        .then(token => res.status(200).json({
            message: "success", token
        }))
        .catch(err => res.status(500).json(err))
}
//upload avatar
module.exports.uploadAvatar = (req, res, next) => {
    console.log(req.file)
    const { _id } = req.user
    console.log(req.user)
    User.findById(_id)
        .then(user => {
            if (!user) return Promise.reject({ status: 404, message: "User not found" })
            user.avatar = req.file.path
            return user.save()
        })
        .then(user => res.status(200).json(user))
        .catch(err => res.status(500).json(err))
}