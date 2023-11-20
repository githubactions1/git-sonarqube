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
    var QRY_TO_EXEC = `SELECT vendor,hardware,version,os,location,type as 'device_type' FROM device_info;`;
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
    var QRY_TO_EXEC = `select hostname,sys_desc,uptime,device_id from device_info`;
    console.log(QRY_TO_EXEC);

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};
/*****************************************************************************
* Function : devicesindetailedMdl
* Description : this will shoows the devices list
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.devicesindetailedMdl = function (data) {
    var fnm = "devicesindetailedMdl"
    var QRY_TO_EXEC = `SELECT d.ip as 'device_ip',d.hardware,d.os as 'operating_system',d.sysName as 'system_nm'
    ,d.hostname as 'catch_ip',d.serial as 'serial_number',d.last_rebooted as 'last_rebooted',d.uptime,s.sensor_class,s.sensor_descr
     FROM devices as d
    left join sensors as s on s.device_id=d.device_id
    left join ports as p on p.detailed=d.device_id where d.device_id='${data.device_id}';`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};

/*****************************************************************************
* Function : devicessensorslstMdl
* Description : this will shoows the devices list
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.devicessensorslstMdl = function (data) {
    var fnm = "devicessensorslstMdl"
    var QRY_TO_EXEC = `select s.sys_voltage ,d.hostname as 'device',s.sys_activefan ,s.sys_temperature ,s.sys_fanspeed ,s.sys_processor_temp,s.sys_processor_temp,
    s.sys_power,s.sys_current,s.sys_processor_frequency,s.sys_primary_powersupplyrate,s.sys_backup_powersupplyrate from sensors as s
         join devices as d on d.device_id=s.device_id where d.device_id='${data.device_id}`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};

