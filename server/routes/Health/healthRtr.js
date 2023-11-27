var express = require('express');
var healthRtr = express.Router();

const healthCtrl=require('../../../server/modules/Controllers/health/healthCtrl')

healthRtr.get("/memorylist", healthCtrl.memorylistCtrl);
healthRtr.get("/fanspeedlist", healthCtrl.fanspeedlistCtrl);
healthRtr.get("/currentlist", healthCtrl.currentlistCtrl);


module.exports=healthRtr;