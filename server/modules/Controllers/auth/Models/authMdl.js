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
    var QRY_TO_EXEC = ` select * from users_dtl_t as us 
    where user_email='${data.user_email}' and user_password=SHA1('${data.user_password}') and user_status=1  `
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
    var QRY_TO_EXEC = ` INSERT INTO users_dtl_t (first_name,last_name,user_email,user_password,user_role_id,user_status) values ('${data.first_name}','${data.last_name}','${data.user_email}',SHA1('${data.user_password}'),${data.user_role_Id},1)  `
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}

/*****************************************************************************
* Function : userroleslistMdl
* Description : insert the login details into the login_history table
* Arguments : callback function
* 02-11-2023 - RajKumar
*
******************************************************************************/

exports.userroleslistMdl = function (data) {
    var fnm = "userroleslistMdl"
    var QRY_TO_EXEC = ` select user_role_id,role_name,role_description from user_roles;  `
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}

/*****************************************************************************
* Function : userdetailsMdl
* Description : insert the login details into the login_history table
* Arguments : callback function
* 02-11-2023 - RajKumar
*
******************************************************************************/

exports.userdetailsMdl = function (data) {
    var fnm = "userdetailsMdl"
    var QRY_TO_EXEC = `  select user_id,first_name,last_name,user_email,ur.role_name from users_dtl_t as ud
    join user_roles as ur on ur.user_role_id=ud.user_role_id where ud.user_id=${data.user_id};  `
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}

/*****************************************************************************
 * Function : logindetailsMdl
* Description : this model gives the list of a roles 
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.logindetailsMdl = function (data,ip,dataa) {
    var fnm = "logindetailsMdl"
    var QRY_TO_EXEC = ` INSERT INTO login_history(user_id,user,date,from,user_agent,action) VALUES (${data.user_id},'${data.first_name}',current_timestamp(),${ip},${dataa},'Logged In') `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};

/*****************************************************************************
 * Function : authenticationlogsMdl
* Description : this model gives the list of a roles 
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.authenticationlogsMdl = function (data,ip,dataa) {
    var fnm = "authenticationlogsMdl"
    var QRY_TO_EXEC = ` select * from login_history where date(date)=curdate() `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};
/*****************************************************************************
 * Function : userpermissionMdl
* Description : this model gives the list of a roles 
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.userpermissionMdl = function (data,ip,dataa) {
    var fnm = "userpermissionMdl"
    var QRY_TO_EXEC = ` SELECT * FROM NMS.user_roles where user_role_id=${data.user_role_id}  `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};