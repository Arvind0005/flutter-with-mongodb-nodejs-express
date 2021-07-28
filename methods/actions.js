var User = require('../models/user');
var jwt = require('jwt-simple');
var config = require('../config/dbConfig');

var functions ={

    addnew: function(req,res)
    {
        if((!req.body.name) || (!req.body.password))
        {
            res.json({sucess:false,msg:'Enter all the credentials'});
        }
        else
        {
            var newUser = User({
                name: req.body.name,
                password: req.body.password,
            });
            newUser.save(function(err,newUser)
            {
                if(err)
                {
                    res.json({sucess:false,msg:"failed to save"});
                }
                else
                {
                    res.json({sucess:true,msg:"sucessfully saved"});
                }
            })
        }
    },
    authenticate: function(req,res)
    {
        User.findOne(
            {
                name:req.body.name,
            },function(err,user)
            {
               // console.log(`name:${req.body.name}`)
                console.log("error:");
                console.log(err);
                console.log(`user =${user}`);
                if(err) throw err;
                if(!user)
                {
                    res.status(403).send({success:"failed",msg:"Authentication Failed, User did not match"});
                }
                else
                {
                    user.comparePassword(req.body.password,function(err,ismatch)
                    {
                        if(ismatch && !err)
                        {
                            var token = jwt.encode(user,config.secret);
                            res.json({sucess: true, token:token});
                        }
                        else
                        {
                            res.status(403).send({sucess:false,msg:"Authentication failed,wrong password."})
                        }
                    })
                }
            }
        )
    }
}

module.exports = functions;