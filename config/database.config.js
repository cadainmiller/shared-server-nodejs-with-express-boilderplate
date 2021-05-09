const mongoose = require('mongoose');
const chalk = require('chalk');
require('dotenv').config();
module.exports = function (app) {
	mongoose
		.connect(process.env.MONGODB_URI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useFindAndModify: false,
			useCreateIndex: true,
		})
		.then((connrction) => {
			console.log(chalk.yellow('.......................................'));
			console.log(chalk.green('Application is Connected To Database'));
			console.log(chalk.yellow('.......................................'));
		})
		.catch((err) => console.log(err));
	mongoose.Promise = global.Promise;
	process.on('SIGINT', cleanup);
	process.on('SIGTERM', cleanup);
	process.on('SIGHUP', cleanup);
	if (app) {
		app.set('mongoose', mongoose);
	}
};
function cleanup() {
	mongoose.connection.close(function () {
		process.exit(0);
	});
}
