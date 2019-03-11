function define(name, value) {
    Object.defineProperty(exports, name, {
        value: value,
        enumerable: true
    });
}

//define("PI", 3.14);
define("UserType", {
    USER: 0,
    ADMIN: 4
});

define("Status", {
    INACTIVE: 0,
    ACTIVE: 1,
    ARCHIVE: 2,
    REJECT: 3
});

define("Upload", {
    PROFILE: 0,
    EVENT: 1,
    GALLERY: 2,
    COMMUNITIE: 3,
    ADVERTISING: 4,
    BOOKING: 5,
    MAINTENANCE: 6,
    DOMESTIC_HELPER: 7,
    STAFF_PROFILE: 8,
    KYC: 9,
    NOTICE:10
});

define("Date", {
    PREV15DAYS: -3,
    PREV7DAYS: -2,
    YESTERDAY: -1,
    TODAY: 0,
    TOMORROW: 1,
    NEXT7DAYS: 2,
    NEXT15DAYS: 3
});

define("InOutStatus", {
    IN: 0,
    OUT: 1
});

define("VehiclesType", {
    wheelers2: 2,
    wheelers4: 4
});

define("MaintanenceTicketStatus", {
    OPEN: '1',
    CLOSE: '2',
    ASSIGNED: '3',
    ESCLATED: '4',
    UNRESLOVED: '5'
});