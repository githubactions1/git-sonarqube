var dbutil = require( '../../../../utils/db.utils');
var sqldb = require('../../../../config/db.config');
var df = require( '../../../../utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);


/*****************************************************************************
* Function : memorylistMdl
* Description : this model shows dropdown of a search filter
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.memorylistMdl = function (data) {
    var fnm = "memorylistMdl"
    var QRY_TO_EXEC = `select d.hostname,(d.sys_total_memory) ,(d.sys_used_memory ),d.sys_mem_type from sensors as s
    join device_info as d on d.device_id=s.device_id `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};
/*****************************************************************************
* Function : fanspeedlistMdl
* Description : this model shows dropdown of a search filter
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.fanspeedlistMdl = function (data) {
    var fnm = "fanspeedlistMdl"
    var QRY_TO_EXEC = `select   s.device_id, di.hostname,s.sys_fanspeed value, 'Fanspeed' descrip
    from sensors as s 
    join device_info as di on s.device_id=di.device_id
    where s.sys_fanspeed not in (0,'N/A') `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};
/*****************************************************************************
* Function : currentlistMdl
* Description : this model shows dropdown of a search filter
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.currentlistMdl = function (data) {
    var fnm = "currentlistMdl"
    var QRY_TO_EXEC = `select   s.device_id, di.hostname,s.sys_current value, 'Current' descrip
    from sensors as s 
    join device_info as di on s.device_id=di.device_id
    where s.sys_fanspeed not in (0,'N/A') `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};