//Manage all mail activities
const nodeMailer = require('nodemailer');

let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'varsel.contact@gmail.com',
        pass: '&qAz7mLp8*'
    }
});

module.exports = {
    emailVerification: (req) => {
        
        let url = `${req.protocol}://${req.headers.host}/html/accountVerify.html?email=${req.body.email}&token=${req.body.token}`
        let subject = 'Varsel - Email Verification';
        let html = `<html>
        <body>
        <h3>Hello ${req.body.userName}</h3>
        <p>Thanks for choosing <b>Varsel</b> application to manage your credit & debit.</p>
        <p>Kindly click on below button to activate your account</p>
        <table align="center" border="0" cellspacing="0" cellpadding="0">
        <tbody><tr><td align="center" style="border-radius:2px" bgcolor="#149dcc"> 
        <a title="Activate account" alt="activateaccount" href="${url}" style="font-size:15px;font-family:museo-sans,Arial,Arial,sans-serif;color:#ffffff;text-decoration:none;text-decoration:none;border-radius:2px;padding:7px 12px;border:1px solid #149dcc;display:inline-block;font-weight:bold" target="_blank">Activate Account</a> 
        </td></tr></tbody></table>
        </body>
        </html>`
        if(req.body.lang == 'தமிழ்'){
            url = `${req.protocol}://${req.headers.host}/html/tm/accountVerify.html?email=${req.body.email}&token=${req.body.token}`
            subject = 'வர்செல் - மின்னஞ்சல் சரிபார்ப்பு';
            html = `<html>
                    <body>
                    <h3>வணக்கம் ${req.body.userName}</h3>
                    <p>உங்கள் வரவு மற்றும் பற்று நிர்வகிப்பதற்கு வர்செல்லை தேர்ந்தெடுத்ததற்கு நன்றி.</p>
                    <p>உங்கள் கணக்கை செயல்படுத்த கீழே உள்ள பொத்தானை அழுத்தவும்</p>
                    <table align="center" border="0" cellspacing="0" cellpadding="0">
                    <tbody><tr><td align="center" style="border-radius:2px" bgcolor="#149dcc"> 
                    <a title="Activate account" alt="activateaccount" href="${url}" style="font-size:15px;font-family:museo-sans,Arial,Arial,sans-serif;color:#ffffff;text-decoration:none;text-decoration:none;border-radius:2px;padding:7px 12px;border:1px solid #149dcc;display:inline-block;font-weight:bold" target="_blank">கணக்கைச் செயல்படுத்துக</a> 
                    </td></tr></tbody></table>
                    </body>
                    </html>`
        }
        let verifyEmailOption = {
            from: '"Varsel contact" <varsel.contact@gmail.com>', // sender address
            to: req.body.email, // list of receivers
            subject: subject, // Subject line
            html: html // html body
        };

        transporter.sendMail(verifyEmailOption, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
            // res.render('index');
        });

    }
}