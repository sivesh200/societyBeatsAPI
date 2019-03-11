var fs = require("fs");
var crypto = require('crypto');
var constants = require('../middleware/constants');

const base64FileUpload = async function (dataString, UploadType) {

    // Save base64 image to disk
    try {
        // Decoding base-64 image
        // Source: http://stackoverflow.com/questions/20267939/nodejs-write-base64-image-file
        function decodeBase64Image(dataString) {
            var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
            var response = {};

            if (matches.length !== 3) {
                return new Error('Invalid input string');
            }

            response.type = matches[1];
            response.data = new Buffer(matches[2], 'base64');

            return response;
        }

        // Regular expression for image type:
        // This regular image extracts the "jpeg" from "image/jpeg"
        var imageTypeRegularExpression = /\/(.*?)$/;

        // Generate random string

        var seed = crypto.randomBytes(20);
        var uniqueSHA1String = crypto
            .createHash('sha1')
            .update(seed)
            .digest('hex');

        var imageBuffer = decodeBase64Image(dataString);

        var userUploadedFeedMessagesLocation = './../public/v1/images/';

        var strDirName = "";
        switch (UploadType) {

            case constants.Upload.PROFILE:
                strDirName = "profile/";
                break;
            case constants.Upload.EVENT:
                strDirName = "events/";
                break;
            case constants.Upload.GALLERY:
                strDirName = "gallery/";
                break;
            case constants.Upload.COMMUNITIE:
                strDirName = "communities/";
                break;
            case constants.Upload.ADVERTISING:
                strDirName = "advertisings/";
                break;
            case constants.Upload.BOOKING:
                strDirName = "bookings/";
                break;
            case constants.Upload.MAINTENANCE:
                strDirName = "maintenance/";
                break;
            case constants.Upload.DOMESTIC_HELPER:
                strDirName = "domestic_helper/";
                break;
            case constants.Upload.STAFF_PROFILE:
                strDirName = "staff_profile/";
                break;
            case constants.Upload.KYC:
                strDirName = "kyc/";
                break;
            case constants.Upload.NOTICE:
                strDirName = "notice/";
                break;
            default:
                strDirName = "others/";
                break;
        }

        var uniqueRandomImageName = uniqueSHA1String;
        // This variable is actually an array which has 5 values,
        // The [1] value is the real image extension
        var imageTypeDetected = imageBuffer
            .type
            .match(imageTypeRegularExpression);

        var userUploadedImagePath = userUploadedFeedMessagesLocation + strDirName +
            uniqueRandomImageName +
            '.' +
            imageTypeDetected[1];

        var imageFullName = uniqueRandomImageName + '.' + imageTypeDetected[1];

        // Save decoded binary image to disk
        try {

            fs.writeFile(userUploadedImagePath, imageBuffer.data,
                function (err) {
                    if (err == undefined || err == "") {
                        console.log('User Profile Picture uploaded:', userUploadedImagePath);
                    } else {
                        console.log('ERROR:', err);
                    }
                });
        } catch (error) {
            console.log('ERROR:', error);
        }
        return imageFullName;

    } catch (error) {
        console.log('ERROR:', error);
    }
}
module.exports.base64FileUpload = base64FileUpload;
const cryptorandomString = function (iNumber) {

    var seed = crypto.randomBytes(iNumber);
    var uniqueSHA1String = crypto
        .createHash('sha1')
        .update(seed)
        .digest('hex');
    return uniqueSHA1String;
}
module.exports.cryptorandomString = cryptorandomString;

const randomNumber = function () {

    var value = Math.round(Date.now() + Math.random(), 0);
    return value;
}
module.exports.randomNumber = randomNumber;

const getDateStringCustom = function (oDate) {
    var sDate;
    if (oDate instanceof Date) {
        sDate = oDate.getYear() + 1900 +
            '-' +
            ((oDate.getMonth() + 1 < 10) ? '0' + (oDate.getMonth() + 1) : oDate.getMonth() + 1) +
            '-' + oDate.getDate() +
            ' ' + oDate.getHours() +
            ':' + ((oDate.getMinutes() < 10) ? '0' + (oDate.getMinutes()) : oDate.getMinutes()) +
            ':' + ((oDate.getSeconds() < 10) ? '0' + (oDate.getSeconds()) : oDate.getSeconds());
    } else {
        throw new Error("oDate is not an instance of Date");
    }
    return sDate;
}
module.exports.getDateStringCustom = getDateStringCustom;