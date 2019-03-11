const Complaints = require('../../models').society_complaints;
const User = require('../../models').User;
const ComplaintsCategory = require('../../models').society_complaints_category;
const ComplaintsComments = require('../../models').society_complaints_comments;



const GetAllComplaints = async function (req, res) {

    let err, user, data;
    user = req.user;

    [err, data] = await to(Complaints.findAll({
        where: {
            user_id: user.id
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
module.exports.GetAllComplaints = GetAllComplaints

const GetComplaintsCategory = async function (req, res) {

    let err, user, data;
    user = req.user;

    [err, data] = await to(ComplaintsCategory.findAll({ }));
    if (err) {
        return ReE(res, err);
    }
    return ReS(res, {
        success: true,
        data: data
    });
}
module.exports.GetComplaintsCategory = GetComplaintsCategory

const CreateComplaints = async function (req, res) {

    res.setHeader('Content-Type', 'application/json');
    let err, user, response, data;
    user = req.user;
    const body = req.body;

    body.user_id = user.id;
    body.status = 1;
    body.created_by = user.id;
    body.updated_by = user.id;

    [err, response] = await to(Complaints.create(body));

    if (err) {
        if (err.message == 'Validation error') err = 'Please enter required filed.';
        return ReE(res, err);
    }
    return ReS(res, {
        success: true,
        message: 'Successfully added',
        data:response
    });
}
module.exports.CreateComplaints = CreateComplaints

const UpdateComplaints = async function (req, res) {
    let err, user, data, response;
    user = req.user;
    const body = req.body;

    [err, data] = await to(Complaints.findOne({
        where: {
            user_id: user.id,
            id: body.id
        }
    }));

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
module.exports.UpdateComplaints = UpdateComplaints

const DeleteComplaints = async function (req, res) {
    let err, user, data, response;
    user = req.user;
    const body = req.body;

    [err, data] = await to(Complaints.findOne({
        where: {
            user_id: user.id,
            id: body.id
        }
    }));

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
module.exports.DeleteComplaints = DeleteComplaints