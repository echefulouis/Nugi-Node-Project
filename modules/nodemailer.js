'use strict';
const nodemailer = require('nodemailer');

module.export = class MailerClass {
	static async sendMails({ from, receiver, subject, body, template, host, port, user, password }) {
		// Generate test SMTP service account from ethereal.email
		// Only needed if you don't have a real mail account for testing
		let testAccount = await nodemailer.createTestAccount();

		// create reusable transporter object using the default SMTP transport
		let transporter = nodemailer.createTransport({
			host   : host,
			port   : port,
			secure : false, // true for 465, false for other ports
			auth   : {
				user : user, // generated ethereal user
				pass : password // generated ethereal password
			}
		});

		// send mail with defined transport object
		let info = await transporter.sendMail({
			from    : from, // sender address
			to      : receiver, // list of receivers
			subject : subject, // Subject line
			text    : body, // plain text body
			html    : template // html body
		});

		console.log('Message sent: %s', info.messageId);
		// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

		// Preview only available when sending through an Ethereal account
		console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
		// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
	}
};

main().catch(console.error);
