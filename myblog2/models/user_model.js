var db=require("./db.js");

exports.sel_name_by_pwd=function(name,pwd,callback){
	var sql="select * from water_user where username=? and password=?";
	db.query(sql,[name,pwd],callback);
} 