var appRoot ='/home/glits/code/nodejs/NMS_server';
var healthMdl = require('../../models/Health/healthMdl');
var df = require( '../../../../utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);


/******************************************************************************************************
 * Controller : memorylistCtrl
 * Description : this model shows dropdown of a search filter
 * 06-11-2023 - RajKumar 
 * 
 *******************************************************************************************************/
 exports.memorylistCtrl=(req,res)=>{
    healthMdl.memorylistMdl(req.body,req.user).then(function(results){
		console.log(results)
		 df.formatSucessRes(req,res,results,cntxtDtls,'',{});
	 }).catch(function(error){
		console.log(error)
		 df.formatErrorRes(req,res,error,cntxtDtls,'',{});
	 });
 }

 /******************************************************************************************************
 * Controller : fanspeedlistCtrl
 * Description : this model shows dropdown of a search filter
 * 06-11-2023 - RajKumar 
 * 
 *******************************************************************************************************/
 exports.fanspeedlistCtrl=(req,res)=>{
    healthMdl.fanspeedlistMdl(req.body,req.user).then(function(results){
		console.log(results)
		 df.formatSucessRes(req,res,results,cntxtDtls,'',{});
	 }).catch(function(error){
		console.log(error)
		 df.formatErrorRes(req,res,error,cntxtDtls,'',{});
	 });
 }
  /******************************************************************************************************
 * Controller : currentlistCtrl
 * Description : this model shows dropdown of a search filter
 * 06-11-2023 - RajKumar 
 * 
 *******************************************************************************************************/
  exports.currentlistCtrl=(req,res)=>{
    healthMdl.currentlistMdl(req.body,req.user).then(function(results){
		console.log(results)
		 df.formatSucessRes(req,res,results,cntxtDtls,'',{});
	 }).catch(function(error){
		console.log(error)
		 df.formatErrorRes(req,res,error,cntxtDtls,'',{});
	 });
 }
  /******************************************************************************************************
   * Controller : voltagelistCtrl
  * Description : this model shows dropdown of a search filter
  * 06-11-2023 - RajKumar 
  * 
  *******************************************************************************************************/
   exports.voltagelistCtrl=(req,res)=>{
     healthMdl.voltagelistMdl(req.body,req.user).then(function(results){
         console.log(results)
          df.formatSucessRes(req,res,results,cntxtDtls,'',{});
      }).catch(function(error){
         console.log(error)
          df.formatErrorRes(req,res,error,cntxtDtls,'',{});
      });
  }