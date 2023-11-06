var express = require('express');
var dashboardRtr = express.Router();
var approot='/var/www/html/glits/code/nodejs/NMS_server'
const dashboardCtrl=required(approot + '/server/modules/Controllers/dashboard/dashboardCtrl')




dashboardRtr.get("/devices", dashboardCtrl.devicesCntrl);


module.exports=dashboardRtr;


