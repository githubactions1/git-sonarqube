var express = require('express');
var devicesRtr = express.Router();

const deviceCtrl=require('../../../server/modules/Controllers/Devices/devicesCtrl')

devicesRtr.get("/dropdownlist", deviceCtrl.dropdownlistCtrl);



module.exports=devicesRtr;