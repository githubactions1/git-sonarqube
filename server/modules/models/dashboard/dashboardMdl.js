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
    var QRY_TO_EXEC = ` SELECT 
    count(*) AS count,
    SUM(CASE WHEN di.ip_status = 0 THEN 1 ELSE 0 END) AS Down_Count,
    SUM(CASE WHEN di.ip_status = 1 THEN 1 ELSE 0 END) AS Up_Count,
    SUM(CASE WHEN d.ignores = 1 THEN 1 ELSE 0 END) AS ignore_count,
    SUM(CASE WHEN d.disabled = 1 THEN 1 ELSE 0 END) AS disabled_count FROM devices as d
    join device_info as di on d.device_id=di.device_id `;
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
    var QRY_TO_EXEC = `  SELECT
    COUNT(CASE WHEN sys_voltage != 'No Such Object currently exists at this OID' THEN sys_voltage END) AS sys_voltage_count,COUNT(CASE WHEN sys_activefan != 'n/a'  THEN sys_activefan END) AS activefan,
    COUNT(CASE WHEN sys_temperature != 'No Such Object currently exists at this OID'  THEN sys_activefan END) AS temperature,COUNT(CASE WHEN sys_fanspeed != 'No Such Object currently exists at this OID' THEN sys_activefan END) AS fanspeed,
    COUNT(CASE WHEN sys_processor_temp != 'No Such Object currently exists at this OID' THEN sys_activefan END) AS processor_temp,COUNT(CASE WHEN sys_power != 'No Such Object currently exists at this OID' THEN sys_activefan END) AS power,
    COUNT(CASE WHEN sys_current != 'No Such Object currently exists at this OID' THEN sys_activefan END) AS current,COUNT(CASE WHEN sys_processor_frequency != 'No Such Object currently exists at this OID' THEN sys_activefan END) AS processor_frequency,
    COUNT(CASE WHEN sys_voltage != 'No Such Object currently exists at this OID' THEN sys_voltage END) +COUNT(CASE WHEN sys_activefan != 'No Such Object currently exists at this OID' THEN sys_activefan END) +COUNT(CASE WHEN sys_temperature != 'No Such Object currently exists at this OID' THEN sys_temperature END) +
    COUNT(CASE WHEN sys_fanspeed != 'No Such Object currently exists at this OID' THEN sys_fanspeed END) +COUNT(CASE WHEN sys_processor_temp != 'No Such Object currently exists at this OID' THEN sys_processor_temp END) +COUNT(CASE WHEN sys_power != 'No Such Object currently exists at this OID' THEN sys_power END) +
    COUNT(CASE WHEN sys_current != 'No Such Object currently exists at this OID' THEN sys_current END) +
   COUNT(CASE WHEN sys_processor_frequency != 'No Such Object currently exists at this OID' THEN sys_processor_frequency END) AS up,#COUNT(CASE WHEN sys_voltage = 'No Such Object currently exists at this OID'THEN sys_voltage END) AS sys_voltage_count,
  # COUNT(CASE WHEN sys_activefan = 'No Such Object currently exists at this OID' THEN sys_activefan END) AS activefan,#COUNT(CASE WHEN sys_temperature = 'No Such Object currently exists at this OID' THEN sys_activefan END) AS temperature,
   #COUNT(CASE WHEN sys_fanspeed = 'No Such Object currently exists at this OID' THEN sys_activefan END) AS fanspeed,
    #COUNT(CASE WHEN sys_processor_temp = 'No Such Object currently exists at this OID' THEN sys_activefan END) AS processor_temp,
    #COUNT(CASE WHEN sys_power = 'No Such Object currently exists at this OID' THEN sys_activefan END) AS power,
   # COUNT(CASE WHEN sys_current = 'No Such Object currently exists at this OID' THEN sys_activefan END) AS current,
   # COUNT(CASE WHEN sys_processor_frequency = 'No Such Object currently exists at this OID' THEN sys_activefan END) AS processor_frequency,
    COUNT(CASE WHEN sys_voltage = 'No Such Object currently exists at this OID' THEN sys_voltage END) +
    COUNT(CASE WHEN sys_activefan = 'No Such Object currently exists at this OID' THEN sys_activefan END) +COUNT(CASE WHEN sys_temperature = 'No Such Object currently exists at this OID' THEN sys_temperature END) +
    COUNT(CASE WHEN sys_fanspeed = 'No Such Object currently exists at this OID' THEN sys_fanspeed END) +COUNT(CASE WHEN sys_processor_temp = 'No Such Object currently exists at this OID' THEN sys_processor_temp END) +
    COUNT(CASE WHEN sys_power = 'No Such Object currently exists at this OID' THEN sys_power END) +COUNT(CASE WHEN sys_current = 'No Such Object currently exists at this OID' THEN sys_current END) +COUNT(CASE WHEN sys_processor_frequency = 'No Such Object currently exists at this OID' THEN sys_processor_frequency END) AS down,
    COUNT(CASE WHEN sys_voltage != 'No Such Object currently exists at this OID' THEN 1 END) + COUNT(CASE WHEN sys_activefan != 'No Such Object currently exists at this OID' THEN 1 END) + COUNT(CASE WHEN sys_temperature != 'No Such Object currently exists at this OID' THEN 1 END) +
    COUNT(CASE WHEN sys_fanspeed != 'No Such Object currently exists at this OID' THEN 1 END) + COUNT(CASE WHEN sys_processor_temp != 'No Such Object currently exists at this OID' THEN 1 END) + COUNT(CASE WHEN sys_power != 'No Such Object currently exists at this OID' THEN 1 END) +
    COUNT(CASE WHEN sys_current != 'No Such Object currently exists at this OID' THEN 1 END) + COUNT(CASE WHEN sys_processor_frequency != 'No Such Object currently exists at this OID' THEN 1 END) +COUNT(CASE WHEN sys_voltage = 'No Such Object currently exists at this OID' THEN 1 END) +
    COUNT(CASE WHEN sys_activefan = 'No Such Object currently exists at this OID' THEN 1 END) + COUNT(CASE WHEN sys_temperature = 'No Such Object currently exists at this OID' THEN 1 END) + COUNT(CASE WHEN sys_fanspeed = 'No Such Object currently exists at this OID' THEN 1 END) +
    COUNT(CASE WHEN sys_processor_temp = 'No Such Object currently exists at this OID' THEN 1 END) + COUNT(CASE WHEN sys_power = 'No Such Object currently exists at this OID' THEN 1 END) + COUNT(CASE WHEN sys_current = 'No Such Object currently exists at this OID' THEN 1 END) + COUNT(CASE WHEN sys_processor_frequency = 'No Such Object currently exists at this OID' THEN 1 END) AS total_count
    FROM sensors `
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};
// SELECT
    // COUNT(CASE WHEN sys_voltage != 'N/a' THEN sys_voltage END) AS sys_voltage_count,COUNT(CASE WHEN sys_activefan != 'N/a' THEN sys_activefan END) AS activefan,
    // COUNT(CASE WHEN sys_temperature != 'N/a' THEN sys_activefan END) AS temperature,COUNT(CASE WHEN sys_fanspeed != 'N/a' THEN sys_activefan END) AS fanspeed,
    // COUNT(CASE WHEN sys_processor_temp != 'N/a' THEN sys_activefan END) AS processor_temp,COUNT(CASE WHEN sys_power != 'N/a' THEN sys_activefan END) AS power,
    // COUNT(CASE WHEN sys_current != 'N/a' THEN sys_activefan END) AS current,COUNT(CASE WHEN sys_processor_frequency != 'N/a' THEN sys_activefan END) AS processor_frequency,
    // COUNT(CASE WHEN sys_voltage != 'N/a' THEN sys_voltage END) +COUNT(CASE WHEN sys_activefan != 'N/a' THEN sys_activefan END) +COUNT(CASE WHEN sys_temperature != 'N/a' THEN sys_temperature END) +
    // COUNT(CASE WHEN sys_fanspeed != 'N/a' THEN sys_fanspeed END) +COUNT(CASE WHEN sys_processor_temp != 'N/a' THEN sys_processor_temp END) +COUNT(CASE WHEN sys_power != 'N/a' THEN sys_power END) +
    // COUNT(CASE WHEN sys_current != 'N/a' THEN sys_current END) +
    // COUNT(CASE WHEN sys_processor_frequency != 'N/a' THEN sys_processor_frequency END) AS up,COUNT(CASE WHEN sys_voltage = 'N/a'THEN sys_voltage END) AS sys_voltage_count,
    // COUNT(CASE WHEN sys_activefan = 'N/a' THEN sys_activefan END) AS activefan,COUNT(CASE WHEN sys_temperature = 'N/a' THEN sys_activefan END) AS temperature,
    // COUNT(CASE WHEN sys_fanspeed = 'N/a' THEN sys_activefan END) AS fanspeed,COUNT(CASE WHEN sys_processor_temp = 'N/a' THEN sys_activefan END) AS processor_temp,
    // COUNT(CASE WHEN sys_power = 'N/a' THEN sys_activefan END) AS power,COUNT(CASE WHEN sys_current = 'N/a' THEN sys_activefan END) AS current,
    // COUNT(CASE WHEN sys_processor_frequency = 'N/a' THEN sys_activefan END) AS processor_frequency,COUNT(CASE WHEN sys_voltage = 'N/a' THEN sys_voltage END) +
    // COUNT(CASE WHEN sys_activefan = 'N/a' THEN sys_activefan END) +COUNT(CASE WHEN sys_temperature = 'N/a' THEN sys_temperature END) +
    // COUNT(CASE WHEN sys_fanspeed = 'N/a' THEN sys_fanspeed END) +COUNT(CASE WHEN sys_processor_temp = 'N/a' THEN sys_processor_temp END) +
    // COUNT(CASE WHEN sys_power = 'N/a' THEN sys_power END) +COUNT(CASE WHEN sys_current = 'N/a' THEN sys_current END) +COUNT(CASE WHEN sys_processor_frequency = 'N/a' THEN sys_processor_frequency END) AS down,
    // COUNT(CASE WHEN sys_voltage != 'N/a' THEN 1 END) + COUNT(CASE WHEN sys_activefan != 'N/a' THEN 1 END) + COUNT(CASE WHEN sys_temperature != 'N/a' THEN 1 END) +
    // COUNT(CASE WHEN sys_fanspeed != 'N/a' THEN 1 END) + COUNT(CASE WHEN sys_processor_temp != 'N/a' THEN 1 END) + COUNT(CASE WHEN sys_power != 'N/a' THEN 1 END) +
    // COUNT(CASE WHEN sys_current != 'N/a' THEN 1 END) + COUNT(CASE WHEN sys_processor_frequency != 'N/a' THEN 1 END) +COUNT(CASE WHEN sys_voltage = 'N/a' THEN 1 END) +
    // COUNT(CASE WHEN sys_activefan = 'N/a' THEN 1 END) + COUNT(CASE WHEN sys_temperature = 'N/a' THEN 1 END) + COUNT(CASE WHEN sys_fanspeed = 'N/a' THEN 1 END) +
    // COUNT(CASE WHEN sys_processor_temp = 'N/a' THEN 1 END) + COUNT(CASE WHEN sys_power = 'N/a' THEN 1 END) + COUNT(CASE WHEN sys_current = 'N/a' THEN 1 END) + COUNT(CASE WHEN sys_processor_frequency = 'N/a' THEN 1 END) AS total_count
    // FROM sensors; `;

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
/*****************************************************************************
* Function : userdetailsMdl
* Description : this model gives the list of a roles 
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.userdetailsMdl = function (data) {
    var fnm = "userdetailsMdl"
    var QRY_TO_EXEC = `  select first_name ,last_name,user_email from users_dtl_t
    where user_id=${data.user_id} `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};

/*****************************************************************************
 * Function : logindetailsMdl
* Description : this model gives the list of a roles 
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.logindetailsMdl = function (data) {
    var fnm = "logindetailsMdl"
    var QRY_TO_EXEC = ` INSERT INTO login_history(user_id,user,date,action) VALUES (${data.user_id},'${data.first_name}',current_timestamp(),'Logged In') `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};

/*****************************************************************************
 * Function : logindetailslistMdl
* Description : this model gives the list of a roles 
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.logindetailslistMdl = function (data) {
    var fnm = "logindetailslistMdl"
    var QRY_TO_EXEC = ` select * from login_history where user_id=25 order by login_id desc limit 10 `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};
