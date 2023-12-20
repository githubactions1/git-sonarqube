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
devicesRtr.post("/detailedportslist", deviceCtrl.detailedportslistCtrl);
devicesRtr.get("/allportslist", deviceCtrl.allportslistCtrl);
devicesRtr.post("/devicesportscount", deviceCtrl.devicesportscountCtrl);
devicesRtr.post("/idwiseportslist", deviceCtrl.idwiseportslistCtrl);
devicesRtr.get("/downportlist", deviceCtrl.downportslistCtrl);
devicesRtr.get("/upportlist", deviceCtrl.upportslistCtrl);
devicesRtr.get("/notpresentlink", deviceCtrl.notpresentlistCtrl);
devicesRtr.get("/Allstoragelist", deviceCtrl.AllstoragelistCtrl);
devicesRtr.get("/deletedevicedropdownlist", deviceCtrl.deletedevicedropdownlistCtrl);
devicesRtr.post("/deletedevice", deviceCtrl.deletedeviceCtrl);
devicesRtr.get("/notification", deviceCtrl.notificationCtrl);
devicesRtr.get("/detaildeviceuplist", deviceCtrl.detaildeviceuplistCtrl);
devicesRtr.get("/basicdeviceuplist", deviceCtrl.basicdeviceuplistCtrl);
devicesRtr.get("/detaildevicedownlist", deviceCtrl.detaildevicedownlistCtrl);
devicesRtr.get("/basicdevicedownlist", deviceCtrl.basicdevicedownlistCtrl);
module.exports=devicesRtr;