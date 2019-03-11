const Maintanence = require('../../models').society_maintanence_service_tickets;
const MasterMaintanence = require('../../models').master_maintanence_services;
const MasterTimeSlot = require('../../models').society_time_slot;
const FlatInfo = require('../../models').society_flat_info;
const Staff = require('../../models').society_staff;
const TowerInfo = require('../../models').society_tower_info;
var constants = require('./../../middleware/constants');
const sms = require('../../bal/sms');
const User = require('../../models').User;
const common = require('../../bal/common');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

//constants.MaintanenceTicketStatus.UNRESLOVED

const GetFlatInfobyTower = async function (req, res) {
    let err, data;
    user = req.user;
    const body = req.body;
    [err, data] = await to(FlatInfo.findOne({
        where: {
            society_id: user.society_id,
            tower_id: body.tower_id,
            flat_address: body.flat_address
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
module.exports.GetFlatInfobyTower = GetFlatInfobyTower

const GetAllMaintanenceCategory = async function (req, res) {
    let err, data;

    [err, data] = await to(MasterMaintanence.findAll({}));

    if (err) {
        return ReE(res, err, 200);
    }
    return ReS(res, {
        success: true,
        data: data
    });
}
module.exports.GetAllMaintanenceCategory = GetAllMaintanenceCategory


const GetAllTicketByStatus = async function (req, res) {

    let err, data;
    user = req.user;
    const params = req.params;


    [err, data] = await to(Maintanence.findAll({
        where: {
            society_id: user.society_id,
            status: params.status
        }
    }));

    if (params.date != undefined) {
        if (data != undefined && data.length > 0) {

        }
    }

    if (params.category_id != undefined && params.category_id > 0) {

        const category_id = Number(params.category_id);

        if (data != undefined && data.length > 0) {
            var filterData = [];
            for (var i = 0, len = data.length; i < len; i++) {
                var item = data[i];
                if (item.category_id === category_id) {
                    filterData.push(item);
                }
            }
            data = filterData;
        }
    }

    // Maintanence Category
    [err, maintanenceCategory] = await to(MasterMaintanence.findAll({}));

    // Timeslot
    [err, TimeSlot] = await to(MasterTimeSlot.findAll({
        where: {
            society_id: user.society_id
        }
    }));

    if (data != undefined) {
        if (data.length > 0 || data.length != undefined) {

            for (var i = 0, len = data.length; i < len; i++) {
                var item = data[i];

                // Category Info
                if (maintanenceCategory != undefined) {
                    var categoryInfo = maintanenceCategory.filter(x => x.id == item.category_id);
                    if (categoryInfo != null && categoryInfo.length > 0) {
                        data[i].category_info = categoryInfo[0];
                    }
                }

                //TimeSlot
                if (TimeSlot != undefined) {
                    var timeSlotInfo = TimeSlot.filter(x => x.id == item.timeslot_id);
                    if (timeSlotInfo != null && timeSlotInfo.length > 0) {
                        data[i].timeslot_info = timeSlotInfo[0];
                    }
                }

                // Created By Info
                [err, createdInfo] = await to(User.findOne({
                    where: {
                        id: item.created_by
                    }
                }));
                if (createdInfo != null) {
                    data[i].created_by_info = createdInfo;
                }

                //flat_info
                [err, flatInfo] = await to(FlatInfo.findOne({
                    where: {
                        flat_token_no: item.flat_token_no
                    }
                }));
                if (flatInfo != null) {
                    data[i].flat_info = flatInfo;
                }

                // Assigned User
                [err, AssignedStaffInfo] = await to(Staff.findOne({
                    where: {
                        id: item.assigned_user
                    }
                }));
                if (AssignedStaffInfo != null) {
                    data[i].assigned_user_details = AssignedStaffInfo;
                }

            }
        }
    }

    if (err) {
        return ReE(res, err, 200);
    }
    return ReS(res, {
        success: true,
        data: data
    });
}
module.exports.GetAllTicketByStatus = GetAllTicketByStatus

const EsclateIssue = async function (req, res) {

    let err, user, data, response;
    user = req.user;
    const params = req.params;

    [err, data] = await to(Maintanence.findOne({
        where: {
            id: params.id
        }
    }));
    if (err) return ReE(res, err, 200);

    if (data == undefined) {
        return ReS(res, {
            success: false,
            message: 'Ticket ID not found.'
        }, 200);
    }

    data.set({
        esclated_status: 1
    });

    [err, response] = await to(data.save());

    if (err) {
        return ReE(res, err, 200);
    }
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
            category_id: body.category_id
        }
    }));
    if (err) return ReE(res, err, 200);
    if (data.length < 5) {
        body.status = 1;
        body.assign_status = 0;
        body.assigned_user = 0;
        body.esclated_status = 0;
        body.reached_status = 0;
        body.created_by = user.id;
        body.updated_by = user.id;
        body.request_id = common.randomNumber();
        body.society_id = user.society_id;
        [err, response] = await to(Maintanence.create(body));
        if (response != undefined) {
            // sms.sendSMS(user.phone, "Successfully Ticket Created.Your Ticket ID: #" + response.request_id);
        }

    } else {
        return ReE(res, 'Max 5 ticket allow.');
    }
    var ticketID;
    if (response != null) {
        ticketID = "#" + response.request_id;
    }


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

const GetTimeSlotFor7Days = async function (req, res) {

    user = req.user;
    var TimeSlot = [];

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
            id: body.id
        }
    }));
    if (err) return ReE(res, err, 200);
    if (data == undefined) {
        return ReS(res, {
            success: false,
            message: 'Ticket ID not found.'
        }, 200);
    }

    data.set(body);

    [err, response] = await to(data.save());

    if (err) {
        return ReE(res, err, 200);
    }
    return ReS(res, {
        success: true,
        message: 'Updated successfully.'
    });
}
module.exports.UpdateTicket = UpdateTicket

const GetAllStaffEngagementByCategoryID = async function (req, res) {
    let err, data;
    const params = req.params;
    user = req.user;

    [err, data] = await to(Staff.findAll({
        where: {
            category_id: params.category_id
        }
    }));

    [err, ticketList] = await to(Maintanence.findAll({
        where: {
            society_id: user.society_id,
            status: {
                [Op.ne]: constants.MaintanenceTicketStatus.CLOSE
            },
            category_id: params.category_id
        }
    }));

    // Maintanence Category
    [err, maintanenceCategory] = await to(MasterMaintanence.findAll({}));

    // Timeslot
    [err, TimeSlot] = await to(MasterTimeSlot.findAll({
        where: {
            society_id: user.society_id
        }
    }));

    if (ticketList != undefined) {
        if (ticketList.length > 0 || ticketList.length != undefined) {

            for (var i = 0, len = ticketList.length; i < len; i++) {
                var item = ticketList[i];

                // Category Info
                if (maintanenceCategory != undefined) {
                    var categoryInfo = maintanenceCategory.filter(x => x.id == item.category_id);
                    if (categoryInfo != null && categoryInfo.length > 0) {
                        ticketList[i].category_info = categoryInfo[0];
                    }
                }

                //TimeSlot
                if (TimeSlot != undefined) {
                    var timeSlotInfo = TimeSlot.filter(x => x.id == item.timeslot_id);
                    if (timeSlotInfo != null && timeSlotInfo.length > 0) {
                        ticketList[i].timeslot_info = timeSlotInfo[0];
                    }
                }

                // Created By Info
                [err, createdInfo] = await to(User.findOne({
                    where: {
                        id: item.created_by
                    }
                }));
                if (createdInfo != null) {
                    ticketList[i].created_by_info = createdInfo;
                }

                //flat_info
                [err, flatInfo] = await to(FlatInfo.findOne({
                    where: {
                        flat_token_no: item.flat_token_no
                    }
                }));
                if (flatInfo != null) {
                    ticketList[i].flat_info = flatInfo;
                }

                 // Assigned User
                 [err, AssignedStaffInfo] = await to(Staff.findOne({
                    where: {
                        id: item.assigned_user
                    }
                }));

                if (AssignedStaffInfo != null) {
                    ticketList[i].assigned_user_details = AssignedStaffInfo;
                }
            }
        }
    }


    if (data != undefined) {
        if (data.length > 0 || data.length != undefined) {

            for (var i = 0, len = data.length; i < len; i++) {
                var item = data[i];
                var ticketCount = 0;
                var tickesList;
                if (ticketList != undefined) {
                    tickesList = ticketList.filter(x => x.assigned_user === item.id);
                    if (tickesList!=undefined)
                    {
                        ticketCount=tickesList.length;
                    }
                }
                data[i].total_ticket = ticketCount;
                data[i].ticket_list = tickesList;
            }
        }
    }

    if (err) {
        return ReE(res, err, 200);
    }
    return ReS(res, {
        success: true,
        data: data
    });
}
module.exports.GetAllStaffEngagementByCategoryID = GetAllStaffEngagementByCategoryID
