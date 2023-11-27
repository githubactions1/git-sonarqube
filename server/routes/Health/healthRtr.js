var express = require('express');
var healthRtr = express.Router();

const healthCtrl=require('../../../server/modules/Controllers/health/healthCtrl')

healthRtr.get("/memorylist", healthCtrl.memorylistCtrl);



module.exports=healthRtr;