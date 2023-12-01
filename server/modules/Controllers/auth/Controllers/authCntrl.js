var appRoot ='/home/nms-backend/actions-runner/_work/nms_node/nms_node';
var authMdl = require('../Models/authMdl');
var df = require( '../../../../../utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);




/******************************************************************************************************
 * Controller : Login
 * Description : Login API fro NMS
 * 02-11-2023 - RajKumar 
 * 
 *******************************************************************************************************/
exports.loginCntrl = function (req, res) {
    fnm = "login";
    // Check if 'req.body' exists and 'req.body.data' exists within it
    if (req.body ) {
        var req_body = req.body ? req.body: req.body.data;
        console.log(req_body); // Log the request body to check its structure
        authMdl.loginMdl(req_body)
            .then(function (usrDtls) {
                console.log('errrrrrrrrrrrrrrrrrrrrrrrrrrrrr1111222222222');                    
                console.log(usrDtls.length,'eeeeeeeeeeeeeeeeeeeeeeeee');       
                if (usrDtls && usrDtls.length === 0) {
                    let error = 'Please check your Credentials';
                  return df.formatloginErrorRes(req, res, error, cntxtDtls, fnm, {error_status: 400,err_message : "Please check your Credentials"});
                }
                if (!usrDtls || usrDtls === undefined){
                let error = 'Please check your Credentials';
                return df.formatloginErrorRes(req, res, error, cntxtDtls, fnm, {error_status: 400,err_message : "Please check your credentials"}); 
                }
                 else {
    
                    return df.formatSucessRes(req, res, usrDtls, cntxtDtls, fnm, {});
                }              
                            
            });
    } else {
        // Handle the case where 'req.body' or 'req.body.data' is not defined
        let error = 'Request body or data is missing';
		console.log()
        df.formatloginErrorRes(req, res, error, cntxtDtls, fnm, {});
    }
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
                  return df.formatloginErrorRes(req, res, error, cntxtDtls, fnm, {error_status: 400,err_message : "Your Email is Already Existed"});
                }
                
                if(usrDtls && usrDtls.length === 0){
                    authMdl.registerMdl(req_body).then(function(usrDtls){
                        df.formatSucessRes(req, res, usrDtls, cntxtDtls, fnm, {});
                    })         
                }

            })
        
    }
    else{
        let error = 'Password Must be 8character';
        return df.formatloginErrorRes(req, res, error, cntxtDtls, fnm, {error_status: 400,err_message : "Your Email is Already Existed"});
    } 
 }




