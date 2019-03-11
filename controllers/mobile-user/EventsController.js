const SocietyEvents = require('../../models').society_events;
const SocietyEventsGallery = require('../../models').society_events_gallery;
var constants = require('../../middleware/constants');

const GetEvents = async function (req, res) {

    let err, user, data, eventGallery;
    user = req.user;

    [err, data] = await to(SocietyEvents.findAll({
        where:{
            society_id:user.society_id,
            status:constants.Status.ACTIVE
        },
        order: [['updatedAt', 'DESC']]
    }));

    [err, eventGallery] = await to(SocietyEventsGallery.findAll({}));

    if(data!=undefined)
    {
        if (data.length > 0 || data.length != undefined) {

            for (var i = 0, len = data.length; i < len; i++) {
                var item = data[i];
                var count=0;
                if (eventGallery != undefined) {
                    count = eventGallery.filter(x=> x.event_id===item.id).length;
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
module.exports.GetEvents = GetEvents

const GetEventsGalleryByEventID = async function (req, res) {

    let err, data;
    const params = req.params;

    [err, data] = await to(SocietyEventsGallery.findAll({
        where: {
            event_id: params.event_id
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
module.exports.GetEventsGalleryByEventID = GetEventsGalleryByEventID