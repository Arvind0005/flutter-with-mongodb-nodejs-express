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
    }   
}

module.exports = functions;