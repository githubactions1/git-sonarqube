var express = require('express');
var router = express.Router();
var appRoot='/var/www/html/glits/code/nodejs/NMS_server'
var authCtrl = require('../modules/Controllers/auth/Controllers/authCntrl');


router.use('/dashboard', require(appRoot + '/server/routes/dashboard/dashboardRtr'));
router.post("/login", authCtrl.loginCntrl);
// router.post("/register", authCtrl.registerCntrl);
router.post("/register", authCtrl.registerCntrl);


module.exports = router;