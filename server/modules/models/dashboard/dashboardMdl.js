var dbutil = require( '../../../../utils/db.utils');
var sqldb = require('../../../../config/db.config');
var df = require( '../../../../utils/dflower.utils');
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
    SUM(CASE WHEN ignores = 1 THEN 1 ELSE 0 END) AS ignore_count,
    SUM(CASE WHEN disabled = 1 THEN 1 ELSE 0 END) AS disabled_count FROM devices;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};
/*****************************************************************************
* Function : portsMdl
* Description : this model shows the no.of ports in dashborad
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.portsMdl = function (data) {
    var fnm = "portsMdl"
    var QRY_TO_EXEC = `SELECT 
    count(*) AS count,
    SUM(CASE WHEN d.status = 0 THEN 1 ELSE 0 END) AS Down_Count,
    SUM(CASE WHEN d.status = 1 THEN 1 ELSE 0 END) AS Up_Count,
    SUM(CASE WHEN p.ignores = 1 THEN 1 ELSE 0 END) AS ignore_count,
    SUM(CASE WHEN p.disabled = 1 THEN 1 ELSE 0 END) AS disabled_count
    FROM ports as p
    join devices as d on d.device_id=p.device_id;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};

/*****************************************************************************
* Function : sensorsMdl
* Description : this model shows the no.of ports in dashborad
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.sensorsMdl = function (data) {
    var fnm = "sensorsMdl"
    var QRY_TO_EXEC = `SELECT 
    SUM(CASE WHEN d.status = 0 THEN 1 ELSE 0 END) AS Down_Count,
       SUM(CASE WHEN d.status = 1 THEN 1 ELSE 0 END) AS Up_Count,
       SUM(CASE WHEN s.sensor_ignore = 1 THEN 1 ELSE 0 END) AS ignore_count,
       SUM(CASE WHEN s.sensor_disable = 1 THEN 1 ELSE 0 END) AS disabled_count
       FROM sensors as s
   join devices as d on d.device_id=s.device_id
   join ports as p on p.device_id=s.device_id;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};

/*****************************************************************************
* Function : statusesMdl
* Description : this model shows the statuses on devices in dashborad
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.statusesMdl = function (data) {
    var fnm = "statusesMdl"
    var QRY_TO_EXEC = `SELECT  
     SUM(CASE WHEN d.status = 0 THEN 1 ELSE 0 END) AS Down_Count,
        SUM(CASE WHEN d.status = 1 THEN 1 ELSE 0 END) AS Up_Count,
        SUM(CASE WHEN s.status_ignore = 1 THEN 1 ELSE 0 END) AS ignore_count,
        SUM(CASE WHEN s.status_disable = 1 THEN 1 ELSE 0 END) AS disabled_count
        FROM status as s
        join devices as d on d.device_id=s.device_id
    join ports as p on p.device_id=s.device_id
    join sensors as ss on ss.device_id=s.device_id `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};