const SocietyCommunities = require('../../models').society_communities;
const SocietyCommunitiesMembers = require('../../models').society_communities_members;
const User = require('../../models').User;
var constants = require('../../middleware/constants');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

const GetSocietyCommunities = async function (req, res) {

    let err, user, data, memberList;
    user = req.user;

    [err, data] = await to(SocietyCommunities.findAll({
        where: {
            society_id: user.society_id,
            status: constants.Status.ACTIVE
        },
        order: [
            ['updatedAt', 'DESC']
        ]
    }));

    [err, memberList] = await to(SocietyCommunitiesMembers.findAll({}));

    if (data != undefined) {

        if (data.length > 0 || data.length != undefined) {

            for (var i = 0, len = data.length; i < len; i++) {
                var item = data[i];
                var count = 0;
                var isJoin = "False";
                if (memberList != undefined) {
                    count = memberList.filter(x => x.communitie_id === item.id).length;
                    var JoinUnjoinList = memberList.filter(x => x.communitie_id === item.id && x.user_id == user.id).length;
                    if (JoinUnjoinList != undefined && JoinUnjoinList > 0) {
                        isJoin = "True";
                    }
                }
                data[i].isJoin = isJoin;
                data[i].total_members = count;
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
module.exports.GetSocietyCommunities = GetSocietyCommunities

const GetSocietyCommunitiesMemberByCommunitiesID = async function (req, res) {

    let err, data, userDetails;
    const params = req.params;

    [err, data] = await to(SocietyCommunitiesMembers.findAll({
        where: {
            communitie_id: params.communitie_id
        },
        order: [
            ['updatedAt', 'DESC']
        ]
    }));

    if (data != undefined) {
        if (data.length > 0 || data.length != undefined) {
            for (var i = 0, len = data.length; i < len; i++) {
                var item = data[i];
                [err, userDetails] = await to(User.findOne({
                    where: {
                        id: item.user_id
                    }
                }));

                if (userDetails != undefined) {
                    [err, familyList] = await to(User.findAll({
                        where: {
                            society_id: userDetails.society_id,
                            flat_id: userDetails.flat_id,
                            flat_token_no: userDetails.flat_token_no,
                            id: {
                                [Op.ne]: userDetails.id
                            },
                            [Op.or]: [{
                                status: constants.Status.INACTIVE
                            }, {
                                status: constants.Status.ACTIVE
                            }]
                        }
                    }));

                    userDetails.family_details = familyList;
                    data[i].user_details = userDetails;
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
module.exports.GetSocietyCommunitiesMemberByCommunitiesID = GetSocietyCommunitiesMemberByCommunitiesID

const CreateCommunitiesMember = async function (req, res) {

    res.setHeader('Content-Type', 'application/json');
    let err, user, response, data;
    const body = req.body;
    user = req.user;

    body.status = constants.Status.ACTIVE;
    body.user_id = user.id;
    body.created_by = user.id;
    body.updated_by = user.id;
    [err, response] = await to(SocietyCommunitiesMembers.create(body));

    if (err) {
        if (err.message == 'Validation error') err = 'Please enter required filed.';
        return ReE(res, err);
    }
    return ReS(res, {
        success: true,
        message: 'Successfully added.',
        data: response
    });
}
module.exports.CreateCommunitiesMember = CreateCommunitiesMember

const UpdateCommunitiesMember = async function (req, res) {
    let err, user, data, response;
    user = req.user;
    const body = req.body;

    [err, data] = await to(SocietyCommunitiesMembers.findOne({
        where: {
            communitie_id: body.communitie_id,
            user_id: user.id
        }
    }));

    if (data == undefined || data == "") {
        return ReE(res, 'Record not found.');
    }

    data.set(body);

    [err, response] = await to(data.save());

    if (err) {
        return ReE(res, err);
    }
    return ReS(res, {
        success: true,
        message: 'Updated successfully.'
    });
}
module.exports.UpdateCommunitiesMember = UpdateCommunitiesMember

const DeleteCommunitiesMember = async function (req, res) {

    let err, user, data, response;
    user = req.user;
    const body = req.body;

    [err, data] = await to(SocietyCommunitiesMembers.findOne({
        where: {
            communitie_id: body.communitie_id,
            user_id: user.id
        }
    }));

    if (data == undefined || data == "") {
        return ReE(res, 'Record not found.');
    }

    data.set(body);

    [err, response] = await to(data.destroy());

    if (err) {
        return ReE(res, err);
    }
    return ReS(res, {
        success: true,
        message: 'Delete Successfully.'
    });
}
module.exports.DeleteCommunitiesMember = DeleteCommunitiesMember