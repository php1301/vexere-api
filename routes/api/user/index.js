const express = require("express")
const userController = require('./controller')
const router = express.Router()
const { authenticate, authorize } = require('../../../middlewares/auth')
const { uploadImage } = require('../../../middlewares/uploadImage')
const { validateCreateUser } = require('../../../middlewares/validation/user/validate.createUser')

// router.get("/", userController.getUser)
// router.get("/:id", userController.getUserById)
router.post("/", validateCreateUser, userController.createUser)
router.post("/login", userController.login)
// router.put("/:id", userController.putUserById)
// router.patch("/:id", userController.updateUserById)
// router.delete("/:id", userController.deleteUser)
router.post(
    "/avatar", authenticate, authorize(["client", "admin"]), uploadImage("avatar"), userController.uploadAvatar
)
module.exports = router