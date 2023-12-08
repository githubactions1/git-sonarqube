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
module.exports=devicesRtr;