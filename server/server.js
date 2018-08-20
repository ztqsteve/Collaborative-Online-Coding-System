var express = require('express')
var app = express()
var restRouter = require('./routes/rest');
var indexRouter = require('./routes/index');
var mongoose = require('mongoose');
var path = require('path');

mongoose.connect('mongodb://ztqsteve:Ztq50344630@ds123562.mlab.com:23562/coj', { useNewUrlParser: true });

app.use(express.static(path.join(__dirname, '../public')));
app.use("/", indexRouter);
app.use("/api/v1", restRouter);

app.use(function(req, res) {
  res.sendFile('index.html', { root: path.join(__dirname, '../public/')});
});

app.listen(3000, function () {
  console.log('App listening on port 3000!')
})
