var dbutil = require( '../../../../utils/db.utils');
var sqldb = require('../../../../config/db.config');
var df = require( '../../../../utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);


/*****************************************************************************
* Function : dropdownlistMdl
* Description : this model shows dropdown of a search filter
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.dropdownlistMdl = function (data) {
    var fnm = "dropdownlistMdl"
    var QRY_TO_EXEC = `SELECT vendor,hardware,version,os,location,type as 'device_type' FROM devices;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};
/*****************************************************************************
* Function : deviceslistMdl
* Description : this will shoows the devices list
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.deviceslistMdl = function (data) {
    var fnm = "dropdownlistMdl"
    var QRY_TO_EXEC = `select hostname,hardware,os,uptime from devices`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};