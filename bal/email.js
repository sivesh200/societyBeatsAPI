var fs = require('fs'),
https = require('https'),
express = require('express'),
app = express();
var bodyParser = require("body-parser");

https.createServer({
    key: fs.readFileSync('bi1.pem'),
    cert: fs.readFileSync('bi1.pem'),
    passphrase: 'bi123'
}, app).listen(55555, '185.2.100.206', function() {
console.log("Started listening at : 55555");
console.log("===========================================");
});
app.use(bodyParser.json());

app.get('/', function (req, res) {
	console.log("hi");
	res.header('Content-type', 'text/html');
  
  return res.end('Hello, Secure World!');
});
app.use(function(req, res, next) {
  res.header('Content-type', 'applicaiton/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/mail', function(req, res) {
    var response = {
        result:false,
        msg:''
    };
    var input=req.body;
    const nodemailer = require('nodemailer');
    
    const ejs = require('ejs');
    const fs = require('fs');

    let file = 'v1/tmpl/' + (input.tmpl==undefined?'mail':input.tmpl) + '.ejs';

    let from = (input.from==undefined?'Block Innovation Website':input.from) 

    let transporter = nodemailer.createTransport({
        host: 'smtp.traderscabinet.com',
        port: 587,
        secure: false,
        auth: {
            user: 'no-reply@traderscabinet.com',
            pass: 'a!A$A$@2'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let mailOptions = {
        from: '"'+from+'" <no-reply@traderscabinet.com>',
        to: input.to,
        cc: (input.cc!=undefined?input.cc:''),
        bcc: (input.bcc!=undefined?input.bcc:''),
        subject: input.sub + ' ?',
        html: ejs.render(fs.readFileSync(file, 'utf-8'), { mensagem: 'olá, funciona' })
    };
    let c='';
    if(input.data != undefined){
        for(var propertyName in input.data) {
            mailOptions.html = replaceAll(mailOptions.html,'{'+propertyName+'}',input.data[propertyName]);
        }
    }
    // console.log("Mail COntent",mailOptions.html);
    transporter.sendMail(mailOptions, (error, info) => {
        
        if (error) {
            response.msg =error.toString();
            return res.end(JSON.stringify(response));
            // res.end(error.toString());
        }
        let d = new Date();
        console.log('Message %s sent: %s', info.messageId, info.response);
        console.log('Mail has been sended to %s as on %s',input.to,d.toString());
        console.log('------------------------------------------------------------------------------');
        response.result = true;
        response.msg = 'Message '+ info.messageId +' sent: '+ info.response;
        // return res.end('Message '+ info.messageId +' sent: '+ info.response);
        return res.end(JSON.stringify(response));
    });
    response.msg = "Mail sended";
    response.result = true;
    return res.end(JSON.stringify(response));
    // return res.end('send');
});
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}
// var https = require('https');
// var fs = require('fs');

// var options = {
//   key: fs.readFileSync('key.pem'),
//   cert: fs.readFileSync('cert.pem')
// };

// https.createServer(options, function (req, res) {
//   res.writeHead(200);
//   res.end("hello world\n");
// }).listen(8000);
