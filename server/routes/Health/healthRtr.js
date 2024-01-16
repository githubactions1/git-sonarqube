var express = require('express');
var healthRtr = express.Router();

const healthCtrl=require('../../../server/modules/Controllers/health/healthCtrl')

healthRtr.post("/memorylist", healthCtrl.memorylistCtrl);
healthRtr.post("/fanspeedlist", healthCtrl.fanspeedlistCtrl);
healthRtr.post("/currentlist", healthCtrl.currentlistCtrl);
healthRtr.post("/voltagelist", healthCtrl.voltagelistCtrl);
healthRtr.post("/powerlist", healthCtrl.powerlistCtrl);
healthRtr.post("/frequencylist", healthCtrl.frequencylistCtrl);
healthRtr.get("/statuslist", healthCtrl.statuslistCtrl);
healthRtr.post("/Temperaturelist", healthCtrl.TemperaturelistCtrl);
module.exports=healthRtr;