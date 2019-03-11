const express = require('express');
const router = express.Router();

const custom = require('./../middleware/custom');
const passport = require('passport');
const path = require('path');

require('./../middleware/passport')(passport);

//********* CLIENT CONTROLLER START **********

//#region ClientControllerList

const UserController = require('./../controllers/mobile-user/UserController');
const CompanyController = require('./../controllers/mobile-user/CompanyController');
const HomeController = require('./../controllers/mobile-user/HomeController');
const PublicController = require('./../controllers/mobile-user/PublicController');
const SocialController = require('./../controllers/mobile-user/SocialController');
const MaintanenceController = require('./../controllers/mobile-user/MaintanenceController');
const BookingController = require('./../controllers/mobile-user/BookingController');
const SOSController = require('./../controllers/mobile-user/SOSController');
const ComplaintsController = require('./../controllers/mobile-user/ComplaintsController');
const DomesticHelperController = require('./../controllers/mobile-user/DomesticHelperController');
const NoticesController = require('./../controllers/mobile-user/NoticesController');
const NotificationController = require('./../controllers/mobile-user/NotificationController');
const EventsController = require('./../controllers/mobile-user/EventsController');
const CommunitiesController = require('./../controllers/mobile-user/CommunitiesController');
const VehiclesController = require('./../controllers/mobile-user/VehiclesController');
const BloodGroupsController = require('./../controllers/mobile-user/BloodGroupsController');
const VisitorsController = require('./../controllers/mobile-user/VisitorsController');
const SecurityController = require('./../controllers/mobile-user/SecurityController');

//#endregion 

//********* CLIENT CONTROLLER END **********

//********* ADMIN CONTROLLER START **********

//#region AdminControllerList

const AdminUserController = require('./../controllers/admin/UserController');
const AdminMaintanenceController = require('./../controllers/admin/MaintanenceController');
const AdminNoticesController = require('./../controllers/admin/NoticesController');
const AdminCommunitiesController = require('./../controllers/admin/CommunitiesController');
const AdminEventsController = require('./../controllers/admin/EventsController');
const AdminVehicleController = require('./../controllers/admin/VehicleController');
const AdminVisitorController = require('./../controllers/admin/VisitorController');
const AdminDomesticHelperController = require('./../controllers/admin/DomesticHelperController');
const AdminStaffController = require('./../controllers/admin/StaffController');
//#endregion 

//********* ADMIN CONTROLLER END **********

//********* SUPER ADMIN CONTROLLER START **********

//#region SuperAdminControllerList

const MTTowerController = require('./../controllers/super-admin/MTTowerController');
const MTBookingController = require('./../controllers/super-admin/MTBookingController');
const MTComplaintController = require('./../controllers/super-admin/MTComplaintController');
const MTDomesticHelperController = require('./../controllers/super-admin/MTDomesticHelperController');
const MTMaintenanceController = require('./../controllers/super-admin/MTMaintenanceController');
const MTSocietyCategoryController = require('./../controllers/super-admin/MTSocietyCategoryController');
const MTSosController = require('./../controllers/super-admin/MTSosController');

//#endregion 

//********* ADMIN CONTROLLER END **********

/* GET home page. */

router.get('/', function (req, res, next) {
  res.json({
    status: "success",
    message: "Society Beats API",
    data: {
      "version_number": "v1.0.0"
    }
  })
});

//Dashbaord
router.get('/dash', passport.authenticate('jwt', {
  session: false
}), HomeController.Dashboard);

//********* CLIENT API START **********

//#region ClientMethodList

//#region User
router.post('/users', UserController.create);
router.get('/users', passport.authenticate('jwt', {
  session: false
}), UserController.get);
router.put('/users', passport.authenticate('jwt', {
  session: false
}), UserController.update);
router.delete('/users', passport.authenticate('jwt', {
  session: false
}), UserController.remove);
router.post('/users/login', UserController.login);
router.post('/users/logout', passport.authenticate('jwt', {
  session: false
}), UserController.logout);
router.get('/users/forgot-password/:email', UserController.forgot_password);
router.post('/users/change-password', passport.authenticate('jwt', {
  session: false
}), UserController.change_password);
router.post('/users/check-primary-user/', UserController.check_primary_user);
router.post('/users/validate-mobile-number/', UserController.validateMobileNumber);
router.post('/users/create-new-password/', UserController.create_new_password);

//#endregion

//#region Dashboard

router.get('/dashboard-setting', passport.authenticate('jwt', {
  session: false
}), HomeController.dashboard_view);

//#endregion

//#region Public 

router.get('/public/society', PublicController.get);

//#endregion

//#region Maintanence

router.post('/maintanence/create-ticket', passport.authenticate('jwt', {
  session: false
}), MaintanenceController.CreateTicket);
router.get('/maintanence/esclate-ticket/:id', passport.authenticate('jwt', {
  session: false
}), MaintanenceController.EsclateIssue);
router.get('/maintanence/get-timeslot/:category_id', passport.authenticate('jwt', {
  session: false
}), MaintanenceController.GetTimeSlotFor7Days);
router.put('/maintanence/update-ticket', passport.authenticate('jwt', {
  session: false
}), MaintanenceController.UpdateTicket);
router.get('/maintanence/get-all-ticket/:category_id', passport.authenticate('jwt', {
  session: false
}), MaintanenceController.GetAllTicketByCategory);

//#endregion

//#region Booking

router.post('/booking/create-ticket', passport.authenticate('jwt', {
  session: false
}), BookingController.CreateTicket);
router.get('/booking/get-timeslot/:category_id', passport.authenticate('jwt', {
  session: false
}), BookingController.GetNext6MonthUnAvaliableDays);
router.put('/booking/update-ticket', passport.authenticate('jwt', {
  session: false
}), BookingController.UpdateTicket);
router.get('/booking/get-all-ticket/:category_id', passport.authenticate('jwt', {
  session: false
}), BookingController.GetAllTicketByCategory);
router.get('/booking/get-type-category/:category_id', passport.authenticate('jwt', {
  session: false
}), BookingController.GetTypeByCategory);
router.get('/booking/get-details/:category_id', passport.authenticate('jwt', {
  session: false
}), BookingController.categoryDetails);

//#endregion

//#region SOS

router.post('/sos/create-contact', passport.authenticate('jwt', {
  session: false
}), SOSController.CreateContact);
router.get('/sos/get-all-contact', passport.authenticate('jwt', {
  session: false
}), SOSController.GetEmergencyContactNumber);
router.put('/sos/update-contact', passport.authenticate('jwt', {
  session: false
}), SOSController.UpdateContact);
router.get('/sos/get-contact-category', passport.authenticate('jwt', {
  session: false
}), SOSController.GetCategory);
router.delete('/sos/delete-contact', passport.authenticate('jwt', {
  session: false
}), SOSController.DeleteContact);


//#endregion

//#region Complaints

router.post('/complaints/create-complaint', passport.authenticate('jwt', {
  session: false
}), ComplaintsController.CreateComplaints);
router.get('/complaints/get-all-complaints', passport.authenticate('jwt', {
  session: false
}), ComplaintsController.GetAllComplaints);
router.put('/complaints/update-complaint', passport.authenticate('jwt', {
  session: false
}), ComplaintsController.UpdateComplaints);
router.get('/complaints/get-complaint-category', passport.authenticate('jwt', {
  session: false
}), ComplaintsController.GetComplaintsCategory);
router.delete('/complaints/delete-complaint', passport.authenticate('jwt', {
  session: false
}), ComplaintsController.DeleteComplaints);

//#endregion

//#region Domestic Helper

router.get('/domestic-helper/get-all-domestic-helper-by-category/:category_id', passport.authenticate('jwt', {
  session: false
}), DomesticHelperController.GetDomesticHelperByCategory);
router.get('/domestic-helper/get-domestic-helper-category', passport.authenticate('jwt', {
  session: false
}), DomesticHelperController.GetDomesticHelperCategory);
router.get('/domestic-helper/search-domestic-helper-by-name/:category_id/:name', passport.authenticate('jwt', {
  session: false
}), DomesticHelperController.SearchDomesticHelperByCategory);
router.post('/domestic-helper/tag', passport.authenticate('jwt', {
  session: false
}), DomesticHelperController.TagDomesticHelper);
router.delete('/domestic-helper/untag', passport.authenticate('jwt', {
  session: false
}), DomesticHelperController.UntagDomesticHelper);

//#endregion

//#region My Society (Social)

// Notices 
router.get('/notices/get-all-notices', passport.authenticate('jwt', {
  session: false
}), NoticesController.GetNotices);
router.put('/notices/update-notices', passport.authenticate('jwt', {
  session: false
}), NoticesController.UpdateNotices);

// Notification
router.put('/notification/', passport.authenticate('jwt', {
  session: false
}), NotificationController.UpdateNotification);

// Events
router.get('/events/get-all-events', passport.authenticate('jwt', {
  session: false
}), EventsController.GetEvents);
router.get('/events/get-events-gallery-by-eventid/:event_id', passport.authenticate('jwt', {
  session: false
}), EventsController.GetEventsGalleryByEventID);

//Communities
router.get('/communities/get-all-communities', passport.authenticate('jwt', {
  session: false
}), CommunitiesController.GetSocietyCommunities);
router.get('/communities/get-members-by-communitieid/:communitie_id', passport.authenticate('jwt', {
  session: false
}), CommunitiesController.GetSocietyCommunitiesMemberByCommunitiesID);

router.post('/communities/members/', passport.authenticate('jwt', {
  session: false
}), CommunitiesController.CreateCommunitiesMember);

router.put('/communities/members/', passport.authenticate('jwt', {
  session: false
}), CommunitiesController.UpdateCommunitiesMember);

router.delete('/communities/members/', passport.authenticate('jwt', {
  session: false
}), CommunitiesController.DeleteCommunitiesMember);


//Directory
router.get('/directory/get-all-residents', passport.authenticate('jwt', {
  session: false
}), UserController.GetAllUser);
router.get('/directory/search-residents-by-name/:name', passport.authenticate('jwt', {
  session: false
}), UserController.SearchUserByName);
router.get('/directory/get-all-blood-groups/', passport.authenticate('jwt', {
  session: false
}), BloodGroupsController.GetAllBloodGroup);
router.get('/directory/get-all-residents-by-blood-groups/:blood_group', passport.authenticate('jwt', {
  session: false
}), BloodGroupsController.GetUserByBloodGroup);
router.get('/directory/get-all-residents-vehicles', passport.authenticate('jwt', {
  session: false
}), VehiclesController.GetAllVehicles);
router.get('/directory/search-residents-vehicles-by-number/:number', passport.authenticate('jwt', {
  session: false
}), VehiclesController.SearchVehiclesByNumber);

//#endregion

//#region Visitors
router.get('/visitors/get-all-visitors', passport.authenticate('jwt', {
  session: false
}), VisitorsController.GetAllVisitors);
router.post('/visitors/create-pass', passport.authenticate('jwt', {
  session: false
}), VisitorsController.CreateVisitorsPass);

//#endregion 

//#region Security
router.get('/security/get-details', passport.authenticate('jwt', {
  session: false
}), SecurityController.GetSecurity);

//#endregion 

//#region companies

router.post('/companies', passport.authenticate('jwt', {
  session: false
}), CompanyController.create);
router.get('/companies', passport.authenticate('jwt', {
  session: false
}), CompanyController.getAll);
router.get('/companies/:company_id', passport.authenticate('jwt', {
  session: false
}), custom.company, CompanyController.get);
router.put('/companies/:company_id', passport.authenticate('jwt', {
  session: false
}), custom.company, CompanyController.update);
router.delete('/companies/:company_id', passport.authenticate('jwt', {
  session: false
}), custom.company, CompanyController.remove);

//#endregion 

//#endregion 

//********* CLIENT API END **********



//********* ADMIN API START **********

//#region AdminMethodList

//#region User
// User
router.post('/admin/users', AdminUserController.create);
router.get('/admin/users', passport.authenticate('jwt', {
  session: false
}), AdminUserController.GetAllUser);
router.put('/admin/users', passport.authenticate('jwt', {
  session: false
}), AdminUserController.update);
router.delete('/admin/users', passport.authenticate('jwt', {
  session: false
}), AdminUserController.remove);
router.post('/admin/users/login', AdminUserController.login);
router.post('/admin/users/logout', passport.authenticate('jwt', {
  session: false
}), AdminUserController.logout);
router.get('/admin/users/forgot-password/:email', AdminUserController.forgot_password);
router.post('/admin/users/change-password', passport.authenticate('jwt', {
  session: false
}), AdminUserController.change_password);
router.post('/admin/users/create-new-password/', AdminUserController.create_new_password);
//#endregion 

//#region Staff

router.post('/admin/staff/', passport.authenticate('jwt', {
  session: false
}), AdminStaffController.CreateStaff);

router.get('/admin/staff/', passport.authenticate('jwt', {
  session: false
}), AdminStaffController.GetAllStaff);

router.put('/admin/staff/', passport.authenticate('jwt', {
  session: false
}), AdminStaffController.UpdateStaff);

router.delete('/admin/staff/', passport.authenticate('jwt', {
  session: false
}), AdminStaffController.DeleteStaff);

//#endregion

//#region Maintanence

// Maintanence
router.post('/admin/maintanence/flat-info', passport.authenticate('jwt', {
  session: false
}), AdminMaintanenceController.GetFlatInfobyTower);

router.post('/admin/maintanence/create-ticket', passport.authenticate('jwt', {
  session: false
}), AdminMaintanenceController.CreateTicket);
router.get('/admin/maintanence/esclate-ticket/:id', passport.authenticate('jwt', {
  session: false
}), AdminMaintanenceController.EsclateIssue);
router.get('/admin/maintanence/get-timeslot/:category_id', passport.authenticate('jwt', {
  session: false
}), AdminMaintanenceController.GetTimeSlotFor7Days);
router.put('/admin/maintanence/update-ticket', passport.authenticate('jwt', {
  session: false
}), AdminMaintanenceController.UpdateTicket);
router.get('/admin/maintanence/get-all-ticket/:status/:date/:category_id', passport.authenticate('jwt', {
  session: false
}), AdminMaintanenceController.GetAllTicketByStatus);
router.get('/admin/maintanence/get-all-category', passport.authenticate('jwt', {
  session: false
}), AdminMaintanenceController.GetAllMaintanenceCategory);
router.get('/admin/maintanence/get-staff-engagement-by-category-id/:category_id', passport.authenticate('jwt', {
  session: false
}), AdminMaintanenceController.GetAllStaffEngagementByCategoryID);

//#endregion 

//#region Social

//#region Notice
router.get('/admin/notices/', passport.authenticate('jwt', {
  session: false
}), AdminNoticesController.GetNotices);

router.post('/admin/notices/', passport.authenticate('jwt', {
  session: false
}), AdminNoticesController.CreateNotices);

router.put('/admin/notices/', passport.authenticate('jwt', {
  session: false
}), AdminNoticesController.UpdateNotices);

router.delete('/admin/notices', passport.authenticate('jwt', {
  session: false
}), AdminNoticesController.DeleteNotices);

//#endregion

//#region Communities
router.get('/admin/communities/', passport.authenticate('jwt', {
  session: false
}), AdminCommunitiesController.GetCommunities);

router.post('/admin/communities/', passport.authenticate('jwt', {
  session: false
}), AdminCommunitiesController.CreateCommunities);

router.put('/admin/communities/', passport.authenticate('jwt', {
  session: false
}), AdminCommunitiesController.UpdateCommunities);

router.delete('/admin/communities/', passport.authenticate('jwt', {
  session: false
}), AdminCommunitiesController.DeleteCommunities);
//#endregion

//#region Communities Members
router.get('/admin/communities/members/:communitie_id', passport.authenticate('jwt', {
  session: false
}), AdminCommunitiesController.GetCommunitiesMember);

router.post('/admin/communities/members/', passport.authenticate('jwt', {
  session: false
}), AdminCommunitiesController.CreateCommunitiesMember);

router.put('/admin/communities/members/', passport.authenticate('jwt', {
  session: false
}), AdminCommunitiesController.UpdateCommunitiesMember);

router.delete('/admin/communities/members/', passport.authenticate('jwt', {
  session: false
}), AdminCommunitiesController.DeleteCommunitiesMember);
//#endregion

//#region Events
router.get('/admin/events/', passport.authenticate('jwt', {
  session: false
}), AdminEventsController.GetEvents);

router.post('/admin/events/', passport.authenticate('jwt', {
  session: false
}), AdminEventsController.CreateEvents);

router.put('/admin/events/', passport.authenticate('jwt', {
  session: false
}), AdminEventsController.UpdateEvents);

router.delete('/admin/events/', passport.authenticate('jwt', {
  session: false
}), AdminEventsController.DeleteEvents);
//#endregion

//#region Events Gallery
router.get('/admin/events/gallery/:event_id', passport.authenticate('jwt', {
  session: false
}), AdminEventsController.GetEventsGallery);

router.post('/admin/events/gallery/', passport.authenticate('jwt', {
  session: false
}), AdminEventsController.CreateEventsGallery);

router.put('/admin/events/gallery/', passport.authenticate('jwt', {
  session: false
}), AdminEventsController.UpdateEventsGallery);

router.delete('/admin/events/gallery/', passport.authenticate('jwt', {
  session: false
}), AdminEventsController.DeleteEventsGallery);
//#endregion

//#endregion

//#region Security

//#region Vehicle In Out
router.post('/admin/vehicle/search-by-vehicle-number', passport.authenticate('jwt', {
  session: false
}), AdminVehicleController.GetVehicles);

router.post('/admin/vehicle/vehicle-in-out', passport.authenticate('jwt', {
  session: false
}), AdminVehicleController.GetVehiclesInOut);

router.post('/admin/vehicle/vehicle-in-out-status-update', passport.authenticate('jwt', {
  session: false
}), AdminVehicleController.VehiclesInOutStatusUpdate);

router.post('/admin/vehicle/', passport.authenticate('jwt', {
  session: false
}), AdminVehicleController.CreateVehicle);

router.get('/admin/vehicle/', passport.authenticate('jwt', {
  session: false
}), AdminVehicleController.GetAllVehicle);

router.put('/admin/vehicle/', passport.authenticate('jwt', {
  session: false
}), AdminVehicleController.UpdateVehicle);

router.delete('/admin/vehicle/', passport.authenticate('jwt', {
  session: false
}), AdminVehicleController.DeleteVehicle);

//#endregion

//#region Visitor In Out
router.post('/admin/visitor/search', passport.authenticate('jwt', {
  session: false
}), AdminVisitorController.GetSearchVisitor);

router.post('/admin/visitor/', passport.authenticate('jwt', {
  session: false
}), AdminVisitorController.GetVisitor);

router.post('/admin/visitor/in', passport.authenticate('jwt', {
  session: false
}), AdminVisitorController.VisitorIn);

router.put('/admin/visitor/out', passport.authenticate('jwt', {
  session: false
}), AdminVisitorController.VisitorOut);


//#region Staff In Out
router.post('/admin/staff/search-by-name-number', passport.authenticate('jwt', {
  session: false
}), AdminStaffController.GetStaff);

router.post('/admin/staff/staff-in-out', passport.authenticate('jwt', {
  session: false
}), AdminStaffController.GetStaffInOut);

router.post('/admin/staff/staff-in-out-status-update', passport.authenticate('jwt', {
  session: false
}), AdminStaffController.StaffInOutStatusUpdate);

//#endregion

//#region Domestic Helper In Out
router.post('/admin/domestic-helper/search-by-name-number', passport.authenticate('jwt', {
  session: false
}), AdminDomesticHelperController.GetDomesticHelper);

router.post('/admin/domestic-helper/in-out', passport.authenticate('jwt', {
  session: false
}), AdminDomesticHelperController.GetDomesticHelperInOut);

router.post('/admin/domestic-helper/in-out-status-update', passport.authenticate('jwt', {
  session: false
}), AdminDomesticHelperController.DomesticHelperInOutStatusUpdate);

//#endregion

//#region Domestic Helper

router.post('/admin/domestic-helper/', passport.authenticate('jwt', {
  session: false
}), AdminDomesticHelperController.CreateDomesticHelper);

router.get('/admin/domestic-helper/', passport.authenticate('jwt', {
  session: false
}), AdminDomesticHelperController.GetAllDomesticHelper);

router.put('/admin/domestic-helper/', passport.authenticate('jwt', {
  session: false
}), AdminDomesticHelperController.UpdateDomesticHelper);

router.delete('/admin/domestic-helper/', passport.authenticate('jwt', {
  session: false
}), AdminDomesticHelperController.DeleteDomesticHelper);

//#endregion

//#endregion

//#endregion

//#endregion 

//********* ADMIN API END **********

//********* SUPER ADMIN API START **********

//#region Master Society Tower

// Society Tower
router.get('/admin/tower/get-all-tower', passport.authenticate('jwt', {
  session: false
}), MTTowerController.GetAllTower);

//#endregion 

//#region Master Booking

// Master Booking
router.get('/admin/master/get-all-booking-category', passport.authenticate('jwt', {
  session: false
}), MTBookingController.GetAllBookingCategory);

router.post('/admin/master/create-booking-category', passport.authenticate('jwt', {
  session: false
}), MTBookingController.CreateBookingCategory);

router.put('/admin/master/update-booking-category', passport.authenticate('jwt', {
  session: false
}), MTBookingController.UpdateBookingCategory);

router.delete('/admin/master/delete-booking-category', passport.authenticate('jwt', {
  session: false
}), MTBookingController.DeleteBookingCategory);

//#endregion 

//#region Master Complaint

// Master Complaint
router.get('/admin/master/get-all-complaint-category', passport.authenticate('jwt', {
  session: false
}), MTComplaintController.GetAllComplaintCategory);

router.post('/admin/master/create-complaint-category', passport.authenticate('jwt', {
  session: false
}), MTComplaintController.CreateComplaintCategory);

router.put('/admin/master/update-complaint-category', passport.authenticate('jwt', {
  session: false
}), MTComplaintController.UpdateComplaintCategory);

router.delete('/admin/master/delete-complaint-category', passport.authenticate('jwt', {
  session: false
}), MTComplaintController.DeleteComplaintCategory);

//#endregion 

//#region Master Domestic Helper 

// Master Domestic Helper
router.get('/admin/master/get-all-domestic-helper-category', passport.authenticate('jwt', {
  session: false
}), MTDomesticHelperController.GetAllDomesticHelperCategory);

router.post('/admin/master/create-domestic-helper-category', passport.authenticate('jwt', {
  session: false
}), MTDomesticHelperController.CreateDomesticHelperCategory);

router.put('/admin/master/update-domestic-helper-category', passport.authenticate('jwt', {
  session: false
}), MTDomesticHelperController.UpdateDomesticHelperCategory);

router.delete('/admin/master/delete-domestic-helper-category', passport.authenticate('jwt', {
  session: false
}), MTDomesticHelperController.DeleteDomesticHelperCategory);

//#endregion 

//#region Master Maintenance

// Master Maintenance
router.get('/admin/master/get-all-maintenance-category', passport.authenticate('jwt', {
  session: false
}), MTMaintenanceController.GetAllMaintanenceCategory);

router.post('/admin/master/create-maintenance-category', passport.authenticate('jwt', {
  session: false
}), MTMaintenanceController.CreateMaintanenceCategory);

router.put('/admin/master/update-maintenance-category', passport.authenticate('jwt', {
  session: false
}), MTMaintenanceController.UpdateMaintanenceCategory);

router.delete('/admin/master/delete-maintenance-category', passport.authenticate('jwt', {
  session: false
}), MTMaintenanceController.DeleteMaintanenceCategory);

//#endregion 

//#region Master Society Category

// Master Society Category
router.get('/admin/master/get-all-society-category', passport.authenticate('jwt', {
  session: false
}), MTSocietyCategoryController.GetAllSocietyCategory);

router.post('/admin/master/create-society-category', passport.authenticate('jwt', {
  session: false
}), MTSocietyCategoryController.CreateSocietyCategory);

router.put('/admin/master/update-society-category', passport.authenticate('jwt', {
  session: false
}), MTSocietyCategoryController.UpdateSocietyCategory);

router.delete('/admin/master/delete-society-category', passport.authenticate('jwt', {
  session: false
}), MTSocietyCategoryController.DeleteSocietyCategory);

//#endregion 

//#region Master SOS

// Master SOS Category
router.get('/admin/master/get-all-sos-category', passport.authenticate('jwt', {
  session: false
}), MTSosController.GetAllSOSCategory);

router.post('/admin/master/create-sos-category', passport.authenticate('jwt', {
  session: false
}), MTSosController.CreateSOSCategory);

router.put('/admin/master/update-sos-category', passport.authenticate('jwt', {
  session: false
}), MTSosController.UpdateSOSCategory);

router.delete('/admin/master/delete-sos-category', passport.authenticate('jwt', {
  session: false
}), MTSosController.DeleteSOSCategory);

//#endregion 

//********* SUPER ADMIN API END ************

//********* API DOCUMENTATION **********
router.use('/docs/api.json', express.static(path.join(__dirname, '/../public/v1/documentation/api.json')));
router.use('/docs', express.static(path.join(__dirname, '/../public/v1/documentation/dist')));
router.use('/images', express.static(path.join(__dirname, '/../public/v1/images')));
module.exports = router;