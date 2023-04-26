require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');

const cors = require('cors');
const { verifyToken } = require('./src/middlewares/auth');
const { syntaxChecker } = require('./src/middlewares/syntax');
const { routes } = require('./src/routes');
const morgan = require('morgan');
const enrolmentController = require('./src/controllers/enrolmentController')

const { PORT, MONGO_URI } = process.env;

// mongodb
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connection Successfull");
}).catch((err) => console.log('no connection'));

// express
const app = express();
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Schedule tasks to be run on the server.
// running it at 1st minute of every hour, on 15th of every month
const scheduledTime = '1 * 15 * *';

cron.schedule(scheduledTime, () => {
    enrolmentController.updateUserEnrolStatus();
});

app.use(syntaxChecker);
app.use(verifyToken);
app.use(morgan('dev'));


routes(app);

app.use('/uploads', express.static('uploads'));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});