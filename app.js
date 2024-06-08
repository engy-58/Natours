const express = require('express');
const morgan = require('morgan');

tourRouter = require('./routes/tourRoutes');
userRouter = require('./routes/userRoutes');

const app = express();

//1-middle wares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('hello from the middleware');
  next();
});

app.use((req, res, next) => {
  req.reqTime = new Date().toISOString();
  next();
});

//2- Route mounting
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
