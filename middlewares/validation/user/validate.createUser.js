const validator = require('validator')
const _ = require('lodash')
// package Joi
const { User } = require('../../../models/User')
module.exports.validateCreateUser = async (req, res, next) => {
    let errors = {}
    //validate
    const email = _.get(req, "body.email", "")
    const password = _.get(req, "body.email", "")
    const password2 = _.get(req, "body.email", "")
    const fullName = _.get(req, "body.email", "")
    //email
    //email === " errors.email = "Email is required"
    //email exist === errors.email ="Email exist"
    // dung dinh dang
    //email hop le ==> pass qua
    if (validator.isEmpty(email)) {
        errors.email = "Email is required"
    }
    else {
        const user = await User.findOne({ email })
        if (user) {
            errors.email = "email exist"
        }
        else if (!validator.isEmail(email)) {
            errors.email = "not an email format"
        }
    }
    //password
    if (validator.isEmpty(password)) {
        errors.password = "password is require"
    }
    else if (!validator.isLength(password, { min: 8 }))
        errors.password = "password must have at least 8 character"
    if (validator.isEmpty(password2)) {
        errors.password2 = "Confirmed password is required"
    }
    else if (!validator.equals(password, password2)) {
        errors.password2 = "password must match"
    }
    //fullname
    if (validator.isEmpty(fullName)) {
        errors.fullName = "fullName is Required"
    }
    // return {
    //     isValid: _.isEmpty(errors)
    // }

    console.log(errors)
    const isValid = _.isEmpty(errors)
    console.log(isValid)
    if (isValid) return next()
    res.status(400).json(errors)
}