const BloodGroup = require('../../models').master_blood_groups;
const User = require('../../models').User;
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

const GetAllBloodGroup = async function (req, res) {

    let err, user, data;
    user = req.user;
    const params = req.params;

    [err, data] = await to(BloodGroup.findAll({}));
    if(data!=undefined)
    {
        if (data.length > 0 || data.length != undefined) {
            for (var i = 0, len = data.length; i < len; i++) {
                var item = data[i];
                [err, userDetails] = await to(User.findAll({
                    where: {
                        blood_group: item.title
                    }
                }));

                if (userDetails != undefined) {
                    data[i].total_user = userDetails.length;
                }
            }
        }
    }

    if (err) {
        return ReE(res, err);
    }
    return ReS(res, {
        success: true,
        data: data
    });

}
module.exports.GetAllBloodGroup = GetAllBloodGroup

const GetUserByBloodGroup = async function (req, res) {

    let err, user, data;
    user = req.user;
    const params = req.params;

    [err, data] = await to(User.findAll({
        where:         
        { 
            blood_group: params.blood_group
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
module.exports.GetUserByBloodGroup = GetUserByBloodGroup