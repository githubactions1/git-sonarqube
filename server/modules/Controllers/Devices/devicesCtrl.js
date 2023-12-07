var appRoot ='/home/nms-backend/actions-runner/_work/nms_node/nms_node';
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
/******************************************************************************************************
  * Controller : devicebasiclstCtrl
 * Description : this will shoows the complete details of that device
 * 06-11-2023 - RajKumar 
 * 
 *******************************************************************************************************/
exports.devicebasiclstCtrl=(req,res)=>{
   dashboardMdl.devicebasiclstMdl(req.body,req.user).then(function(results){
      console.log(results)
       df.formatSucessRes(req,res,results,cntxtDtls,'',{});
   }).catch(function(error){
      console.log(error)
       df.formatErrorRes(req,res,error,cntxtDtls,'',{});
   });
}
/******************************************************************************************************
  * Controller : processorindetailCtrl
 * Description : this will shoows the complete details of that device
 * 06-11-2023 - RajKumar 
 * 
 *******************************************************************************************************/
exports.processorindetailCtrl=(req,res)=>{
    dashboardMdl.processorindetailMdl(req.body,req.user).then(function(results){
       console.log(results)
        df.formatSucessRes(req,res,results,cntxtDtls,'',{});
    }).catch(function(error){
       console.log(error)
        df.formatErrorRes(req,res,error,cntxtDtls,'',{});
    });
 }
 /******************************************************************************************************
  * Controller : devicebasiclstcountCtrl
 * Description : this will shoows the complete details of that device
 * 06-11-2023 - RajKumar 
 * 
 *******************************************************************************************************/
exports.devicebasiclstcountCtrl=(req,res)=>{
    dashboardMdl.devicebasiclstcountMdl(req.body,req.user).then(function(results){
       console.log(results)
        df.formatSucessRes(req,res,results,cntxtDtls,'',{});
    }).catch(function(error){
       console.log(error)
        df.formatErrorRes(req,res,error,cntxtDtls,'',{});
    });
 }
  /******************************************************************************************************
  * Controller : sensorslistCtrl
 * Description : this will shoows the complete details of that device
 * 06-11-2023 - RajKumar 
 * 
 *******************************************************************************************************/
exports.sensorslistCtrl=(req,res)=>{
    dashboardMdl.sensorslistMdl(req.body,req.user).then(function(results){
       console.log(results)
        df.formatSucessRes(req,res,results,cntxtDtls,'',{});
    }).catch(function(error){
       console.log(error)
        df.formatErrorRes(req,res,error,cntxtDtls,'',{});
    });
 }

/******************************************************************************************************
  * Controller : detailedportslistCtrl
 * Description : this will shoows the complete details of that device
 * 06-11-2023 - RajKumar 
 * 
 *******************************************************************************************************/
exports.detailedportslistCtrl=(req,res)=>{
    dashboardMdl.detailedportslistMdl(req.body,req.user).then(function(results){
       console.log(results)
        df.formatSucessRes(req,res,results,cntxtDtls,'',{});
    }).catch(function(error){
       console.log(error)
        df.formatErrorRes(req,res,error,cntxtDtls,'',{});
    });
 }

 /******************************************************************************************************
  * Controller : allportslistCtrl
 * Description : this will shoows the complete details of that device
 * 06-11-2023 - RajKumar 
 * 
 *******************************************************************************************************/
exports.allportslistCtrl=(req,res)=>{
    dashboardMdl.allportslistMdl(req.body,req.user).then(function(results){
       console.log(results)
        df.formatSucessRes(req,res,results,cntxtDtls,'',{});
    }).catch(function(error){
       console.log(error)
        df.formatErrorRes(req,res,error,cntxtDtls,'',{});
    });
 }
  /******************************************************************************************************
  * Controller : devicesportscountCtrl
 * Description : this will shoows the complete details of that device
 * 06-11-2023 - RajKumar 
 * 
 *******************************************************************************************************/
exports.devicesportscountCtrl=(req,res)=>{
    dashboardMdl.devicesportscountMdl(req.body,req.user).then(function(results){
       console.log(results)
        df.formatSucessRes(req,res,results,cntxtDtls,'',{});
    }).catch(function(error){
       console.log(error)
        df.formatErrorRes(req,res,error,cntxtDtls,'',{});
    });
 } 
   /******************************************************************************************************
  * Controller : idwiseportslistCtrl
 * Description : this will shoows the complete details of that device
 * 06-11-2023 - RajKumar 
 * 
 *******************************************************************************************************/
exports.idwiseportslistCtrl=(req,res)=>{
    dashboardMdl.idwiseportslistMdl(req.body,req.user).then(function(results){
       console.log(results)
        df.formatSucessRes(req,res,results,cntxtDtls,'',{});
    }).catch(function(error){
       console.log(error)
        df.formatErrorRes(req,res,error,cntxtDtls,'',{});
    });
 } 

/*****************************************************************************
* Function : downportslistCtrl
* Description : this model gives the list of a sensorslst 
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.downportslistCtrl=(req,res)=>{
	dashboardMdl.downportslistMdl(req.body,req.user).then(function(results){
	   console.log(results)
		df.formatSucessRes(req,res,results,cntxtDtls,'',{});
	}).catch(function(error){
	   console.log(error)
		df.formatErrorRes(req,res,error,cntxtDtls,'',{});
	});
}
