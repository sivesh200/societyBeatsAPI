const Maintanence = require('../../models').society_maintanence_service_tickets;
const MasterTimeSlot = require('../../models').society_time_slot;
const User = require('../../models').User;
const Staff = require('../../models').society_staff;
const sms = require('../../bal/sms');
const common = require('../../bal/common');

const GetAllTicketByCategory = async function (req, res) {

    let err, user, data, assignedUser, openTicket, closeTicket;
    user = req.user;
    const params = req.params;

    [err, data] = await to(Maintanence.findAll({
        where: {
            flat_token_no: user.flat_token_no,
            society_id: user.society_id,
            category_id: params.category_id
        }
    }));

    if (data != undefined) {
        if (data.length > 0 || data.length != undefined) {

            for (var i = 0, len = data.length; i < len; i++) {
                var item = data[i];
                if (item.assign_status == 1 && item.assigned_user != 0) {
                    [err, assignedUser] = await to(Staff.findOne({
                        where: {
                            id: item.assigned_user
                        }
                    }));

                    if (assignedUser != undefined) {
                        data[i].assigned_user_details = assignedUser;
                    }
                }
            }
            data = data;
        }

        openTicket = data.filter(function (x) {
            return x.status == 1 || x.assign_status == 1
        });
        closeTicket = data.filter(function (x) {
            return x.status != 1 && x.assign_status != 1
        });
    }

    var managerDetails = {
        name: 'Prakash Gupta',
        MobileNo: '+91-987654321',
        email: 'pgupta@gmail.com'
    };

    var date = new Date();
    date.setDate(date.getDate() + 6);

    var Serverdate = new Date();

    var result = {
        open: openTicket,
        close: closeTicket,
        manager_details: managerDetails,
        reachtime: date.toString(),
        server_date: Serverdate.toString()
    };

    if (err) {
        return ReE(res, err);
    }
    return ReS(res, {
        success: true,
        data: result
    });

    // return res.json({
    //     success: true,
    //     data: user
    // });
}
module.exports.GetAllTicketByCategory = GetAllTicketByCategory

const EsclateIssue = async function (req, res) {

    let err, user, data, response;
    user = req.user;
    const params = req.params;

    [err, data] = await to(Maintanence.findOne({
        where: {
            user_id: user.id,
            id: params.id
        }
    }));

    data.set({
        esclated_status: 1
    });

    [err, response] = await to(data.save());

    if (err) {
        return ReE(res, err);
    }
    sms.sendSMS(user.phone, "Successfully esclated your ticket.");

    return ReS(res, {
        success: true,
        message: 'Esclated successfully.'
    });
}
module.exports.EsclateIssue = EsclateIssue

const CreateTicket = async function (req, res) {

    res.setHeader('Content-Type', 'application/json');
    let err, user, response, data;
    user = req.user;
    const body = req.body;


    // check ticket not open more than 5 ticket per category
    [err, data] = await to(Maintanence.findAll({
        where: {
            user_id: user.id,
            category_id: body.category_id
        }
    }));

    if (data == undefined || data.length < 5) {
        body.society_id = user.society_id;
        body.flat_token_no = user.flat_token_no;
        body.status = 1;
        body.assign_status = 0;
        body.assigned_user = 0;
        body.esclated_status = 0;
        body.reached_status = 0;
        body.reached_date = body.booking_date;
        body.created_by = user.id;
        body.updated_by = user.id;
        body.request_id = common.randomNumber();
        [err, response] = await to(Maintanence.create(body));
    } else {
        return ReE(res, 'Max 5 ticket allow.');
    }

    var ticketID = "#" + response.request_id;

    if (err) {
        if (err.message == 'Validation error') err = 'Please enter required filed.';
        return ReE(res, err);
    }

    sms.sendSMS(user.phone, "Successfully Ticket Created.Your Ticket ID: " + ticketID);

    return ReS(res, {
        success: true,
        message: 'Successfully Ticket Created.Your Ticket ID: ' + ticketID
    });
}
module.exports.CreateTicket = CreateTicket

const GetTimeSlotFor7Days = async function (req, res) {

    var TimeSlot = [];
    user = req.user;

    [err, data] = await to(MasterTimeSlot.findAll({
        where: {
            society_id: user.society_id
        }
    }));

    for (let index = 0; index < 7; index++) {
        var date = new Date();
        date.setDate(date.getDate() + index);
        TimeSlot.push({
            date: date.toString(),
            timeSlot: data
        });
    }
    return ReS(res, {
        success: true,
        data: TimeSlot
    });
}
module.exports.GetTimeSlotFor7Days = GetTimeSlotFor7Days

// Update / Cancel / Close / Ratting 
const UpdateTicket = async function (req, res) {
    let err, user, data, response;
    user = req.user;
    const body = req.body;

    [err, data] = await to(Maintanence.findOne({
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