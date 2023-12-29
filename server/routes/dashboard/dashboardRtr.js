var express = require('express');
var dashboardRtr = express.Router();
var appRoot='/home/nms-backend/actions-runner/_work/nms_node/nms_node/'

const dashboardCtrl=require(appRoot + '/server/modules/Controllers/dashboard/dashboardCtrl')




dashboardRtr.get("/devices", dashboardCtrl.devicesCntrl);
dashboardRtr.get("/ports", dashboardCtrl.portsCntrl);
dashboardRtr.get("/sensors", dashboardCtrl.sensorsCntrl);
dashboardRtr.get("/statuses", dashboardCtrl.statusesCntrl);
dashboardRtr.post("/rolesadd", dashboardCtrl.rolesaddCtrl);
dashboardRtr.get("/roleslst", dashboardCtrl.roleslstCtrl);
dashboardRtr.get("/sensorslist", dashboardCtrl.sensorslstCtrl);
dashboardRtr.post("/rolesadd", dashboardCtrl.rolesaddCtrl);
dashboardRtr.post("/userdetails", dashboardCtrl.userdetailsCtrl);
dashboardRtr.post("/logindetails", dashboardCtrl.logindetailsCtrl);
dashboardRtr.post("/logindetailslist", dashboardCtrl.logindetailslistCtrl);




module.exports=dashboardRtr;


