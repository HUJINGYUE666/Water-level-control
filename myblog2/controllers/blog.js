var Blog_model=require("../models/blog_model.js");
// var moment=require("moment");

// exports.more=function(req,res,next){
// 	var uid=req.session.USER_ID;
// 	Blog_model.sel_uid_by_data(uid,function(err,data){
// 		// console.log(data);
// 		res.render("index_logined",{
// 			'blogs':data,
// 			'sess':req.session,
// 		})
// 	});
// }