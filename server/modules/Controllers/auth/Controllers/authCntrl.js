var appRoot ='/home/nms-backend/actions-runner/_work/nms_node/nms_node';
var authMdl = require('../Models/authMdl');
var df = require( '../../../../../utils/dflower.utils');
var dashboardMdl = require('../../../models/dashboard/dashboardMdl');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var jwt=require('jsonwebtoken')




/******************************************************************************************************
 * Controller : Login
 * Description : Login API fro NMS
 * 02-11-2023 - RajKumar 
 * 
 *******************************************************************************************************/
// exports.loginCntrl = function (req, res) {
//     fnm = "login";
//     // Check if 'req.body' exists and 'req.body.data' exists within it
//     if (req.body ) {
//         var req_body = req.body ? req.body: req.body.data;
//         console.log(req_body); // Log the request body to check its structure
//         authMdl.loginMdl(req_body)
//             .then(function (usrDtls) {
//                 console.log('errrrrrrrrrrrrrrrrrrrrrrrrrrrrr1111222222222');                    
//                 console.log(usrDtls.length,'eeeeeeeeeeeeeeeeeeeeeeeee');       
//                 if (usrDtls && usrDtls.length === 0) {
//                     let error = 'Please check your Credentials';
//                   return df.formatloginErrorRes(req, res, error, cntxtDtls, fnm, {error_status: 400,err_message : "Please check your Credentials"});
//                 }
//                 if (!usrDtls || usrDtls === undefined){
//                 let error = 'Please check your Credentials';
//                 return df.formatloginErrorRes(req, res, error, cntxtDtls, fnm, {error_status: 400,err_message : "Please check your credentials"}); 
//                 }
//                  else {
    
//                     return df.formatSucessRes(req, res, usrDtls, cntxtDtls, fnm, {});
//                 }
//                     data.user = payload;
//                     var accessToken = jwt.sign(payload, { expiresIn: '3h' , algorithm: 'HS256'} ); //{ algorithm: 'HS256'});
//                     req.user = payload;
//                     data.token = accessToken;
//                     res.setHeader('x-access-token', accessToken);
//                     //operations.record('lgn_ct');
//                     df.formatSucessRes(req, res, data, cntxtDtls, fnm, {});              
                            
//             });
//     } else {
//         // Handle the case where 'req.body' or 'req.body.data' is not defined
//         let error = 'Request body or data is missing';
// 		console.log()
//         df.formatloginErrorRes(req, res, error, cntxtDtls, fnm, {});
//     }
// }
exports.loginCntrl = function(req, res){
    fnm = "loginCntrl"
    var privateKey = 'Networkmanagement';
    req_body = req.body ? req.body : req.body.data;
    authMdl.loginMdl(req_body).then(function (usrDtls) {
        if (usrDtls && usrDtls.length < 0) {
			let error = 'no data found'
             return df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        } else {
            return usrDtls;
        }
    }).then((usrDtls) => {
        if (usrDtls != undefined && usrDtls.length > 0) {
            var data = {};
            //console.log(usrDtls)
            let payload;
			//var accessToken = jwt.sign(payload, privateKey, { expiresIn: '3h' , algorithm: 'HS256'} ); //{ algorithm: 'HS256'});
            payload = Object.assign({}, usrDtls[0], {
                app: req_body.app,
                cmpnt_id: req_body.cmpnt_id,
                //prt_in: usrDtls.login_details.prt_in,
                //caf_in: usrDtls.login_details.caf_in,
                //user_id: usrDtls.login_details.mrcht_usr_id,
            });
            data.user = payload;
            var accessToken = jwt.sign(payload,privateKey, { expiresIn: '2h' , algorithm: 'HS256'} ); //{ algorithm: 'HS256'});
            console.log(accessToken,'tokeennnnnnnn')
            req.user = payload;
			data.token = accessToken;
            res.setHeader('x-access-token', accessToken);
            //operations.record('lgn_ct');
            df.formatSucessRes(req, res, data, cntxtDtls, fnm, {});
        } else {
            df.formatErrorRes(req, res, false, cntxtDtls, fnm, {});
        }
    })
      }

/******************************************************************************************************
 * Controller : register
 * Description : register API 
 * 02-11-2023 - RajKumar 
 * 
 *******************************************************************************************************/

exports.registerCntrl = function(req,res){ 
    var fnm = "registerCntrl"
    var req_body = req.body ? req.body: req.body.data; 
    const string= req_body.user_email.toString()
    console.log(string)
    const emailstring=string.endsWith("@gmail.com")
    console.log(emailstring)  
    if( emailstring==true && req.body.user_password.length>=7){
        console.log("if string 1")
        authMdl.loginMdl(req_body)
            .then(function (usrDtls) {  
                console.log(usrDtls,'user details')    
                console.log(usrDtls.first_name,'user details') 
                console.log(usrDtls.length,'lengthhhh')
                if (usrDtls && usrDtls.length === 1) {
                    let error = 'Your Email  is Already Existed';
                    df.formatSucessRes(req, res, error, cntxtDtls, fnm, {});
                //   return df.formatloginErrorRes(req, res, error, cntxtDtls, fnm, {error_status: 400,err_message : "Your Email is Already Existed"});
                }
                
                if(usrDtls && usrDtls.length === 0){
                    authMdl.registerMdl(req_body).then(function(usrDtls){
                        df.formatSucessRes(req, res, usrDtls, cntxtDtls, fnm, {});
                    })         
                }

            })
        
    }
    else{
        let errors = 'Password Must be 8character';
         return df.formatSucessRes(req, res, errors, cntxtDtls, fnm, {});
        // return df.formatloginErrorRes(req, res, error, cntxtDtls, fnm, {error_status: 400,err_message : "Your Email is Already Existed"});
    } 
 }

 // /***************************************************************************
// * Function : userroleslistCtrl
// * Description : this model gives the list of a sensorslst 
// * Arguments : callback function
// * 04-11-2023 - RajKumar
// ******************************************************************************/
exports.userroleslistCtrl=(req,res)=>{
	authMdl.userroleslistMdl(req.body,req.user).then(function(results){
	   console.log(results)
		df.formatSucessRes(req,res,results,cntxtDtls,'',{});
	}).catch(function(error){
	   console.log(error)
		df.formatErrorRes(req,res,error,cntxtDtls,'',{});
	});
}

// /***************************************************************************
// * Function : userdetailsCtrl
// * Description : this model gives the list of a sensorslst 
// * Arguments : callback function
// * 04-11-2023 - RajKumar
// ******************************************************************************/
exports.userdetailsCtrl=(req,res)=>{
	authMdl.userdetailsMdl(req.body,req.user).then(function(results){
	   console.log(results)
		df.formatSucessRes(req,res,results,cntxtDtls,'',{});
	}).catch(function(error){
	   console.log(error)
		df.formatErrorRes(req,res,error,cntxtDtls,'',{});
	});
}



