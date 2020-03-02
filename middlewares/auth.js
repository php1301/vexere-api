
const { jwtVerify } = require('../helpers/callback.helper')
module.exports.authenticate = (req, res, next) => {
    //token(header/query string)
    const token = req.header("token")
    if (!token) return res.status(401).json({
        message: "You must provide token"
    })
    jwtVerify(token, config.secretKey)
        .then(decoded => {
            if (decoded) {
                console.log(decoded)
                req.user = decoded
                return next()
            }
            return res.status(200).json({
                message: "token is valid"
            })
        })
}
module.exports.authorize = userTypeArray => (req, res, next) => {
    console.log(req.user)
    const { userType } = req.user
    if (userTypeArray.findIndex(elm => elm === userType) !== -1)
        return next()
    else return res.status(401).json({ message: "You dont have permission" })
}