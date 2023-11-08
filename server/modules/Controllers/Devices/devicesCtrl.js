var appRoot ='/home/glits/code/nodejs/NMS_server';
var dashboardMdl = require('../../models/devices/devicesMdl');
var df = require( '../../../../utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);


/******************************************************************************************************
 * Controller : dropdownlistCtrl
 * Description : this model shows dropdown of a search filter
 * 06-11-2023 - RajKumar 
 * 
 *******************************************************************************************************/
 exports.dropdownlistCtrl=(req,res)=>{
	 dashboardMdl.dropdownlistMdl(req.body,req.user).then(function(results){
		console.log(results)
		 df.formatSucessRes(req,res,results,cntxtDtls,'',{});
	 }).catch(function(error){
		console.log(error)
		 df.formatErrorRes(req,res,error,cntxtDtls,'',{});
	 });
 }