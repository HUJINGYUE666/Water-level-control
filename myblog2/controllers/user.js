var User_model=require("../models/user_model.js");

exports.login=function(req,res,next){
	var name=req.body.name;
    var pwd=req.body.pwd;
    // console.log(name,pwd)
	User_model.sel_name_by_pwd(name,pwd,function(err,data){
		if(data.length>0){
            //设置cookie session
            req.session=data[0]; //登录设置
            // console.log(data);
                res.json({ //result
                    code: 1,
                    msg: '成功'
                })
        }else{
            res.json({
                code: 0,
                msg: '失败'
            })
        }
	})
}
