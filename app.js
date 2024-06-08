var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var rendaRouter = require('./routes/renda');
var baseRouter = require('./routes/base');
var fgtsRouter =  require('./routes/fgts');
var darfRouter = require('./routes/darf');
<<<<<<< HEAD
var finanRouter = require('./routes/finan');
=======
var custosRouter = require('./routes/custos');
var cambio = require('./routes/cambio.js');

>>>>>>> ebe6132d98a09894b783e4d57476fc76972c533b
var exampleRouter = require('./routes/example');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/renda', rendaRouter);
app.use('/base', baseRouter);
app.use('/darf', darfRouter);
app.use('/fgts',fgtsRouter);
app.use('/example', exampleRouter);
<<<<<<< HEAD
app.use('/finan', finanRouter)
=======
app.use('/custos', custosRouter);
app.use('/cambio', cambio);
>>>>>>> ebe6132d98a09894b783e4d57476fc76972c533b

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
