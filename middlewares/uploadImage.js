const multer = require('multer')
module.exports.uploadImage = (type) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `./upload/${type}s`)
        },
        filename: function (req, file, cb) {
            cb(null, `${Date.now()}-${file.originalname}`)
        }
    })

    const upload = multer({ storage: storage })
    console.log(upload)
    return upload.single(type)
}