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
    var QRY_TO_EXEC = ` SELECT d.device_id,d.com_str,d.udp_port,d.hostname as 'catched_ip',di.sys_name as 'system_name',di.sys_desc as 'operating_system',di.uptime,di.sys_serialnumber
    ,di.sys_version as 'version'
         FROM devices as d
       join device_info as di on di.device_id=d.device_id where d.device_id=${data.device_id}   `;
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
    var QRY_TO_EXEC = ` 

    SELECT 
        d.com_str,
        d.udp_port,
        ROUND(s.sys_voltage / 10, 3) AS voltage,
        d.hostname AS 'device',
        s.sys_activefan,
        ROUND(s.sys_temperature / 10) AS system_tempereature,
        s.sys_fanspeed,
        ROUND(s.sys_processor_temp / 10) AS Processor_temperature,
        ROUND(s.sys_power / 10, 3) AS power,
        ROUND(s.sys_current / 1000, 2) AS Current,
        ROUND(s.sys_processor_frequency / 1000, 2) AS frequency,
        case when s.sys_primary_powersupplyrate= 1 then 'true' else 'false' end  as sys_primary_powersupplyrate,
        case when s.sys_backup_powersupplyrate = 1 then 'true' else 'false' end as sys_backup_powersupplyrate
    FROM
        sensors AS s
    JOIN
        devices AS d ON d.device_id = s.device_id
    WHERE
        d.device_id =${data.device_id}  `;
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
    join device_info as di on di.device_id=d.device_id 
    where d.ignores=0  group by d.device_id;`;
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
    var QRY_TO_EXEC = `   SELECT 
    (s.sys_processor_frequency DIV 100) AS processor,
    ROUND(d.sys_used_memory * 1024,0) AS used_Memory,
  d.sys_total_memory  AS total_memory,
    ROUND(((d.sys_used_memory*1024) / (d.sys_total_memory * 1024) * 100),0) AS percentage,
    ROUND(ABS(d.sys_used_memory / d.sys_total_memory * 100 - 100), 0) AS remaining_percentage,
    d.sys_mem_type,
    ROUND(d.sys_used_disk  * 1024) AS used_disk,
    ROUND(d.sys_total_disk  * 1024) AS total_disk,
    round((d.sys_used_disk  * 1024) / (d.sys_total_disk  * 1024) *100,0) as storage_percentage,
    round(sys_total_disk*1024 - sys_used_disk*1024) as 'Remaining_storage',
    round(d.sys_total_memory * 1024 - d.sys_used_memory * 1024) as 'Remaining_memory',
    round( ABS((d.sys_used_disk  * 1024 )/ (d.sys_total_disk  * 1024) *100-100 )) as remaining_storage_percentage
  FROM sensors AS s
  JOIN device_info AS d ON d.device_id = s.device_id
  WHERE d.device_id =${data.device_id} `;
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
    var QRY_TO_EXEC = ` select d.hostname, di.uptime, di.sys_desc, d.device_id, di.sys_name, COUNT(p.device_id) AS port_count
    FROM devices AS d
    left join  device_info as di on di.device_id = d.device_id
    left join ports AS p on p.device_id = d.device_id
    where d.ignores=0
    group by d.hostname, di.uptime, di.sys_desc, d.device_id, di.sys_name; `;
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
    CASE WHEN p.if_oper_status = 1 THEN p.if_name  END AS up,
    CASE WHEN p.if_oper_status = 2 THEN p.if_name END AS down,
    p.if_index
    
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
    var QRY_TO_EXEC = `   SELECT
    p.device_id,
    p.if_name,
    p.if_oper_status,
    p.if_index,
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
  var QRY_TO_EXEC = `  SELECT
  p.device_id,
  p.if_name,
  d.hostname,
  p.if_mac_address,
  p.if_index,
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
* Function : upportslistMdl
* Description : this will shoows the ports list
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.upportslistMdl = function (data) {
  var fnm = "upportslistMdl"
  var QRY_TO_EXEC = `  SELECT
  p.device_id,
  p.if_name,
  d.hostname,
  p.if_mac_address,
  p.if_index,
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
* Function : idwiseportslistMdl
* Description : this will shoows the ports list
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.idwiseportslistMdl = function (data) {
    var fnm = "idwiseportslistMdl"
    var QRY_TO_EXEC = `        SELECT
    p.device_id,
    p.if_name,
    d.hostname,
    p.if_mac_address,
    p.if_index, 
    ti.i_ts,
    ti.If_InOctets,
    ti.If_OutOctets,
    round(If_InOctets / 1000*100, 0) as inpercentage,
    round(If_OutOctets / 1000*100, 0) as outpercentage,
    Received_Hc_UniCast_Pkts,
    Received_UniCast_Pkts,
    Transmitted_Hc_UniCast_Pkts=-1 as speed, d.com_str,
    d.udp_port
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
      device_id =${data.device_id}
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
    p.device_id =${data.device_id}
  ORDER BY
    p.port_id ASC;   `;
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
  var QRY_TO_EXEC = `  SELECT
  p.device_id,
  p.if_name,
  d.hostname,
  p.if_mac_address,
  p.if_index, 
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
  p.port_id ASC; `;
  console.log(QRY_TO_EXEC);
  return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};

/*****************************************************************************
* Function : AllstoragelistMdl
* Description : this will shoows the ports list
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.AllstoragelistMdl = function (data) {
  var fnm = "AllstoragelistMdl"
  var QRY_TO_EXEC = `SELECT d.hostname,d.device_id,d.sys_disk_type,
  (s.sys_processor_frequency DIV 100) AS processor,
  ROUND(d.sys_used_memory * 1024,0) AS used_Memory,
d.sys_total_memory  AS total_memory,
  ROUND(((d.sys_used_memory*1024) / (d.sys_total_memory * 1024) * 100),0) AS percentage,
  ROUND(ABS(d.sys_used_memory / d.sys_total_memory * 100 - 100), 0) AS remaining_percentage,
  d.sys_mem_type,
  ROUND(d.sys_used_disk  * 1024) AS used_disk,
  ROUND(d.sys_total_disk  * 1024) AS total_disk,
  round((d.sys_used_disk  * 1024) / (d.sys_total_disk  * 1024) *100,0) as storage_percentage,
  round(sys_total_disk*1024 - sys_used_disk*1024) as 'Remaining_storage',
  round(d.sys_total_memory * 1024 - d.sys_used_memory * 1024) as 'Remaining_memory',
  round( ABS((d.sys_used_disk  * 1024 )/ (d.sys_total_disk  * 1024) *100-100 )) as remaining_storage_percentage
FROM sensors AS s
JOIN device_info AS d ON d.device_id = s.device_id   
`;
  console.log(QRY_TO_EXEC);
  return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};


/*****************************************************************************
* Function : deletedeviceMdl
* Description : this will shoows the ports list
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.deletedeviceMdl = function (data) {
  var fnm = "deletedeviceMdl"
  var QRY_TO_EXEC = `delete from devices where device_id=${data.device_id}  `;
  console.log(QRY_TO_EXEC);
  return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};

/*****************************************************************************
* Function : deletedevicedropdownlistMdl
* Description : this will shoows the ports list
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.deletedevicedropdownlistMdl = function (data) {
  var fnm = "deletedevicedropdownlistMdl"
  var QRY_TO_EXEC = ` select hostname,device_id from devices   `;
  console.log(QRY_TO_EXEC);
  return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};

/*****************************************************************************
 * Function : notificationMdl
* Description : this will shoows the ports list
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.notificationMdl = function (data) {
  var fnm = "notificationMdl"
  var QRY_TO_EXEC = ` select device_id,hostname VALUE , 'Device Down' descrip,datediff(current_timestamp(),u_ts) as days from devices where status =0;   `;
  console.log(QRY_TO_EXEC);
  return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};

/*****************************************************************************
 * Function : detaildeviceuplistMdl
* Description : this will shoows the ports list
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.detaildeviceuplistMdl = function (data) {
  var fnm = "detaildeviceuplistMdl"
  var QRY_TO_EXEC = ` select d.hostname, di.uptime, di.sys_desc, d.device_id, di.sys_name, COUNT(p.device_id) AS port_count
  FROM devices AS d
  left join  device_info as di on di.device_id = d.device_id
  left join ports AS p on p.device_id = d.device_id
  where di.ip_status=1
  group by d.hostname, di.uptime, di.sys_desc, d.device_id, di.sys_name;  `;
  console.log(QRY_TO_EXEC);
  return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};

/*****************************************************************************
 * Function : basicdeviceuplistMdl
* Description : this will shoows the ports list
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.basicdeviceuplistMdl = function (data) {
  var fnm = "basicdeviceuplistMdl"
  var QRY_TO_EXEC = `select d.hostname,di.sys_desc,di.uptime,d.device_id from devices as d 
  join device_info as di on di.device_id=d.device_id 
  where di.ip_status=1 group by d.device_id  `;
  console.log(QRY_TO_EXEC);
  return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};

/*****************************************************************************
 * Function : detaildevicedownlistMdl
* Description : this will shoows the ports list
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.detaildevicedownlistMdl = function (data) {
  var fnm = "detaildevicedownlistMdl"
  var QRY_TO_EXEC = ` select d.hostname, di.uptime, di.sys_desc, d.device_id, di.sys_name, COUNT(p.device_id) AS port_count
  FROM devices AS d
  left join  device_info as di on di.device_id = d.device_id
  left join ports AS p on p.device_id = d.device_id
  where di.ip_status=0
  group by d.hostname, di.uptime, di.sys_desc, d.device_id, di.sys_name;  `;
  console.log(QRY_TO_EXEC);
  return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};

/*****************************************************************************
 * Function : basicdevicedownlistMdl
* Description : this will shoows the ports list
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.basicdevicedownlistMdl = function (data) {
  var fnm = "basicdevicedownlistMdl"
  var QRY_TO_EXEC = `select d.hostname,di.sys_desc,di.uptime,d.device_id from devices as d 
  join device_info as di on di.device_id=d.device_id 
  where di.ip_status=0 group by d.device_id  `;
  console.log(QRY_TO_EXEC);
  return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};

/*****************************************************************************
 * Function : eventlogsMdl
* Description : this will shoows the ports list
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.eventlogsMdl = function (data) {
  var fnm = "eventlogsMdl"
  var QRY_TO_EXEC = `select * from eventlog order by event_id desc `;
  console.log(QRY_TO_EXEC);
  return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};

/*****************************************************************************
 * Function : basicdevicedownlistMdl
* Description : this will shoows the ports list
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.basicdevicedownlistMdl = function (data) {
  var fnm = "basicdevicedownlistMdl"
  var QRY_TO_EXEC = `  select d.hostname, di.uptime, di.sys_desc, d.device_id, di.sys_name, COUNT(p.device_id) AS port_count
  FROM devices AS d
  left join  device_info as di on di.device_id = d.device_id
  left join ports AS p on p.device_id = d.device_id
  where d.ignores=1
  group by d.hostname, di.uptime, di.sys_desc, d.device_id, di.sys_name   `;
  console.log(QRY_TO_EXEC);
  return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};

/*****************************************************************************
 * Function : ignoredetailsMdl
* Description : this will shoows the ports list
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.ignoredetailsMdl = function (data) {
  var fnm = "ignoredetailsMdl"
  var QRY_TO_EXEC = `  select d.hostname, di.uptime, di.sys_desc, d.device_id, di.sys_name, COUNT(p.device_id) AS port_count
  FROM devices AS d
  left join  device_info as di on di.device_id = d.device_id
  left join ports AS p on p.device_id = d.device_id
  where d.ignores=1
  group by d.hostname, di.uptime, di.sys_desc, d.device_id, di.sys_name;   `;
  console.log(QRY_TO_EXEC);
  return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};
/*****************************************************************************
 * Function : disablelistMdl
* Description : this will shoows the ports list
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.disablelistMdl = function (data) {
  var fnm = "disablelistMdl"
  var QRY_TO_EXEC = ` select d.hostname, di.uptime, di.sys_desc, d.device_id, di.sys_name, COUNT(p.device_id) AS port_count
  FROM devices AS d
  left join  device_info as di on di.device_id = d.device_id
  left join ports AS p on p.device_id = d.device_id
  where d.disabled=1
  group by d.hostname, di.uptime, di.sys_desc, d.device_id, di.sys_name;   `;
  console.log(QRY_TO_EXEC);
  return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};

/*****************************************************************************
 * Function : detailsstatuspageMdl
* Description : this will shoows the ports list
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.detailsstatuspageMdl = function (data) {
  var fnm = "detailsstatuspageMdl"
  var QRY_TO_EXEC = `SELECT 
  d.device_id,
  d.hostname,
  (s.sys_processor_frequency DIV 100) AS processor,
  d.uptime,
  ROUND(d.sys_used_memory * 1024,0) AS used_Memory,
d.sys_total_memory  AS total_memory,
  ROUND(((d.sys_used_memory*1024) / (d.sys_total_memory * 1024) * 100),0) AS percentage,
  ROUND(ABS(d.sys_used_memory / d.sys_total_memory * 100 - 100), 0) AS remaining_percentage,
  d.sys_mem_type,
  ROUND(d.sys_used_disk  * 1024) AS used_disk,
  ROUND(d.sys_total_disk  * 1024) AS total_disk,
  round((d.sys_used_disk  * 1024) / (d.sys_total_disk  * 1024) *100,0) as storage_percentage,
  round(sys_total_disk*1024 - sys_used_disk*1024) as 'Remaining_storage',
  round(d.sys_total_memory * 1024 - d.sys_used_memory * 1024) as 'Remaining_memory',
  round( ABS((d.sys_used_disk  * 1024 )/ (d.sys_total_disk  * 1024) *100-100 )) as remaining_storage_percentage
FROM sensors AS s
JOIN device_info AS d ON d.device_id = s.device_id `;
  console.log(QRY_TO_EXEC);
  return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};
/*****************************************************************************
 * Function : geolocationMdl
* Description : this will shoows the ports list
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.geolocationMdl = function (data) {
  var fnm = "geolocationMdl"
  var QRY_TO_EXEC = `INSERT INTO locations (name) values ('${data.name}') `;
  console.log(QRY_TO_EXEC);
  return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};

/*****************************************************************************
 * Function : sensorpresentlistMdl
* Description : this will shoows the ports list
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.sensorpresentlistMdl = function (data) {
  var fnm = "sensorpresentlistMdl"
  var QRY_TO_EXEC = ` select  s.device_id, di.hostname,s.sys_voltage value, 'voltage' descrip
  from sensors as s
  join device_info as di on s.device_id=di.device_id
where s.sys_voltage not in ('No Such Object currently exists at this OID')
  union all
  select  s.device_id, di.hostname,s.sys_activefan value, 'activefan' descrip
  from sensors as s
  join device_info as di on s.device_id=di.device_id
  where s.sys_activefan not in ('No Such Object currently exists at this OID')
  union all
  select  s.device_id, di.hostname,s.sys_temperature value, 'Temperature' descrip
  from sensors as s
  join device_info as di on s.device_id=di.device_id
  where s.sys_temperature not in ('No Such Object currently exists at this OID')
  union all
  select  s.device_id, di.hostname,s.sys_fanspeed value, 'Fanspeed' descrip
  from sensors as s
  join device_info as di on s.device_id=di.device_id
  where s.sys_fanspeed not in ('No Such Object currently exists at this OID') 
  union all
  select  s.device_id, di.hostname,s.sys_processor_temp value, 'Processor_temp' descrip
  from sensors as s
  join device_info as di on s.device_id=di.device_id
  where s.sys_processor_temp not in ('No Such Object currently exists at this OID')
  union all
  select  s.device_id, di.hostname,s.sys_power value, 'Power' descrip
  from sensors as s
  join device_info as di on s.device_id=di.device_id
  where s.sys_power not in ('No Such Object currently exists at this OID')
  union all
  select  s.device_id, di.hostname,s.sys_current value, 'Current' descrip
  from sensors as s
  join device_info as di on s.device_id=di.device_id
  where s.sys_current not in ('No Such Object currently exists at this OID')
  union all
  select  s.device_id, di.hostname,s.sys_processor_frequency value, 'Processor_Frequency' descrip
  from sensors as s
  join device_info as di on s.device_id=di.device_id
where s.sys_processor_frequency not in ('No Such Object currently exists at this OID')  `;
  console.log(QRY_TO_EXEC);
  return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};

/*****************************************************************************
 * Function : sensordownlistMdl
* Description : this will shoows the ports list
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.sensordownlistMdl = function (data) {
  var fnm = "sensordownlistMdl"
  var QRY_TO_EXEC = `   select  s.device_id, di.hostname,s.sys_voltage value, 'voltage' descrip
  from sensors as s
  join device_info as di on s.device_id=di.device_id
where s.sys_voltage  in ('No Such Object currently exists at this OID')
  union all
  select  s.device_id, di.hostname,s.sys_activefan value, 'activefan' descrip
  from sensors as s
  join device_info as di on s.device_id=di.device_id
  where s.sys_activefan  in ('No Such Object currently exists at this OID')
  union all
  select  s.device_id, di.hostname,s.sys_temperature value, 'Temperature' descrip
  from sensors as s
  join device_info as di on s.device_id=di.device_id
  where s.sys_temperature  in ('No Such Object currently exists at this OID')
  union all
  select  s.device_id, di.hostname,s.sys_fanspeed value, 'Fanspeed' descrip
  from sensors as s
  join device_info as di on s.device_id=di.device_id
  where s.sys_fanspeed  in ('No Such Object currently exists at this OID') 
  union all
  select  s.device_id, di.hostname,s.sys_processor_temp value, 'Processor_temp' descrip
  from sensors as s
  join device_info as di on s.device_id=di.device_id
  where s.sys_processor_temp  in ('No Such Object currently exists at this OID')
  union all
  select  s.device_id, di.hostname,s.sys_power value, 'Power' descrip
  from sensors as s
  join device_info as di on s.device_id=di.device_id
  where s.sys_power  in ('No Such Object currently exists at this OID')
  union all
  select  s.device_id, di.hostname,s.sys_current value, 'Current' descrip
  from sensors as s
  join device_info as di on s.device_id=di.device_id
  where s.sys_current  in ('No Such Object currently exists at this OID')
  union all
  select  s.device_id, di.hostname,s.sys_processor_frequency value, 'Processor_Frequency' descrip
  from sensors as s
  join device_info as di on s.device_id=di.device_id
where s.sys_processor_frequency  in ('No Such Object currently exists at this OID')  `;
  console.log(QRY_TO_EXEC);
  return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};

/*****************************************************************************
 * Function : ignoredeviceMdl
* Description : this will shoows the ports list
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.ignoredeviceMdl = function (data) {
  var fnm = "ignoredeviceMdl"
  var QRY_TO_EXEC = `update devices set ignores = 1 where device_id=${data.device_id}  `;
  console.log(QRY_TO_EXEC);
  return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};
/*****************************************************************************
 * Function : unignoredeviceMdl
* Description : this will shoows the ports list
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.unignoredeviceMdl = function (data) {
  var fnm = "unignoredeviceMdl"
  var QRY_TO_EXEC = `update devices set ignores = 0 where device_id=${data.device_id}  `;
  console.log(QRY_TO_EXEC);
  return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};

/*****************************************************************************
 * Function : ignorelistMdl
* Description : this will shoows the ports list
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.ignorelistMdl = function (data) {
  var fnm = "ignorelistMdl"
  var QRY_TO_EXEC = ` select device_id,hostname from devices where ignores=1  `;
  console.log(QRY_TO_EXEC);
  return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};

/*****************************************************************************
 * Function : notignorelistMdl
* Description : this will shoows the ports list
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.notignorelistMdl = function (data) {
  var fnm = "notignorelistMdl"
  var QRY_TO_EXEC = ` select device_id,hostname from devices where ignores=0  `;
  console.log(QRY_TO_EXEC);
  return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};

/*****************************************************************************
 * Function : locationslistMdl
* Description : this will shoows the ports list
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.locationslistMdl = function (data) {
  var fnm = "locationslistMdl"
  var QRY_TO_EXEC = ` select * from locations  `;
  console.log(QRY_TO_EXEC);
  return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};

/*****************************************************************************
 * Function : idwiseeventlogsMdl
* Description : this will shoows the ports list
* Arguments : callback function
* 04-11-2023 - RajKumar
*
******************************************************************************/
exports.idwiseeventlogsMdl = function (data) {
  var fnm = "idwiseeventlogsMdl"
  var QRY_TO_EXEC = ` select * from eventlog where hostname='${data.hostname}' order by event_id desc `;
  console.log(QRY_TO_EXEC);
  return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};