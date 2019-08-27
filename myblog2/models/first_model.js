var db = require("./db")

exports.do_getNum = function(username,oneAgo,callback){//用户管理区域的当天各个站数据
  var sql = "SELECT water_photo.photo_dushu,water_station.station_id,water_station.station_name,water_station.station_jingjie_value,water_station.station_history_high_value,water_station.station_baozheng_value,water_photo.photo_day,water_photo.photo_time FROM water_user,water_photo,water_group,water_station,water_camera WHERE water_user.region_id=water_group.region_id AND water_group.group_id=water_station.group_id AND water_station.station_id=water_camera.station_id AND water_camera.camera_id=water_photo.camera_id AND water_camera.camera_use=1 AND water_user.username=? AND water_photo.photo_day>?"
  db.query(sql,[username,oneAgo],callback)
}
exports.do_getThreeNum = function(username,threeAgo,callback) {//用户管理区域的3天前各个站数据
  var sql = "SELECT water_photo.photo_dushu,water_station.station_jingjie_value,water_station.station_history_high_value,water_station.station_baozheng_value,water_photo.photo_day FROM water_user,water_photo,water_group,water_station,water_camera WHERE water_user.region_id=water_group.region_id AND water_group.group_id=water_station.group_id AND water_station.station_id=water_camera.station_id AND water_camera.camera_id=water_photo.camera_id AND water_camera.camera_use=1 AND water_user.username=? AND water_photo.photo_day>?"
  db.query(sql,[username,threeAgo],callback)
}
exports.do_getSevenNum = function(username,sevenAgo,callback){//用户管理区域的7天前各个站数据
  var sql = "SELECT water_photo.photo_dushu,water_station.station_jingjie_value,water_station.station_history_high_value,water_station.station_baozheng_value,water_photo.photo_day FROM water_user,water_photo,water_group,water_station,water_camera WHERE water_user.region_id=water_group.region_id AND water_group.group_id=water_station.group_id AND water_station.station_id=water_camera.station_id AND water_camera.camera_id=water_photo.camera_id AND water_camera.camera_use=1 AND water_user.username=? AND water_photo.photo_day>?"
  db.query(sql,[username,sevenAgo],callback)
}
exports.do_getStationInfo = function(username,callback){//根据用户名去找到用户管理的所有的站
  var sql = "SELECT water_region.region_name AS city,water_station.station_name AS stationname,water_group.group_name AS groupname,water_station.station_id FROM water_user,water_group,water_region,water_station WHERE water_user.username=? AND water_user.region_id=water_group.region_id AND water_group.group_id=water_station.group_id AND water_region.region_id=water_user.region_id"
  db.query(sql,[username],callback)
}

exports.do_getBasinInfo = function(username,oneAgo,callback){//根据用户名找当前流域的各个站数据
  var sql = "SELECT water_photo.photo_dushu,water_station.station_jingjie_value,water_station.station_baozheng_value,water_station.station_history_high_value FROM water_user,water_region,water_station,water_camera,water_photo WHERE water_user.region_id = water_region.region_id AND water_region.station_basin = water_station.station_basin AND water_camera.station_id = water_station.station_id AND water_photo.camera_id = water_camera.camera_id AND water_camera.camera_use = 1 AND water_user.username=? AND water_photo.photo_day>?"
  db.query(sql,[username,oneAgo],callback)
}

exports.do_getStationDetail = function(stationId,callback){//获取站详情
  var sql = "SELECT water_station.station_name,water_photo.photo_dushu,water_photo.photo_day,water_staffgauge.staffgauge_code,water_photo.photo_time,water_photo.photo_gaocheng,water_photo.photo_staff_gauge,water_station.station_jingjie_value,water_station.station_baozheng_value,water_station.station_history_high_value FROM water_station,water_camera,water_photo,water_staffgauge WHERE water_station.station_id=? AND water_camera.station_id=water_station.station_id AND water_staffgauge.camera_id=water_camera.camera_id AND water_photo.camera_id=water_camera.camera_id AND water_camera.camera_use=1 ORDER BY water_photo.photo_day DESC LIMIT 1"
  db.query(sql,[stationId],callback)
}
exports.do_upLastTime = function (nowtime,stationId,callback) {//更新最后查看时间
  var sql = "UPDATE water_station AS a INNER JOIN ( SELECT water_station.station_id FROM water_station, water_camera, water_photo, water_staffgauge WHERE water_station.station_id = ? AND water_camera.station_id = water_station.station_id AND water_staffgauge.camera_id = water_camera.camera_id AND water_photo.camera_id = water_camera.camera_id AND water_camera.camera_use = 1 ORDER BY water_photo.photo_day DESC LIMIT 1 ) AS b SET a.last_look_time=? WHERE a.station_id=b.station_id"
  db.query(sql,[stationId,nowtime],callback)
}

exports.do_getSevenNumByStation = function(photo_day,stationId,callback){//查看七天该站的数据用于折线图
  var sql = "SELECT water_photo.photo_dushu, water_photo.photo_day FROM water_station, water_camera, water_photo WHERE water_station.station_id = water_camera.station_id AND water_camera.camera_id = water_photo.camera_id AND water_photo.photo_day <= ? AND water_camera.camera_use = 1 AND water_station.station_id = ? ORDER BY water_photo.photo_day DESC LIMIT 8"
  db.query(sql,[photo_day,stationId],callback)
}

exports.do_getLastThree = function (username,callback) {//首页四个最近查看站
  var sql = "SELECT water_station.station_id, water_station.station_name, water_station.station_history_high_value, water_station.station_baozheng_value, water_station.station_jingjie_value, water_photo.photo_dushu, water_photo.photo_day, water_station.last_look_time FROM water_user, water_group, water_station, water_camera, water_photo WHERE water_user.username= ? AND water_user.region_id = water_group.region_id AND water_group.group_id = water_station.group_id AND water_station.station_id = water_camera.station_id AND water_camera.camera_id = water_photo.camera_id ORDER BY water_photo.photo_day DESC, water_station.last_look_time DESC LIMIT 3"
  db.query(sql,[username],callback)
}

exports.do_getBreak = function(username,callback){//查看故障站个数
  var sql = "SELECT COUNT(station_status) AS num FROM water_user,water_group,water_station WHERE water_user.username=? AND water_user.region_id=water_group.region_id AND water_station.group_id=water_group.group_id AND water_station.station_status=2"
  db.query(sql,[username],callback)
}

exports.do_getMapMark = function(username,callback){//地图模式的坐标数据
  var sql = "SELECT water_station.station_longitude AS x,water_station.station_latitude AS y,water_station.station_code AS code FROM water_user,water_group,water_region,water_station WHERE water_user.username=? AND water_user.region_id=water_group.region_id AND water_group.group_id=water_station.group_id AND water_region.region_id=water_user.region_id"
  db.query(sql,[username],callback)
}