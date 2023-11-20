var express = require('express');
var devicesRtr = express.Router();

const deviceCtrl=require('../../../server/modules/Controllers/Devices/devicesCtrl')

devicesRtr.get("/dropdownlist", deviceCtrl.dropdownlistCtrl);
devicesRtr.get("/devicesbasiclst",devicCtrl.devicebasiclstCtrl)
// devicesRtr.get("/devicesbasiclist", deviceCtrl.deviceslistCtrl);
devicesRtr.post("/devicesindetailed", deviceCtrl.devicesindetailedCtrl);
devicesRtr.post("/devicessensorslst", deviceCtrl.devicessensorslstCtrl);


module.exports=devicesRtr;