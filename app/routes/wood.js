const express = require("express");
const router = express();
const woodCtrl = require("../controllers/wood.js");
const auth = require("../middlewares/auth.js")

router.get("/readAll", auth, woodCtrl.readAll);
router.get("/:hardness", auth, woodCtrl.readByHardness);

module.exports = router;