var db=require("./db")

exports.sel_second_by_data=function(uid,today,callback){
    var sql="select water_station.station_name,water_photo.photo_staff_gauge,water_photo.photo_dushu,water_station.station_history_high_value,water_photo.photo_day,water_station.station_id,water_station.station_baozheng_value,water_station.station_jingjie_value,water_station.station_up_id,water_station.station_down_id from water_user,water_region,water_group,water_station,water_camera,water_photo where water_user.province_id=water_region.province_id  and water_region.region_id=water_group.region_id  and water_group.group_id=water_station.group_id  and water_station.station_id=water_camera.station_id and water_camera.camera_id=water_photo.camera_id and water_user.user_id=? and water_photo.photo_day>? "
    db.query(sql,[uid,today],callback);
}

exports.sel_chart_by_data=function(uid,today,stationId,callback){
    var sql="select water_station.station_name,water_photo.photo_staff_gauge,water_photo.photo_dushu,water_station.station_history_high_value,water_photo.photo_day,water_station.station_id,water_station.station_baozheng_value,water_station.station_jingjie_value,water_station.station_up_id,water_station.station_down_id from water_user,water_region,water_group,water_station,water_camera,water_photo where water_user.province_id=water_region.province_id  and water_region.region_id=water_group.region_id  and water_group.group_id=water_station.group_id  and water_station.station_id=water_camera.station_id and water_camera.camera_id=water_photo.camera_id and water_user.user_id=? and water_photo.photo_day>? and water_station.station_id=?"
    db.query(sql,[uid,today,stationId],callback);
}

exports.sel_history_by_data=function(uid,now,stationId,callback){
    var sql="select water_station.station_name ,water_photo.photo_dushu,water_station.station_history_high_value,water_photo.photo_day,water_station.station_id,water_photo.photo_time from water_user,water_region,water_group,water_station,water_camera,water_photo where water_user.province_id=water_region.province_id  and water_region.region_id=water_group.region_id  and water_group.group_id=water_station.group_id  and water_station.station_id=water_camera.station_id and water_camera.camera_id=water_photo.camera_id and water_user.user_id=? and water_photo.photo_day>? and water_station.station_id=?"
    db.query(sql,[uid,now,stationId],callback);
}

exports.sel_near_by_data=function(uid,stationId,callback){
    var sql="select * from water_user,water_region,water_group,water_station,water_camera,water_photo where water_user.province_id=water_region.province_id  and water_region.region_id=water_group.region_id  and water_group.group_id=water_station.group_id  and water_station.station_id=water_camera.station_id and water_camera.camera_id=water_photo.camera_id and water_user.user_id=? and water_station.station_id=?"
    db.query(sql,[uid,stationId],callback);
}

exports.sel_more_by_data=function(uid,stationId,callback){
    var sql="select * from water_user,water_region,water_group,water_station,water_camera,water_photo where water_user.province_id=water_region.province_id  and water_region.region_id=water_group.region_id  and water_group.group_id=water_station.group_id  and water_station.station_id=water_camera.station_id and water_camera.camera_id=water_photo.camera_id and water_user.user_id=? and water_station.station_id=?"
    db.query(sql,[uid,stationId],callback);
}

exports.sel_third_by_data=function(uid,time,callback){
    var sql="select water_station.station_name ,water_photo.photo_dushu,water_photo.photo_day,water_station.station_id,water_station.station_river_name from water_user,water_region,water_group,water_station,water_camera,water_photo where water_user.province_id=water_region.province_id  and water_region.region_id=water_group.region_id  and water_group.group_id=water_station.group_id  and water_station.station_id=water_camera.station_id and water_camera.camera_id=water_photo.camera_id and water_user.user_id=? and water_photo.photo_day>? and water_station.station_status=1"
    db.query(sql,[uid,time],callback);
}