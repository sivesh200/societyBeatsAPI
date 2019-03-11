const User = require('../../models').User;
const Societys = require('../../models').Societys;
const UserFamilyDetails = require('../../models').users_family_details;
const FlatInfo = require('../../models').society_flat_info;
const TowerInfo = require('../../models').society_tower_info;
const authService = require('./../../services/AuthService');
const sms = require('../../bal/sms');
const common = require('../../bal/common');
var constants = require('../../middleware/constants');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;

    if (!body.unique_key && !body.email && !body.phone) {
        return ReE(res, 'Please enter an email or phone number to register.');
    } else {
        let err, user, flatInfo, strMessage;
        body.type = 1;
        body.status = constants.Status.ACTIVE;
        if (body.is_primary == "False") {
            body.status = constants.Status.INACTIVE;
        }

        [err, flatInfo] = await to(FlatInfo.findOne({
            where: {
                flat_token_no: body.flat_token_no
            }
        }));

        if (flatInfo == undefined || flatInfo == "") {
            return ReE(res, 'Invalid Flat Token. Please try again.');
        } else {
            body.society_id = flatInfo.society_id;
            body.flat_id = flatInfo.id;
            body.flat_token_no = flatInfo.flat_token_no;
            body.is_email_verified = 'False';
            body.is_phone_verified = 'True';
            body.picture = "no-image.png";

            if (body.is_family_module == true) {
                body.is_phone_verified = 'False';
                body.password = "demo123";
                body.status = constants.Status.ACTIVE;
            }

            [err, user] = await to(authService.createUser(body));
            // if (user != undefined) {
            //     [err, user] = await to(fillFullAddress(user));

            //     if (body.is_family_module == true) {
            //         strMessage = "Family member added successfully.";
            //     }
            // }
            if (user != undefined) {
                var tempUser = [];
                tempUser.push(user);
                [err, tempUser] = await to(fillFullAddress(tempUser));

                if (tempUser != undefined && tempUser.length > 0) {
                    user = tempUser[0];
                }

                if (body.is_family_module == true) {
                    strMessage = "Family member added successfully.";
                }
            }

            strMessage = "Successfully created new user.";
        }

        if (err) return ReE(res, err, 422);
        return ReS(res, {
            message: strMessage,
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

const GetAllUser = async function (req, res) {
    let err, data;
    [err, data] = await to(User.findAll({
        where: {
            type: {
                [Op.ne]: 4
            }
        }
    }));

    if (data != undefined) {
        [err, data] = await to(fillFullAddress(data));
    }

    if (err) {
        return ReE(res, err);
    }
    return ReS(res, {
        success: true,
        data: data
    });
}
module.exports.GetAllUser = GetAllUser;

const SearchUserByName = async function (req, res) {
    let err, data;
    const params = req.params;
    [err, data] = await to(User.findAll({
        first: {
            $like: '%' + params.name + "%"
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
module.exports.SearchUserByName = SearchUserByName;

const update = async function (req, res) {
    let err, user, data;
    user = req.user;
    //req.body.picture = common.cryptorandomString();

    if (req.body.picture != undefined && req.body.picture != null) {
        [err, imageName] = await to(common.base64FileUpload(req.body.picture, constants.Upload.PROFILE));
        req.body.picture = imageName;
    }

    if (req.body.is_family_module == true) {

        [err, user] = await to(User.findOne({
            where: {
                id: req.body.id
            }
        }));
        if (user == undefined) {
            return ReE(res, 'Family member not found.');
        }
        if (user.status!= undefined && user.status== constants.Status.REJECT) {
            [err, user] = await to(user.destroy());
            if (err) return ReE(res, 'error occured trying to delete user');
            return ReS(res, {
                success: true,
                data: user
            });
        }

    }

    data = req.body;
    user.set(data);

    [err, userResponse] = await to(user.save());

    if (err) {
        if (err.message == 'Validation error') err = 'The email address or phone number is already in use';
        return ReE(res, err);
    }
    return ReS(res, {
        success: true,
        data: userResponse
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
    let err, user;

    [err, user] = await to(authService.authUser(req.body));
    if (user != undefined) {
        var tempUser = [];
        tempUser.push(user);
        [err, tempUser] = await to(fillFullAddress(tempUser));

        if (tempUser != undefined && tempUser.length > 0) {
            user = tempUser[0];
        }
    }

    if (err) return ReE(res, err, 422);
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

const check_primary_user = async function (req, res) {
    const body = req.body;
    let err, user, flatInfo;

    [err, flatInfo] = await to(FlatInfo.findOne({
        where: {
            society_id: body.society_id,
            tower_id: body.tower_id,
            flat_address: body.flat_no,
        }
    }));

    if (flatInfo == undefined || flatInfo == "") {
        return ReE(res, 'Invalid Flat Number.');
    }

    [err, user] = await to(User.findOne({
        where: {
            society_id: flatInfo.society_id,
            flat_id: flatInfo.id,
            flat_token_no: flatInfo.flat_token_no
        }
    }));
    return res.json({
        success: true,
        data: {
            user: user,
            flatInfo: flatInfo
        }
    });
}
module.exports.check_primary_user = check_primary_user;

const forgot_password = async function (req, res) {
    const params = req.params;
    let strdata = null;
    [err, user] = await to(User.findOne({
        where: {
            email: params.email
        }
    }));
    if (user == null) {
        strdata = {
            success: false,
            message: "Invalid email id."
        };
    } else {
        let otp = Math.floor(1000 + Math.random() * 9000);
        sms.sendSMS(user.phone, "OTP is :" + otp);
        strdata = {
            success: true,
            message: "Successfully sms sent on your mobile no." + "OTP -" + otp
        };
    }
    return res.json(strdata);
}
module.exports.forgot_password = forgot_password;

const validateMobileNumber = async function (req, res) {
    const body = req.body;
    let strdata;
    if (body.phone == undefined || body.phone == "") {
        return ReE(res, 'Mobile Number Requried.');
    } else {
        let otp = Math.floor(1000 + Math.random() * 9000);
        sms.sendSMS(body.phone, "Verify your number.OTP is :" + otp);
        strdata = {
            success: true,
            otp: otp
        };
    }

    return res.json(strdata);
}
module.exports.validateMobileNumber = validateMobileNumber;


const change_password = async function (req, res) {
    let err, user, data
    user = req.user;
    data = req.body;
    user.set(data);

    [err, user] = await to(user.save());
    if (err) {
        if (err.message == 'Validation error') err = 'The email address or phone number is already in use';
        return ReE(res, err);
    }
    sms.sendSMS(user.phone, "Successfully changed password.");
    return ReS(res, {
        message: 'Updated User: ' + user.email
    });
}
module.exports.change_password = change_password;

const create_new_password = async function (req, res) {
    let err, user, data
    data = req.body;
    if (data.phone == undefined) {
        return ReE(res, "Phone is Required.");
    }

    [err, user] = await to(User.findOne({
        where: {
            phone: data.phone
        }
    }));
    if (user == null) {
        return ReS(res, {
            message: 'Invalid mobile number.'
        }, 200);
    }
    user.set(data);
    [err, user] = await to(user.save());
    if (err) {
        if (err.message == 'Validation error') err = 'Invalid mobile number.';
        return ReE(res, err);
    }
    return ReS(res, {
        message: 'Password updated successfully.'
    });
}
module.exports.create_new_password = create_new_password;

const fillFullAddress = async function (user) {

    if (user != undefined && user.length > 0) {

        for (var i = 0, len = user.length; i < len; i++) {
            var item = user[i];
            if (item.flat_id != undefined && item.flat_id != null) {
                [err, flatInfo] = await to(FlatInfo.findOne({
                    where: {
                        society_id: item.society_id,
                        id: item.flat_id
                    }
                }));

                if (flatInfo != undefined) {
                    [err, towerInfo] = await to(TowerInfo.findOne({
                        where: {
                            id: flatInfo.tower_id
                        }
                    }));
                }

                [err, societys] = await to(Societys.findOne({
                    where: {
                        id: item.society_id
                    }
                }));

                if (societys != undefined) {
                    user[i].address = flatInfo.flat_address + ", " + towerInfo.title + ", " + societys.full_address;
                }
            }
        }
    }

    return user;
}