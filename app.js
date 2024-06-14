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

var custosRouter = require('./routes/custo');
var cambio = require('./routes/cambio.js');
var opcoes = require('./routes/opcoes.js');
var finanRouter = require('./routes/finan')
var jurosRouter = require('./routes/juros')
var cambioRouter = require('./routes/cambio.js')


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

app.use('/custos', custosRouter);
app.use('/cambio', cambio);
app.use('/option', opcoes);
app.use('/finan', finanRouter)
app.use('/juros', jurosRouter)
app.use('/cambio', cambioRouter)

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
