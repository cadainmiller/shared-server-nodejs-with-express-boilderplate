const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const chalk = require('chalk');
const rateLimit = require('express-rate-limit');
const apiResponse = require('./helpers/apiResponse');
const apiRouter = require('./routes/api');
app = express();
port = process.env.PORT || 3000;

require('./config/database.config')(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//To allow cross-origin requests
app.use(cors());

// Against brute attack
const rateLimiter = rateLimit({
	max: 200,
	windowMs: 60 * 60 * 1000,
	message: 'Too many request from this IP, please try again in an hour!',
});

// rate liniter
app.use('/api/', rateLimiter);

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	res.setHeader('Access-Control-Max-Age', '1800');
	res.setHeader('Access-Control-Allow-Headers', 'content-type');
	res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	next();
});

//Route Prefixes
app.use('/api/', apiRouter);

// throw 404 if URL not found
app.all('*', (req, res) => {
	return apiResponse.notFoundResponse(res, 'Page not found');
});

app.use((err, req, res) => {
	if (err.name == 'UnauthorizedError') {
		return apiResponse.unauthorizedResponse(res, err.message);
	}
});

app.listen(port);
console.log(chalk.yellow('.......................................'));
console.log(chalk.green(`API server started on: ${port}`));
console.log(chalk.yellow('.......................................'));
