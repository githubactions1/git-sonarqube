var express = require('express');
var dashboardRtr = express.Router();
var appRoot='/var/www/html/glits/code/nodejs/NMS_server'

const dashboardCtrl=require(appRoot + '/server/modules/Controllers/dashboard/dashboardCtrl')




dashboardRtr.get("/devices", dashboardCtrl.devicesCntrl);


module.exports=dashboardRtr;


