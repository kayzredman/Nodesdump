const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//(1) ADD THE MIDDLE-WARE FROM EXPRESS(this works with the route handlers)*******
//***************************************************************************************
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(morgan('dev'));
app.use(express.json());

//rendering the static files via express
app.use(express.static(`${__dirname}/starter/public`));

app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//*** (3) ROUTESS */

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
