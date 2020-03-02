const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { promisify } = require('util')
const genSaltPromise = promisify(bcrypt.genSalt)
const hashPromise = promisify(bcrypt.hash)
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    userType: { type: String, default: "client" },
    avatar: { type: String }
})
UserSchema.pre("save", function (next) {
    const user = this
    if (!user.isModified("password")) return next();
    genSaltPromise(10)
        .then(salt => hashPromise(user.password, salt))
        .then(hash => {
            user.password = hash
            next()
        })
        .catch(err => { throw Error(err) })
})
const User = mongoose.model("User", UserSchema, "User")
module.exports = {
    UserSchema, User
}