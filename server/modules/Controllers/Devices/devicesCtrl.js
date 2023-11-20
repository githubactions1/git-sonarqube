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
 /******************************************************************************************************
  * Controller : deviceslistCtrl
 * Description : this will shoows the devices list
 * 06-11-2023 - RajKumar 
 * 
 *******************************************************************************************************/
 exports.deviceslistCtrl=(req,res)=>{
	dashboardMdl.deviceslistMdl(req.body,req.user).then(function(results){
	   console.log(results)
		df.formatSucessRes(req,res,results,cntxtDtls,'',{});
	}).catch(function(error){
	   console.log(error)
		df.formatErrorRes(req,res,error,cntxtDtls,'',{});
	});
}
 /******************************************************************************************************
  * Controller : devicesindetailedCtrl
 * Description : this will shoows the complete details of that device
 * 06-11-2023 - RajKumar 
 * 
 *******************************************************************************************************/
 exports.devicesindetailedCtrl=(req,res)=>{
    dashboardMdl.devicesindetailedMdl(req.body,req.user).then(function(results){
       console.log(results)
        df.formatSucessRes(req,res,results,cntxtDtls,'',{});
    }).catch(function(error){
       console.log(error)
        df.formatErrorRes(req,res,error,cntxtDtls,'',{});
    });
}
/******************************************************************************************************
  * Controller : devicessensorslstCtrl
 * Description : this will shoows the complete details of that device
 * 06-11-2023 - RajKumar 
 * 
 *******************************************************************************************************/
exports.devicessensorslstCtrl=(req,res)=>{
    dashboardMdl.devicessensorslstMdl(req.body,req.user).then(function(results){
       console.log(results)
        df.formatSucessRes(req,res,results,cntxtDtls,'',{});
    }).catch(function(error){
       console.log(error)
        df.formatErrorRes(req,res,error,cntxtDtls,'',{});
    });
}