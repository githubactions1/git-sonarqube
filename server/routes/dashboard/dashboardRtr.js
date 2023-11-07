var express = require('express');
var dashboardRtr = express.Router();
var appRoot='/home/NMS/actions-runner-backend/_work/nms_node/nms_node/'

const dashboardCtrl=require(appRoot + '/server/modules/Controllers/dashboard/dashboardCtrl')




dashboardRtr.get("/devices", dashboardCtrl.devicesCntrl);


module.exports=dashboardRtr;


