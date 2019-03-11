const MasterBookings = require('../../models').master_bookings;
const MasterMaintanence = require('../../models').master_maintanence_services;
const Maintanence = require('../../models').society_maintanence_service_tickets;
const Staff = require('../../models').society_staff;
const Advertising = require('../../models').society_advertising;
const notices = require('../../models').society_notices;
const notification = require('../../models').society_notification;

const DomesticHelper = require('../../models').society_domestic_helper;
const UsersDomesticHelper = require('../../models').users_domestic_helper;
const DomesticHelperInOut = require('../../models').society_domestic_helper_in_out;
const Category = require('../../models').society_domestic_helper_category;

const Visitors = require('../../models').society_visitors;
const VisitorInOut = require('../../models').society_visitors_in_out;

const Vehicle = require('../../models').society_vehicles;
const VehicleInOut = require('../../models').society_vehicle_in_out;
var constants = require('../../middleware/constants');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

const User = require('../../models').User;

const Dashboard = function (req, res) {
    let user = req.user.id;
    return res.json({
        success: true,
        message: 'it worked',
        data: 'user name is :'
    });
}
module.exports.Dashboard = Dashboard

const dashboard_view = async function (req, res) {
    let err, user, data, openTicket, notificationUnreadCount = 0,
        iuserProfileComplete = 0;
    user = req.user;
    data = req.body;

    // Calculate Profile Complete (%)
    //Based on (first,blood_group,gender,dob,profesion,picture,email,is_email_verified,phone,is_phone_verified)
    if (user != undefined) {

        if (user.first != undefined) {
            iuserProfileComplete = iuserProfileComplete + 10;
        }
        if (user.blood_group != undefined && user.blood_group != null) {
            iuserProfileComplete = iuserProfileComplete + 10;
        }
        if (user.gender != undefined && user.gender != null) {
            iuserProfileComplete = iuserProfileComplete + 10;
        }
        if (user.dob != undefined && user.dob != null) {
            iuserProfileComplete = iuserProfileComplete + 10;
        }
        if (user.profesion != undefined && user.profesion != null) {
            iuserProfileComplete = iuserProfileComplete + 10;
        }
        if (user.picture != undefined && user.picture != null && user.picture != "no-image.png") {
            iuserProfileComplete = iuserProfileComplete + 10;
        }
        if (user.email != undefined && user.email != null) {
            iuserProfileComplete = iuserProfileComplete + 10;
        }
        if (user.is_email_verified != undefined && user.is_email_verified != null && user.is_email_verified != "False") {
            iuserProfileComplete = iuserProfileComplete + 10;
        }
        if (user.phone != undefined && user.phone != null) {
            iuserProfileComplete = iuserProfileComplete + 10;
        }
        if (user.is_phone_verified != undefined && user.is_phone_verified != null && user.is_phone_verified != "False") {
            iuserProfileComplete = iuserProfileComplete + 10;
        }
    }

    [err, masterBooking] = await to(MasterBookings.findAll());
    [err, masterMaintanence] = await to(MasterMaintanence.findAll());
    [err, advertising] = await to(Advertising.findAll());

    // Notification List
    [err, notificationList] = await to(notification.findAll({
        where: {
            society_id: user.society_id,
            status: constants.Status.ACTIVE
        },
        order: [
            ['updatedAt', 'DESC']
        ]
    }));
    
    // Notification Unread List
    [err, notificationUnreadList] = await to(notification.findAll({
        where: {
            society_id: user.society_id,
            status: constants.Status.ACTIVE,
            read_status: "False"
        },
        order: [
            ['updatedAt', 'DESC']
        ]
    }));

    if (notificationUnreadList != undefined && notificationUnreadList.length > 0) {
        notificationUnreadCount = notificationUnreadList.length;
    }

    // Notices List
    [err, noticesList] = await to(notices.findAll({
        where: {
            society_id: user.society_id,
            status: constants.Status.ACTIVE
        },
        order: [
            ['updatedAt', 'DESC']
        ]
    }));

    // Family List
    [err, familyList] = await to(User.findAll({
        where: {
            society_id: user.society_id,
            flat_id: user.flat_id,
            flat_token_no: user.flat_token_no,
            id: {
                [Op.ne]: user.id
            },
            [Op.or]: [{
                status: constants.Status.INACTIVE
            }, {
                status: constants.Status.ACTIVE
            }]
        }
    }));

    // Security List
    [err, visitorsRes] = await to(Visitors.findAll({
        where: {
            society_id: user.society_id,
            flat_id: user.flat_id
        }
    }));


    [err, vehiclesRes] = await to(Vehicle.findAll({
        where: {
            society_id: user.society_id,
            flat_id: user.flat_id
        }
    }));

    if (vehiclesRes != undefined) {
        if (vehiclesRes.length > 0 || vehiclesRes.length != undefined) {

            for (var i = 0, len = vehiclesRes.length; i < len; i++) {
                var item = vehiclesRes[i];
                [err, vehicleInOut] = await to(VehicleInOut.findOne({
                    where: {
                        vehicle_id: item.id,
                        status: 1
                    }
                }));

                if (vehicleInOut != undefined) {
                    vehiclesRes[i].status = 0;
                } else {
                    vehiclesRes[i].status = 1;
                }
            }
        }
    }

    [err, domesticHelperRes] = await to(UsersDomesticHelper.findAll({
        where: {
            society_id: user.society_id,
            flat_id: user.flat_id
        }
    }));

    if (domesticHelperRes != undefined) {

        if (domesticHelperRes.length > 0 || domesticHelperRes.length != undefined) {

            for (var i = 0, len = domesticHelperRes.length; i < len; i++) {
                var item = domesticHelperRes[i];

                // Domestic Helper Info
                [err, domesticHelperInfo] = await to(DomesticHelper.findOne({
                    where: {
                        society_id: user.society_id,
                        id: item.domestic_helper_id
                    }
                }));

                if (domesticHelperInfo != undefined) {
                    // category Info
                    [err, categoryInfo] = await to(Category.findOne({
                        where: {
                            id: domesticHelperInfo.category_id
                        }
                    }));

                    if (categoryInfo != null && categoryInfo != undefined) {
                        domesticHelperInfo.category_info = categoryInfo;
                    }

                    //inOutInfo
                    [err, inOutInfo] = await to(DomesticHelperInOut.findOne({
                        where: {
                            society_id: user.society_id,
                            domestic_helper_id: domesticHelperInfo.id
                        },
                        order: [
                            ['updatedAt', 'DESC']
                        ]
                    }));

                    if (inOutInfo != undefined) {
                        if (inOutInfo.status == constants.InOutStatus.IN) {
                            domesticHelperInfo.in_out_status = constants.InOutStatus.OUT;
                        } else {
                            domesticHelperInfo.in_out_status = constants.InOutStatus.IN;
                        }
                    } else {
                        domesticHelperInfo.in_out_status = constants.InOutStatus.IN;
                    }
                }

                domesticHelperRes[i].domestic_helper_info = domesticHelperInfo;
            }
        }
    }

    securityList = {
        "DomesticHelper": domesticHelperRes,
        "Vehicles": vehiclesRes,
        "Visitor": visitorsRes
    };

    // Maintanence Tickets
    [err, maintanenceTickets] = await to(Maintanence.findAll({
        where: {
            flat_token_no: user.flat_token_no,
            society_id:user.society_id
        }
    }));

    if (maintanenceTickets != undefined) {
        if (maintanenceTickets.length > 0 || maintanenceTickets.length != undefined) {

            for (var i = 0, len = maintanenceTickets.length; i < len; i++) {
                var item = maintanenceTickets[i];
                if (item.assign_status == 1 && item.assigned_user != 0) {
                    [err, assignedUser] = await to(Staff.findOne({
                        where: {
                            id: item.assigned_user
                        }
                    }));

                    if (assignedUser != undefined) {
                        maintanenceTickets[i].assigned_user_details = assignedUser;
                    }
                }
            }
            maintanenceTickets = maintanenceTickets;
        }

        openTicket = maintanenceTickets.filter(function (x) {
            return x.status == 1 || x.assign_status == 1
        });
    }

    if (user == null) {
        strdata = {
            success: false,
            message: "opps something wrong."
        };
    } else {
        strdata = {
            success: true,
            userProfileComplete: iuserProfileComplete,
            userActive: user.status,
            unread_alert_count: notificationUnreadCount,
            notifications: {
                inbox: notificationList,
                notices: noticesList
            },
            advertisings: advertising,
            bookings: masterBooking,
            maintenance: masterMaintanence,
            maintenanceTickets: openTicket,
            family_details: familyList,
            security: securityList
        };
    }
    return res.json(strdata);
}
module.exports.dashboard_view = dashboard_view;