var express = require('express');
var router = express.Router();
var authCtrl = require('../modules/Controllers/auth/Controllers/authCntrl');



router.post("/login", authCtrl.loginCntrl);
// router.post("/register", authCtrl.registerCntrl);
router.post("/register", authCtrl.registerCntrl);


module.exports = router;