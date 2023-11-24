var express = require('express');
var devicesRtr = express.Router();

const deviceCtrl=require('../../../server/modules/Controllers/Devices/devicesCtrl')

devicesRtr.get("/dropdownlist", deviceCtrl.dropdownlistCtrl);
devicesRtr.get("/devicesbasiclist",deviceCtrl.devicebasiclstCtrl)
// devicesRtr.get("/devicesbasiclist", deviceCtrl.deviceslistCtrl);
devicesRtr.post("/devicesindetailed", deviceCtrl.devicesindetailedCtrl);
devicesRtr.post("/devicessensorslst", deviceCtrl.devicessensorslstCtrl);
devicesRtr.post("/processorindetail", deviceCtrl.processorindetailCtrl);
devicesRtr.get("/devicebasiclistcount", deviceCtrl.devicebasiclstcountCtrl);
devicesRtr.get("/sensorslist", deviceCtrl.sensorslistCtrl);
module.exports=devicesRtr;