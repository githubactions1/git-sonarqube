var express = require('express');
var healthRtr = express.Router();

const healthCtrl=require('../../../server/modules/Controllers/health/healthCtrl')

healthRtr.get("/memorylist", healthCtrl.memorylistCtrl);
healthRtr.get("/fanspeedlist", healthCtrl.fanspeedlistCtrl);
healthRtr.get("/currentlist", healthCtrl.currentlistCtrl);
healthRtr.get("/voltagelist", healthCtrl.voltagelistCtrl);
healthRtr.get("/powerlist", healthCtrl.powerlistCtrl);

module.exports=healthRtr;