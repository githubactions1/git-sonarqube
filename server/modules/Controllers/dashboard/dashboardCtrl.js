var appRoot ='/home/glits/code/nodejs/NMS_server';
var dashboardMdl = require('../modules/models/dashboard/dashboardMdl');
var df = require( '../../../../../utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);


/******************************************************************************************************
 * Controller : devicesCntrl
 * Description : this model shows the no.of devices in dashborad
 * 06-11-2023 - RajKumar 
 * 
 *******************************************************************************************************/
 exports.devicesCntrl=(req,res)=>{
	 dashboardMdl.devicesMdl(req.body,req.user).then(function(results){
		 df.formatSuccessRes(req,res,results,cntxtDtls,'',{});
	 }).catch(function(error){
		 df.formatErrorRes(req,res,error,cntxtDtls,'',{});
	 });
 }