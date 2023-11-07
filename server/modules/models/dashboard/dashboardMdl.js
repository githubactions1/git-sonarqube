var dbutil = require( '../../../../../utils/db.utils');
var sqldb = require('../../../../../config/db.config');
var df = require( '../../../../../utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);


/*****************************************************************************
* Function : devicesMdl
* Description : this model shows the no.of devices in dashborad
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.devicesMdl = function (data) {
    var fnm = "devicesMdl"
    var QRY_TO_EXEC = `SELECT 
    count(*) AS count,
    SUM(CASE WHEN status = 0 THEN 1 ELSE 0 END) AS Down_Count,
    SUM(CASE WHEN status = 1 THEN 1 ELSE 0 END) AS Up_Count,
    SUM(CASE WHEN ignore = 1 THEN 1 ELSE 0 END) AS ignore_count,
    SUM(CASE WHEN disabled = 1 THEN 1 ELSE 0 END) AS disabled_countFROM devices;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};