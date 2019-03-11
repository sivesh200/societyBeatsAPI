var request = require("request");

const sendSMS = function (mobile, strMessage) {
    
    var strParms="dest="+mobile+"&msg="+strMessage;
    request("http://api.instaalerts.zone/SendSMS/sendmsg.php?uname=MycraOTP&pass=pass@123&send=SBEATS&"+strParms, function(error, response, body) {
        console.log(body);
      });
}
module.exports.sendSMS = sendSMS;