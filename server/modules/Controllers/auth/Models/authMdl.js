var dbutil = require( '../../../../../utils/db.utils');
var sqldb = require('../../../../../config/db.config');
var df = require( '../../../../../utils/dflower.utils');

var cntxtDtls = df.getModuleMetaData(__dirname, __filename);


// var dbutil = require( '../../../../../utils/db.utils');
// var sqldb = require('../../../../../config/db.config');
// var df = require( '../../../../../utils/dflower.utils');
// var cntxtDtls = df.getModuleMetaData(__dirname, __filename);




/*****************************************************************************
* Function : loginMdl
* Description : login
* Arguments : callback function
* 02-11-2023 - RajKumar
*
******************************************************************************/
exports.loginMdl = function (data) {
    var fnm = "loginMdl"
    var QRY_TO_EXEC = `select *  from users_dtl_t where user_email='${data.user_email}' and user_password=SHA1('${data.user_password}') and user_status=1`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}; 


/*****************************************************************************
* Function : logindetails_insert
* Description : insert the login details into the login_history table
* Arguments : callback function
* 02-11-2023 - RajKumar
*
******************************************************************************/

exports.registerMdl = function (data) {
    var fnm = "registerMdl"
    var QRY_TO_EXEC = `INSERT INTO users_dtl_t (first_name,last_name,user_email,user_password,user_status) values ('${data.first_name}','${data.last_name}','${data.user_email}',SHA1('${data.user_password}'),1)`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}
