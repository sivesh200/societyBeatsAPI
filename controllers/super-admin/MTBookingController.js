const MTBooking = require('../../models').master_bookings;
var constants = require('../../middleware/constants');
const common = require('../../bal/common');

const GetAllBookingCategory = async function (req, res) {

    let err, data;

    [err, data] = await to(MTBooking.findAll({
        where: {
            status: constants.Status.ACTIVE
        }
    }));

    if (err) {
        return ReE(res, err, 200);
    }
    return ReS(res, {
        success: true,
        data: data
    });
}
module.exports.GetAllBookingCategory = GetAllBookingCategory

const CreateBookingCategory = async function (req, res) {

    res.setHeader('Content-Type', 'application/json');
    let err, user, response, data;
    const body = req.body;

    body.status = 1;

    if (body.image_url != undefined && body.image_url != null) {
        [err, imageName] = await to(common.base64FileUpload(body.image_url, constants.Upload.BOOKING));
        body.image_url = imageName;
    }

    [err, response] = await to(MTBooking.create(body));

    if (err) {
        if (err.message == 'Validation error') err = 'Please enter required filed.';
        return ReE(res, err);
    }
    return ReS(res, {
        success: true,
        message: 'Successfully added',
        data: response
    });
}
module.exports.CreateBookingCategory = CreateBookingCategory

const UpdateBookingCategory = async function (req, res) {
    let err, user, data, response;
    user = req.user;
    const body = req.body;

    [err, data] = await to(MTBooking.findOne({
        where: {
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
module.exports.UpdateBookingCategory = UpdateBookingCategory

const DeleteBookingCategory = async function (req, res) {
    let err, user, data, response;
    user = req.user;
    const body = req.body;

    [err, data] = await to(MTBooking.findOne({
        where: {
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
module.exports.DeleteBookingCategory = DeleteBookingCategory