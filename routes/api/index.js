const express = require("express");

const router = express.Router();

router.use("/stations", require("./station/index"))
router.use("/trips", require("./trip/index"))
router.use("/users", require("./user/index"))
router.use("/tickets", require("./ticket/index"))

module.exports = router;