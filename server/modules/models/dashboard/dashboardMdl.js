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
    SUM(CASE WHEN if_oper_status = 2 THEN 1 ELSE 0 END) AS Down_Count,
    SUM(CASE WHEN if_oper_status = 1 THEN 1 ELSE 0 END) AS Up_Count,
    SUM(CASE WHEN if_oper_status = 3 THEN 1 ELSE 0 END) AS Testing,
    SUM(CASE WHEN if_oper_status = 4 THEN 1 ELSE 0 END) AS operation_Unknown,
    SUM(CASE WHEN if_oper_status = 5 THEN 1 ELSE 0 END) AS Dormant,
    SUM(CASE WHEN if_oper_status = 6 THEN 1 ELSE 0 END) AS Not_Present
    FROM ports 
    `;
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
    count(*) AS count,
    SUM(CASE WHEN sensor_status = 0 THEN 1 ELSE 0 END) AS Down_Count,
       SUM(CASE WHEN sensor_status = 1 THEN 1 ELSE 0 END) AS Up_Count,
       SUM(CASE WHEN sensor_disable = 1 THEN 1 ELSE 0 END) AS ignore_count,
       SUM(CASE WHEN sensor_ignore = 1 THEN 1 ELSE 0 END) AS disabled_count
       FROM sensors `;
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
/*****************************************************************************
* Function : rolesaddMdl
* Description : this model insert the roles in db
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.rolesaddMdl = function (data) {
    var fnm = "rolesaddMdl"
    var QRY_TO_EXEC = `insert into roles (role_name,role_descr,i_ts) values('${data.role_name}','${data.role_descr}',curdate()); `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};
/*****************************************************************************
* Function : roleslstMdl
* Description : this model gives the list of a roles 
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.roleslstMdl = function (data) {
    var fnm = "roleslstMdl"
    var QRY_TO_EXEC = `Select * from roles `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};
/*****************************************************************************
* Function : sensorslstMdl
* Description : this model gives the list of a Sensors 
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.sensorslstMdl = function (data) {
    var fnm = "sensorslstMdl"
    var QRY_TO_EXEC = `select s.sensor_class as class,d.hostname as 'device',s.sensor_descr as decription ,s.sensor_event as 'events',s.sensor_value as 'value' from sensors as s
    left join devices as d on d.device_id=s.device_id `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};