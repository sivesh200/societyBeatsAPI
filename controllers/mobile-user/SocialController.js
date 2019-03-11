const User          		= require('../../models').User;
//var mail = require('../nodeMailerWithTemp');

const GetAllResidents = async function(req, res){
    let err, user, data
    user = req.user;
    data = req.body;

    [err, data] = await to(User.findAll());

    if(err){
        if(err.message=='Validation error') err = 'The email address or phone number is already in use';
        return ReE(res, err);
    }
    return ReS(res, {data :data});
}
module.exports.GetAllResidents = GetAllResidents