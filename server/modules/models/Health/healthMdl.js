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
    where s.sys_current not in (0,'N/A') `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};
/*****************************************************************************
* Function : voltagelistMdl
* Description : this model shows dropdown of a search filter
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.voltagelistMdl = function (data) {
    var fnm = "voltagelistMdl"
    var QRY_TO_EXEC = `select   s.device_id, di.hostname,s.sys_voltage value, 'voltage' descrip
    from sensors as s 
    join device_info as di on s.device_id=di.device_id
    where s.sys_voltage not in (0,'N/A')`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};
/*****************************************************************************
* Function : powerlistMdl
* Description : this model shows dropdown of a search filter
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.powerlistMdl = function (data) {
    var fnm = "powerlistMdl"
    var QRY_TO_EXEC = `select   s.device_id, di.hostname,s.sys_power value, 'Power' descrip
    from sensors as s 
    join device_info as di on s.device_id=di.device_id
    where s.sys_power not in (0,'N/A')`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};
/*****************************************************************************
* Function : frequencylistMdl
* Description : this model shows dropdown of a search filter
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.frequencylistMdl = function (data) {
    var fnm = "frequencylistMdl"
    var QRY_TO_EXEC = `   select   s.device_id, di.hostname,s.sys_processor_frequency/1000 value, 'Frequency' descrip
    from sensors as s
    left join device_info as di on s.device_id=di.device_id
     where s.sys_processor_frequency not in (0,'N/A') `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};
/*****************************************************************************
* Function : statuslistMdl
* Description : this model shows dropdown of a search filter
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.statuslistMdl = function (data) {
    var fnm = "statuslistMdl"
    var QRY_TO_EXEC = ` SELECT 
    d.hostname,
    CASE 
      WHEN s.sys_primary_powersupplyrate = 1  THEN 'true'
      ELSE 'false'
    END AS 'Primary_powersupplyrate',
     CASE 
      WHEN s.sys_backup_powersupplyrate = 1 THEN 'true'
      ELSE 'false'
    END AS 'Backup_powersupplyrate'
  FROM sensors as s
  JOIN devices as d ON d.device_id = s.device_id;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};

/*****************************************************************************
* Function : TemperaturelistMdl
* Description : this model shows dropdown of a search filter
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.TemperaturelistMdl = function (data) {
    var fnm = "TemperaturelistMdl"
    var QRY_TO_EXEC = ` SELECT s.device_id,sys_temperature AS temperature,'System' AS type,hostname
    FROM sensors AS s
    JOIN device_info AS d ON d.device_id = s.device_id
    WHERE sys_temperature > 0
    UNION ALL
    SELECT s.device_id,sys_processor_temp AS temperature,'Processor' AS type,hostname
    FROM sensors AS s
    JOIN device_info AS d ON d.device_id = s.device_id
    WHERE sys_processor_temp > 0; `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};