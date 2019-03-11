const Booking = require('../../models').society_booking_service;

const GetAllTicketByCategory = async function (req, res) {

    let err, user, data, openTicket,closeTicket;
    user = req.user;
    const params = req.params;

    [err, data] = await to(Booking.findAll({
        where: {
            user_id: user.id,
            category_id: params.category_id
        }
    }));

    if(data!=undefined)
    {
        openTicket = data.filter(function (x) {
            return x.status == 1
        });
        closeTicket = data.filter(function (x) {
            return x.status != 1
        });
    }
    var result = {
        open: openTicket,
        close: closeTicket
    };

    if (err) {
        return ReE(res, err);
    }
    return ReS(res, {
        success: true,
        data: result
    });

}
module.exports.GetAllTicketByCategory = GetAllTicketByCategory

const GetTypeByCategory = async function (req, res) {

    let err, user, data;
    user = req.user;
    const params = req.params;
    
    var result = [{id:1,title:"table 1",desc:""},{id:2,title:"table 2",desc:""}];

    if (err) {
        return ReE(res, err);
    }
    return ReS(res, {
        success: true,
        data: result
    });

}
module.exports.GetTypeByCategory = GetTypeByCategory

const categoryDetails = async function (req, res) {

    let err, user, data;
    user = req.user;
    const params = req.params;
    
    var result = {
        title:"Hall 1",
        brief_desc:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        full_desc:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting",
        note:"The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.",
        tc:"The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.",
        gallery:["img1.png","img2.png","img3.png","img4.png","img5.png"]
    };

    if (err) {
        return ReE(res, err);
    }
    return ReS(res, {
        success: true,
        data: result
    });
}
module.exports.categoryDetails = categoryDetails

const CreateTicket = async function (req, res) {

    res.setHeader('Content-Type', 'application/json');
    let err, user, response, data;
    user = req.user;
    const body = req.body;

    // check ticket not open more than 5 ticket per category
    [err, data] = await to(Booking.findAll({
        where: {
            user_id: user.id,
            category_id: body.category_id
        }
    }));

    if (data.length < 5) {
        body.user_id = user.id;
        body.status = 1;
        body.created_by = user.id;
        body.updated_by = user.id;

        [err, response] = await to(Booking.create(body));
    } else {
        return ReE(res, 'Max 5 ticket allow.');
    }

    var ticketID = "#" + response.id;

    if (err) {
        if (err.message == 'Validation error') err = 'Please enter required filed.';
        return ReE(res, err);
    }
    return ReS(res, {
        success: true,
        message: 'Successfully Ticket Created.Your Ticket ID: ' + ticketID
    });
}
module.exports.CreateTicket = CreateTicket

const GetNext6MonthUnAvaliableDays = async function (req, res) {

    var timeSlot = ["Mon Sep 10 2018 16:38:27 GMT+0530 (India Standard Time)","Mon oct 1 2018 16:38:27 GMT+0530 (India Standard Time)"];

    return ReS(res, {
        success: true,
        data: timeSlot
    });
}
module.exports.GetNext6MonthUnAvaliableDays = GetNext6MonthUnAvaliableDays

// Update / Cancel / Close 
const UpdateTicket = async function (req, res) {
    let err, user, data, response;
    user = req.user;
    const body = req.body;

    [err, data] = await to(Booking.findOne({
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
module.exports.UpdateTicket = UpdateTicket