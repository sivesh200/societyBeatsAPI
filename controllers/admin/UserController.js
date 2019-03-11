const User = require('../../models').User;
const UserFamilyDetails = require('../../models').users_family_details;
const authService = require('./../../services/AuthService');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;

    if (!body.unique_key && !body.email && !body.phone) {
        return ReE(res, 'Please enter an email or phone number to register.');
    } else if (!body.password) {
        return ReE(res, 'Please enter a password to register.');
    } else {
        let err, user;
        
        if(body.service_type==undefined)
        {
            body.type=5;
        }
        else
        {
            body.type=4;
        }
        
        [err, user] = await to(authService.createUser(body));

        if (err) return ReE(res, err, 422);
        return ReS(res, {
            message: 'Successfully created.',
            user: user.toWeb(),
            token: user.getJWT()
        }, 201);
    }
}
module.exports.create = create;

const get = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;

    return ReS(res, {
        user: user.toWeb()
    });
}
module.exports.get = get;

const GetAllUser = async function(req, res){
    let err, data;
    [err, data] = await to(User.findAll());

    if (err) {
        return ReE(res, err);
    }
    return ReS(res, {
        success: true,
        data: data
    });
}
module.exports.GetAllUser = GetAllUser;

const GetAllStaff = async function(req, res){
    let err, data;
    [err, data] = await to(User.findAll({
        where: {
            type: 5
        }
    }));

    if (err) {
        return ReE(res, err);
    }
    return ReS(res, {
        success: true,
        data: data
    });
}
module.exports.GetAllStaff = GetAllStaff;

const SearchUserByName = async function(req, res){
    let err, data;
    const params = req.params;
    [err, data] = await to(User.findAll(
        {
            first: {
                $like: '%' + params.name + "%"
            }            
        }
    ));

    if (err) {
        return ReE(res, err);
    }
    return ReS(res, {
        success: true,
        data: data
    });
}
module.exports.SearchUserByName = SearchUserByName;

const update = async function (req, res) {
    let err, user, data,userFamily,userResponse;
    user = req.user;
    data = req.body;
    user.set(data);

    [err, userResponse] = await to(user.save());
    if (data.family_details != null || data.family_details.length > 0) {
        //await to(user.save());
        for (var i = 0, len = data.family_details.length; i < len; i++) {
            var item = data.family_details[i];
            [err, user_family] = await to(UserFamilyDetails.findAll({
                where: {
                    user_id: user.id,
                    mobile_number: item.mobile_number
                }
            }));
            if(user_family.length<=0)
            {
                [err, userFamily] = await to(UserFamilyDetails.create(item));
            }
        }
    }

    if (err) {
        if (err.message == 'Validation error') err = 'The email address or phone number is already in use';
        return ReE(res, err);
    }
    return ReS(res, {
        message: 'Updated User: ' + user.email
    });
}
module.exports.update = update;

const remove = async function (req, res) {
    let user, err;
    user = req.user;

    [err, user] = await to(user.destroy());
    if (err) return ReE(res, 'error occured trying to delete user');

    return ReS(res, {
        message: 'Deleted User'
    }, 204);
}
module.exports.remove = remove;


const login = async function (req, res) {
    const body = req.body;
    let err, user, user_family;

    [err, user] = await to(authService.authUser(req.body));
    if (err) return ReE(res, err, 200);
    [err, user_family] = await to(UserFamilyDetails.findAll({
        where: {
            user_id: user.id
        }
    }));
    if (err) return ReE(res, err, 200);
    user.family_details = user_family;
    return ReS(res, {
        token: user.getJWT(),
        user: user.toWeb()
    });
}
module.exports.login = login;

const logout = async function (req, res) {
    return ReS(res, {
        success: true,
        data: "Successfully Logout"
    });
}
module.exports.logout = logout;


const forgot_password = async function (req, res) {
    const params = req.params;
    let strdata = null;
    [err, user] = await to(User.findOne({
        where: {
            email: params.email
        }
    }));
    if (err) return ReE(res, err, 200);
    if (user == null) {
        strdata = {
            success: false,
            message: "Invalid email id."
        };
    } else {
        let otp = Math.floor(1000 + Math.random() * 9000);
        strdata = {
            success: true,
            message: "Successfully mail sent on your email id." + "OTP -" + otp
        };
    }
    return res.json(strdata);
}
module.exports.forgot_password = forgot_password;

const change_password = async function (req, res) {
    let err, user, data
    user = req.user;
    data = req.body;
    user.set(data);

    [err, user] = await to(user.save());
    if (err) {
        if (err.message == 'Validation error') err = 'The email address or phone number is already in use';
        return ReE(res, err,200);
    }
    return ReS(res, {
        message: 'Updated User: ' + user.email
    });
}
module.exports.change_password = change_password;

const create_new_password = async function (req, res) {
    let err, user, data
    data = req.body;
    if (data.email == undefined) {
        return ReE(res, "EmailId Required.");
    }

    [err, user] = await to(User.findOne({
        where: {
            email: data.email
        }
    }));
    if (err) return ReE(res, err, 200);
    if (user == null) {
        return ReS(res, {
            message: 'Invalid email id.'
        }, 200);
    }
    user.set(data);
    [err, user] = await to(user.save());
    if (err) {
        if (err.message == 'Validation error') err = 'Invalid email id.';
        return ReE(res, err),200;
    }
    return ReS(res, {
        message: 'Updated User: ' + user.email
    });
}
module.exports.create_new_password = create_new_password;