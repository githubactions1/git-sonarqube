var appRoot ='/home/nms-backend/actions-runner/_work/nms_node/nms_node';
var dashboardMdl = require('../../models/dashboard/dashboardMdl');
var df = require( '../../../../utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
const useragent = require('useragent');


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
 /*****************************************************************************
* Function : rolesaddCtrl
* Description : this model insert the roles in db
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.rolesaddCtrl=(req,res)=>{
	dashboardMdl.rolesaddMdl(req.body,req.user).then(function(results){
	   console.log(results)
		df.formatSucessRes(req,res,results,cntxtDtls,'',{});
	}).catch(function(error){
	   console.log(error)
		df.formatErrorRes(req,res,error,cntxtDtls,'',{});
	});
}
 /*****************************************************************************
* Function : roleslstCtrl
* Description : this model gives the list of a roles 
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.roleslstCtrl=(req,res)=>{
	dashboardMdl.roleslstMdl(req.body,req.user).then(function(results){
	   console.log(results)
		df.formatSucessRes(req,res,results,cntxtDtls,'',{});
	}).catch(function(error){
	   console.log(error)
		df.formatErrorRes(req,res,error,cntxtDtls,'',{});
	});
}
 /*****************************************************************************
* Function : sensorslstMdl
* Description : this model gives the list of a sensorslst 
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.sensorslstCtrl=(req,res)=>{
	dashboardMdl.sensorslstMdl(req.body,req.user).then(function(results){
	   console.log(results)
		df.formatSucessRes(req,res,results,cntxtDtls,'',{});
	}).catch(function(error){
	   console.log(error)
		df.formatErrorRes(req,res,error,cntxtDtls,'',{});
	});
}
 /*****************************************************************************
* Function : userdetailsCtrl
* Description : this model gives the list of a sensorslst 
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.userdetailsCtrl=(req,res)=>{
	dashboardMdl.userdetailsMdl(req.body,req.user).then(function(results){
	   console.log(results)
		df.formatSucessRes(req,res,results,cntxtDtls,'',{});
	}).catch(function(error){
	   console.log(error)
		df.formatErrorRes(req,res,error,cntxtDtls,'',{});
	});
}

 /*****************************************************************************
* Function : logindetailsCtrl
* Description : this model gives the list of a sensorslst 
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.logindetailsCtrl=(req,res)=>{

		const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
		// Get browser information
		const userAgentString = req.headers['user-agent'];
		const agent = useragent.parse(userAgentString);
		const dataa =agent.family+agent.major
		console.log(ip,'ippppppppppppppppppppppppppppppppp----------------------------------------------------------------------------');
		console.log(userAgentString,'userAgentStringgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg');
		console.log(agent.family,'userAgentStringgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg');
		console.log(agent.major,'userAgentStringgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg');
		console.log(agent.source,'userAgentStringgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg');
		dashboardMdl.logindetailsMdl(req.body,req.user,ip,dataa).then(function(results){	
		df.formatSucessRes(req,res,results,cntxtDtls,'',{});
	}).catch(function(error){
	   console.log(error)
		df.formatErrorRes(req,res,error,cntxtDtls,'',{});
	});
}

 /*****************************************************************************
* Function : logindetailslistCtrl
* Description : this model gives the list of a sensorslst 
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.logindetailslistCtrl=(req,res)=>{
	dashboardMdl.logindetailslistMdl(req.body,req.user).then(function(results){
	   console.log(results)
		df.formatSucessRes(req,res,results,cntxtDtls,'',{});
	}).catch(function(error){
	   console.log(error)
		df.formatErrorRes(req,res,error,cntxtDtls,'',{});
	});
}



