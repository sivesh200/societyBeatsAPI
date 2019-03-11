const SocietyEvents = require('../../models').society_events;
const SocietyEventsGallery = require('../../models').society_events_gallery;
var constants = require('../../middleware/constants');
const common = require('../../bal/common');

const GetEvents = async function (req, res) {

    let err, user, data, eventGallery;
    user = req.user;

    [err, data] = await to(SocietyEvents.findAll({
        where: {
            society_id: user.society_id,
            status: constants.Status.ACTIVE
        },
        order: [
            ['updatedAt', 'DESC']
        ]
    }));

    [err, eventGallery] = await to(SocietyEventsGallery.findAll({}));

    if (data != undefined) {
        if (data.length > 0 || data.length != undefined) {

            for (var i = 0, len = data.length; i < len; i++) {
                var item = data[i];
                var count = 0;
                if (eventGallery != undefined) {
                    count = eventGallery.filter(x => x.event_id === item.id).length;
                }
                data[i].total_images = count;
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
module.exports.GetEvents = GetEvents;

const CreateEvents = async function (req, res) {

    res.setHeader('Content-Type', 'application/json');
    let err, user, response, data;
    const body = req.body;
    user = req.user;

    body.status = constants.Status.ACTIVE;
    body.society_id = user.society_id;
    body.total_images = 0;

    if (body.image != undefined && body.image != null) {
        [err, imageName] = await to(common.base64FileUpload(body.image, constants.Upload.EVENT));
        body.image = imageName;
    }

    [err, response] = await to(SocietyEvents.create(body));

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
module.exports.CreateEvents = CreateEvents;

const UpdateEvents = async function (req, res) {
    let err, user, data, response;
    user = req.user;
    const body = req.body;

    [err, data] = await to(SocietyEvents.findOne({
        where: {
            id: body.id,
            society_id: user.society_id
        }
    }));

    if (data == undefined || data == "") {
        return ReE(res, 'Record not found.');
    }

    if (body.image != undefined && body.image != null) {
        [err, imageName] = await to(common.base64FileUpload(body.image, constants.Upload.EVENT));
        body.image = imageName;
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
module.exports.UpdateEvents = UpdateEvents;

const DeleteEvents = async function (req, res) {
    let err, user, data, response;
    user = req.user;
    const body = req.body;

    [err, data] = await to(SocietyEvents.findOne({
        where: {
            id: body.id,
            society_id: user.society_id
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
module.exports.DeleteEvents = DeleteEvents;

const GetEventsGallery = async function (req, res) {

    let err, data, userDetails;
    const params = req.params;

    [err, data] = await to(SocietyEventsGallery.findAll({
        where: {
            event_id: params.event_id,
            status: constants.Status.ACTIVE
        },
        order: [
            ['updatedAt', 'DESC']
        ]
    }));

    if (err) {
        return ReE(res, err);
    }
    return ReS(res, {
        success: true,
        data: data
    });
}
module.exports.GetEventsGallery = GetEventsGallery;

const CreateEventsGallery = async function (req, res) {

    res.setHeader('Content-Type', 'application/json');
    let err, user, response, data;
    var responseList = [];
    const body = req.body;
    user = req.user;

    if (body == undefined || body.length <= 0) {
        return ReE(res, 'Invalid data.');
    }

    if (body.length > 0 || body.length != undefined) {

        for (var i = 0, len = body.length; i < len; i++) {
            var item = body[i];
            item.status = constants.Status.ACTIVE;

            if (item.image != undefined && item.image != null) {
                [err, imageName] = await to(common.base64FileUpload(item.image, constants.Upload.GALLERY));
                item.image = imageName;
            }

            [err, response] = await to(SocietyEventsGallery.create(item));
            if(response!=undefined)
            {
                responseList.push(response);
            }
        }
    }

    if (err) {
        if (err.message == 'Validation error') err = 'Please enter required filed.';
        return ReE(res, err);
    }
    return ReS(res, {
        success: true,
        message: 'Successfully added.',
        data: responseList
    });
}
module.exports.CreateEventsGallery = CreateEventsGallery;

const UpdateEventsGallery = async function (req, res) {
    let err, user, data, response;
    user = req.user;
    const body = req.body;

    [err, data] = await to(SocietyEventsGallery.findOne({
        where: {
            id: body.id,
            event_id: body.event_id
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
module.exports.UpdateEventsGallery = UpdateEventsGallery;

const DeleteEventsGallery = async function (req, res) {
    let err, user, data, response;
    user = req.user;
    const body = req.body;

    [err, data] = await to(SocietyEventsGallery.findOne({
        where: {
            id: body.id,
            event_id: body.event_id
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
module.exports.DeleteEventsGallery = DeleteEventsGallery;