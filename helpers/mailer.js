const nodemailer = require('nodemailer');
const path = require('path');
const ejs = require('ejs');
const directoryPath = path.join(__dirname, '../templates/');

var transporter = nodemailer.createTransport({
	host: '',
	port: 0,
	auth: {
		user: '',
		pass: '',
	},
});

exports.send = async function (from, to, subject, data, attachment) {
	await transporter.verify((error, success) => {
		if (error) {
			console.log(error);
		} else {
			console.log('Server is ready to take messages');
		}
	});

	return transporter.sendMail(
		{
			from: from,
			to: to,
			subject: subject,
			html: data,
			attachments: attachment,
		},
		(err, info) => {
			if (err) {
				console.log(err);
			} else {
				console.log('Message sent: ' + info.response);
			}
		}
	);
};
