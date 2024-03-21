const express = require("express");
const router = express();
const woodCtrl = require("../controllers/wood.js");
const auth = require("../middlewares/auth.js")
const multer = require("../middlewares/multer.js")

router.get("/readAll", auth, woodCtrl.readAll);
router.get("/:hardness", auth, woodCtrl.readByHardness);
router.post("/", auth,multer,woodCtrl.createWood);
router.put("/:id", auth, multer, woodCtrl.updateWood);
router.delete("/:id", auth, multer, woodCtrl.deleteWood);


module.exports = router;