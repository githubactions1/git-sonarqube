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
    var QRY_TO_EXEC = `SELECT hardware,version,os,location,type as 'device_type' FROM device_info;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};
// /*****************************************************************************
// * Function : deviceslistMdl
// * Description : this will shoows the devices list
// * Arguments : callback function
// * 04-11-2023 - RajKumar
// *
// ******************************************************************************/
// exports.deviceslistMdl = function (data) {
//     var fnm = "deviceslistMdl"
//     var QRY_TO_EXEC = `select d.hostname,di.sys_desc,di.uptime,d.device_id from devices as d 
//     join device_info as di on di.device_id=d.device_id group by d.device_id;`;
//     console.log(QRY_TO_EXEC);
//     return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
// };
/*****************************************************************************
* Function : devicesindetailedMdl
* Description : this will shoows the devices list
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.devicesindetailedMdl = function (data) {
    var fnm = "devicesindetailedMdl"
    var QRY_TO_EXEC = `SELECT d.device_id,d.hostname as 'catched_ip',di.sys_name as 'system_name',di.sys_desc as 'operating_system',di.uptime,di.sys_serialnumber
    ,di.sys_version as 'version'
         FROM devices as d
       join device_info as di on di.device_id=d.device_id where d.device_id=${data.device_id};  `;
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
         join devices as d on d.device_id=s.device_id where d.device_id='${data.device_id}';`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};
/*****************************************************************************
* Function : devicebasiclstMdl
* Description : this will shoows the devices list
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.devicebasiclstMdl = function (data) {
    var fnm = "devicebasiclstMdl"
    var QRY_TO_EXEC = `select d.hostname,di.sys_desc,di.uptime,d.device_id from devices as d 
    join device_info as di on di.device_id=d.device_id group by d.device_id;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};
/*****************************************************************************
* Function : processorindetailMdl
* Description : this will shoows the devices list
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.processorindetailMdl = function (data) {
    var fnm = "processorindetailMdl"
    var QRY_TO_EXEC = `select (s.sys_processor_frequency DIV 100) as processor,d.sys_total_memory ,d.sys_used_memory,d.sys_mem_type from sensors as s
    join device_info as d on d.device_id=s.device_id
     where d.device_id='${data.device_id}';`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};

/*****************************************************************************
* Function : devicebasiclstcountMdl
* Description : this will shoows the devices list
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.devicebasiclstcountMdl = function (data) {
    var fnm = "devicebasiclstcountMdl"
    var QRY_TO_EXEC = `select d.hostname, di.uptime, di.sys_desc, d.device_id, di.sys_name, COUNT(p.device_id) AS port_count
    FROM devices AS d
    left join  device_info as di on di.device_id = d.device_id
    left join ports AS p on p.device_id = d.device_id
    group by d.hostname, di.uptime, di.sys_desc, d.device_id, di.sys_name;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};
/*****************************************************************************
* Function : sensorslistMdl
* Description : this will shoows the devices list
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.sensorslistMdl = function (data) {
    var fnm = "sensorslistMdl"
    var QRY_TO_EXEC = ` select  s.device_id, di.hostname,s.sys_voltage value, 'voltage' descrip
    from sensors as s
    join device_info as di on s.device_id=di.device_id
    union all
    select  s.device_id, di.hostname,s.sys_activefan value, 'activefan' descrip
    from sensors as s
    join device_info as di on s.device_id=di.device_id
    union all
    select  s.device_id, di.hostname,s.sys_temperature value, 'Temperature' descrip
    from sensors as s
    join device_info as di on s.device_id=di.device_id
    union all
    select  s.device_id, di.hostname,s.sys_fanspeed value, 'Fanspeed' descrip
    from sensors as s
    join device_info as di on s.device_id=di.device_id
    union all
    select  s.device_id, di.hostname,s.sys_processor_temp value, 'Processor_temp' descrip
    from sensors as s
    join device_info as di on s.device_id=di.device_id
    union all
    select  s.device_id, di.hostname,s.sys_power value, 'Power' descrip
    from sensors as s
    join device_info as di on s.device_id=di.device_id
    union all
    select  s.device_id, di.hostname,s.sys_current value, 'Current' descrip
    from sensors as s
    join device_info as di on s.device_id=di.device_id
    union all
    select  s.device_id, di.hostname,s.sys_processor_frequency value, 'Processor_Frequency' descrip
    from sensors as s
    join device_info as di on s.device_id=di.device_id
    `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};
/*****************************************************************************
* Function : detailedportslistMdl
* Description : this will shoows the devices list
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.detailedportslistMdl = function (data) {
    var fnm = "detailedportslistMdl"
    var QRY_TO_EXEC = ` SELECT
    CASE WHEN p.if_oper_status = 1 THEN p.if_name ELSE 0 END AS up,
     CASE WHEN p.if_oper_status = 2 THEN p.if_name ELSE 0 END AS down
 FROM
     devices AS d
     JOIN ports AS p ON p.device_id = d.device_id
 WHERE
     d.device_id  =${data.device_id} ;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};

/*****************************************************************************
* Function : allportslistMdl
* Description : this will shoows the ports list
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.allportslistMdl = function (data) {
    var fnm = "allportslistMdl"
    var QRY_TO_EXEC = `  SELECT
    p.device_id,
    p.if_name,
    p.if_oper_status,
	CASE 
    WHEN p.if_oper_status = 1  THEN 'up'
    WHEN p.if_oper_status = 2  THEN 'down'
	WHEN p.if_oper_status = 6  THEN 'Not Present'
  END AS 'status',
    d.hostname,
    p.if_mac_address,
    ti.i_ts,
    ti.If_InOctets,
    ti.If_OutOctets,
    round(If_InOctets / 1000*100, 0) as inpercentage,
    round(If_OutOctets / 1000*100, 0) as outpercentage,
    Received_Hc_UniCast_Pkts,
    Received_UniCast_Pkts,
    Transmitted_Hc_UniCast_Pkts=-1 as speed
  FROM
    ports AS p
  JOIN (
    SELECT
      device_id,
      port_name,
      MAX(i_ts) AS max_i_ts
    FROM
      traffic_info
   
    GROUP BY
      device_id, port_name
  ) AS max_ts
  ON
    p.device_id = max_ts.device_id
    AND p.if_name = max_ts.port_name
  JOIN
    traffic_info AS ti
  ON
    max_ts.device_id = ti.device_id
    AND max_ts.port_name = ti.port_name
    AND max_ts.max_i_ts = ti.i_ts
JOIN
    devices  AS d
  ON
   d.device_id = ti.device_id
    AND max_ts.port_name = ti.port_name
    AND max_ts.max_i_ts = ti.i_ts
 
  ORDER BY
    p.port_id ASC; `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};

/*****************************************************************************
* Function : devicesportscountMdl
* Description : this will shoows the ports list
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.devicesportscountMdl = function (data) {
    var fnm = "devicesportscountMdl"
    var QRY_TO_EXEC = ` select COUNT(IF(if_oper_status IN (1, 2), 1, NULL)) AS Total_Ports,
    format(COUNT(CASE WHEN if_oper_status = 1 THEN 1 ELSE NULL END), 'NO') AS 'UP',
    format(COUNT(CASE WHEN if_oper_status =2 THEN 1 ELSE NULL END), 'NO') AS 'Down'
from ports as p
join devices as d on d.device_id=p.device_id where p.device_id=${data.device_id} `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};

/*****************************************************************************
* Function : downportslistMdl
* Description : this will shoows the ports list
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.downportslistMdl = function (data) {
  var fnm = "downportslistMdl"
  var QRY_TO_EXEC = ` SELECT
  p.device_id,
  p.if_name,
  d.hostname,
  p.if_mac_address,
  ti.i_ts,
  ti.If_InOctets,
  ti.If_OutOctets,
  round(If_InOctets / 1000*100, 0) as inpercentage,
  round(If_OutOctets / 1000*100, 0) as outpercentage,
  Received_Hc_UniCast_Pkts,
  Received_UniCast_Pkts,
  Transmitted_Hc_UniCast_Pkts=-1 as speed,
  p.if_oper_status
FROM
  ports AS p
left JOIN (
  SELECT
    device_id,
    port_name,
    MAX(i_ts) AS max_i_ts
  FROM
    traffic_info

  GROUP BY
    device_id, port_name
) AS max_ts
ON
  p.device_id = max_ts.device_id
  AND p.if_name = max_ts.port_name
left JOIN
  traffic_info AS ti
ON
  max_ts.device_id = ti.device_id
  AND max_ts.port_name = ti.port_name
  AND max_ts.max_i_ts = ti.i_ts
left JOIN
  devices  AS d
ON
 d.device_id = ti.device_id
  AND max_ts.port_name = ti.port_name
  AND max_ts.max_i_ts = ti.i_ts
WHERE
  p.if_oper_status=2
ORDER BY
  p.port_id ASC;  `;
  console.log(QRY_TO_EXEC);
  return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};



/*****************************************************************************
* Function : idwiseportslistMdl
* Description : this will shoows the ports list
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.idwiseportslistMdl = function (data) {
    var fnm = "idwiseportslistMdl"
    var QRY_TO_EXEC = ` SELECT
    p.device_id,
    p.if_name,
    d.hostname,
    p.if_mac_address,
    ti.i_ts,
    ti.If_InOctets,
    ti.If_OutOctets,
    round(If_InOctets / 1000*100, 0) as inpercentage,
    round(If_OutOctets / 1000*100, 0) as outpercentage,
    Received_Hc_UniCast_Pkts,
    Received_UniCast_Pkts,
    Transmitted_Hc_UniCast_Pkts=-1 as speed
  FROM
    ports AS p
  JOIN (
    SELECT
      device_id,
      port_name,
      MAX(i_ts) AS max_i_ts
    FROM
      traffic_info
    WHERE
      device_id = ${data.device_id}
    GROUP BY
      device_id, port_name
  ) AS max_ts
  ON
    p.device_id = max_ts.device_id
    AND p.if_name = max_ts.port_name
  JOIN
    traffic_info AS ti
  ON
    max_ts.device_id = ti.device_id
    AND max_ts.port_name = ti.port_name
    AND max_ts.max_i_ts = ti.i_ts
JOIN
    devices  AS d
  ON
   d.device_id = ti.device_id
    AND max_ts.port_name = ti.port_name
    AND max_ts.max_i_ts = ti.i_ts
  WHERE
    p.device_id = ${data.device_id}
  ORDER BY
    p.port_id ASC; `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};

/*****************************************************************************
* Function : upportslistMdl
* Description : this will shoows the ports list
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.upportslistMdl = function (data) {
  var fnm = "upportslistMdl"
  var QRY_TO_EXEC = ` SELECT
  p.device_id,
  p.if_name,
  d.hostname,
  p.if_mac_address,
  ti.i_ts,
  ti.If_InOctets,
  ti.If_OutOctets,
  round(If_InOctets / 1000*100, 0) as inpercentage,
  round(If_OutOctets / 1000*100, 0) as outpercentage,
  Received_Hc_UniCast_Pkts,
  Received_UniCast_Pkts,
  Transmitted_Hc_UniCast_Pkts=-1 as speed,
  p.if_oper_status
FROM
  ports AS p
left JOIN (
  SELECT
    device_id,
    port_name,
    MAX(i_ts) AS max_i_ts
  FROM
    traffic_info

  GROUP BY
    device_id, port_name
) AS max_ts
ON
  p.device_id = max_ts.device_id
  AND p.if_name = max_ts.port_name
left JOIN
  traffic_info AS ti
ON
  max_ts.device_id = ti.device_id
  AND max_ts.port_name = ti.port_name
  AND max_ts.max_i_ts = ti.i_ts
left JOIN
  devices  AS d
ON
 d.device_id = ti.device_id
  AND max_ts.port_name = ti.port_name
  AND max_ts.max_i_ts = ti.i_ts
WHERE
  p.if_oper_status=1
ORDER BY
  p.port_id ASC;  `;
  console.log(QRY_TO_EXEC);
  return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};

/*****************************************************************************
* Function : notpresentlistMdl
* Description : this will shoows the ports list
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.notpresentlistMdl = function (data) {
  var fnm = "notpresentlistMdl"
  var QRY_TO_EXEC = ` SELECT
  p.device_id,
  p.if_name,
  d.hostname,
  p.if_mac_address,
  ti.i_ts,
  ti.If_InOctets,
  ti.If_OutOctets,
  round(If_InOctets / 1000*100, 0) as inpercentage,
  round(If_OutOctets / 1000*100, 0) as outpercentage,
  Received_Hc_UniCast_Pkts,
  Received_UniCast_Pkts,
  Transmitted_Hc_UniCast_Pkts=-1 as speed,
  p.if_oper_status
FROM
  ports AS p
left JOIN (
  SELECT
    device_id,
    port_name,
    MAX(i_ts) AS max_i_ts
  FROM
    traffic_info

  GROUP BY
    device_id, port_name
) AS max_ts
ON
  p.device_id = max_ts.device_id
  AND p.if_name = max_ts.port_name
left JOIN
  traffic_info AS ti
ON
  max_ts.device_id = ti.device_id
  AND max_ts.port_name = ti.port_name
  AND max_ts.max_i_ts = ti.i_ts
left JOIN
  devices  AS d
ON
 d.device_id = ti.device_id
  AND max_ts.port_name = ti.port_name
  AND max_ts.max_i_ts = ti.i_ts
WHERE
  p.if_oper_status=6
ORDER BY
  p.port_id ASC;  `;
  console.log(QRY_TO_EXEC);
  return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};
