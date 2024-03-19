const express = require("express");
const router = express();
const userCtrl = require("../controllers/wood.js");

router.get("/list", userCtrl.list);

module.exports = router;