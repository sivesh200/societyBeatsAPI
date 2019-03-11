const SocietyCommunities = require('../../models').society_communities;
const SocietyCommunitiesMembers = require('../../models').society_communities_members;

const User = require('../../models').User;
var constants = require('../../middleware/constants');
const common = require('../../bal/common');
const FlatInfo = require('../../models').society_flat_info;
const TowerInfo = require('../../models').society_tower_info;
const Societys = require('../../models').Societys;

const GetCommunities = async function (req, res) {

    let err, user, data,memberList;
    user = req.user;

    [err, data] = await to(SocietyCommunities.findAll({
        where:{
            society_id:user.society_id,
            status: constants.Status.ACTIVE
        },
        order: [['updatedAt', 'DESC']]
    }));

    [err, memberList] = await to(SocietyCommunitiesMembers.findAll({}));

    if(data!=undefined)
    {
        if (data.length > 0 || data.length != undefined) {

            for (var i = 0, len = data.length; i < len; i++) {
                var item = data[i];
                var count=0;
                if (memberList != undefined) {
                    count = memberList.filter(x=> x.communitie_id===item.id).length;
                }
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
module.exports.GetCommunities = GetCommunities

const CreateCommunities = async function (req, res) {

    res.setHeader('Content-Type', 'application/json');
    let err, user, response, data;
    const body = req.body;
    user = req.user;

    body.status = constants.Status.ACTIVE;
    body.society_id = user.society_id;
    body.total_members = 0;

    if(body.image != undefined && body.image != null)
    {        
        [err, imageName] =  await to(common.base64FileUpload(body.image,constants.Upload.COMMUNITIE));
        body.image=imageName;
    }

    [err, response] = await to(SocietyCommunities.create(body));

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
module.exports.CreateCommunities = CreateCommunities

const UpdateCommunities = async function (req, res) {
    let err, user, data, response;
    user = req.user;
    const body = req.body;   

    [err, data] = await to(SocietyCommunities.findOne({
        where: {
            id: body.id,
            society_id:user.society_id
        }
    }));

    if(data==undefined || data=="")
    {
        return ReE(res, 'Record not found.');  
    }
    

    if(body.image != undefined && body.image != null)
    {        
        [err, imageName] =  await to(common.base64FileUpload(body.image,constants.Upload.COMMUNITIE));
        body.image=imageName;
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
module.exports.UpdateCommunities = UpdateCommunities

const DeleteCommunities = async function (req, res) {
    let err, user, data, response;
    user = req.user;
    const body = req.body;

    [err, data] = await to(SocietyCommunities.findOne({
        where: {
            id: body.id,
            society_id:user.society_id
        }
    }));

    if(data==undefined || data=="")
    {
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
module.exports.DeleteCommunities = DeleteCommunities

const GetCommunitiesMember = async function (req, res) {

    let err, data,userDetails;
    const params = req.params;
    

    [err, data] = await to(SocietyCommunitiesMembers.findAll({
        where: {
            communitie_id: params.communitie_id,
            status: constants.Status.ACTIVE
        },
        order: [['updatedAt', 'DESC']]
    }));

    if(data!=undefined)
    {
        if (data.length > 0 || data.length != undefined) {

            for (var i = 0, len = data.length; i < len; i++) {
                var item = data[i];
                [err, userDetails] = await to(User.findOne({
                    where: {
                        id: item.user_id
                    }
                }));

                if (userDetails != undefined) {

                    var tempUser = [];
                    tempUser.push(userDetails);
                    [err, tempUser] = await to(fillFullAddress(tempUser));
            
                    if (tempUser != undefined && tempUser.length > 0) {
                        userDetails = tempUser[0];
                    }
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
module.exports.GetCommunitiesMember = GetCommunitiesMember

const CreateCommunitiesMember = async function (req, res) {

    res.setHeader('Content-Type', 'application/json');
    let err, user, response, data;
    const body = req.body;
    user = req.user;

    body.status = constants.Status.ACTIVE;
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
            id: body.id,
            communitie_id:body.communitie_id
        }
    }));

    if(data==undefined || data=="")
    {
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
            id: body.id,
            communitie_id: body.communitie_id
        }
    }));

    if(data==undefined || data=="")
    {
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