var express = require('express');
var router = express.Router();
var appRoot='/home/nms-backend/actions-runner/_work/nms_node/nms_node'
var authCtrl = require('../modules/Controllers/auth/Controllers/authCntrl');


router.use('/dashboard', require(appRoot + '/server/routes/dashboard/dashboardRtr'));
router.use('/devices', require('../../server/routes/devices/devicesRtr'));
router.use('/health', require('../../server/routes/Health/healthRtr'));
router.post("/login", authCtrl.loginCntrl);
// router.post("/register", authCtrl.registerCntrl);
router.post("/register", authCtrl.registerCntrl);


module.exports = router;
