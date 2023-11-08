var appRoot ='/home/NMS/actions-runner-backend/_work/nms_node/nms_node';
var dashboardMdl = require('../../models/dashboard/dashboardMdl');
var df = require( '../../../../utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);


/******************************************************************************************************
 * Controller : devicesCntrl
 * Description : this model shows the no.of devices in dashborad
 * 07-11-2023 - RajKumar 
 * 
 *******************************************************************************************************/
exports.devicesCntrl=(req,res)=>{
	dashboardMdl.devicesMdl(req.body,req.user).then(function(results){
	   console.log(results)
		df.formatSucessRes(req,res,results,cntxtDtls,'',{});
	}).catch(function(error){
	   console.log(error)
		df.formatErrorRes(req,res,error,cntxtDtls,'',{});
	} );
}

/*****************************************************************************
* Function : portsCntrl
* Description : this model shows the no.of ports in dashborad
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.portsCntrl=(req,res)=>{
   dashboardMdl.portsMdl(req.body,req.user).then(function(results){
	  console.log(results)
	   df.formatSucessRes(req,res,results,cntxtDtls,'',{});
   }).catch(function(error){
	  console.log(error)
	   df.formatErrorRes(req,res,error,cntxtDtls,'',{});
   });
}

/*****************************************************************************
* Function : sensorsCntrl
* Description : this model shows the no.of Sensors in dashborad
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.sensorsCntrl=(req,res)=>{
   dashboardMdl.sensorsMdl(req.body,req.user).then(function(results){
	  console.log(results)
	   df.formatSucessRes(req,res,results,cntxtDtls,'',{});
   }).catch(function(error){
	  console.log(error)
	   df.formatErrorRes(req,res,error,cntxtDtls,'',{});
   });
}
 /*****************************************************************************
* Function : statusesCntrl
* Description : this model shows the statuses on devices in dashborad
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.statusesCntrl=(req,res)=>{
	dashboardMdl.statusesMdl(req.body,req.user).then(function(results){
	   console.log(results)
		df.formatSucessRes(req,res,results,cntxtDtls,'',{});
	}).catch(function(error){
	   console.log(error)
		df.formatErrorRes(req,res,error,cntxtDtls,'',{});
	});
}