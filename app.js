/**
 * Module dependencies
 */

var express = require('express'),
    http = require('http'),
    path = require('path'),
    routes = require('./routes'),
    api = require('./routes/api'),
    database = require('./database/database'),
    documents = require('./database/documents'),
    search = require('./database/search'),
    models = require('./database/models');

var app = module.exports = express();

/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if (app.get('env') === 'development') {
    app.use(express.errorHandler());
}

// production only
if (app.get('env') === 'production') {
    // TODO
}


// Routes
app.get('/', routes.index);
app.get('/partial/:name', routes.partial);

// JSON API
app.get('/api/descriptors', api.descriptors);

// Post requests to database from client-side
app.post('/database/documents/update', function (req, res) {
    documents.updateReport(req, res);
    res.end();
});

app.post('/database/documents/saveNew', function (req, res) {
    documents.newReport(req, res);
    res.end();
});

app.post('/database/documents/descriptors', function (req, res) {
    documents.descriptors(req, res);
    res.end();
});

app.post('/database/search/reports', function (req, res) {
    models.reportModel.find({}, function (err, docs) {
        if (err) return console.log(err + " search.findReports");
        //console.log(docs);
        callback(docs);
    });

    var callback = function (docs) {
        res.send(docs);
    }
});

app.post('/database/search/report', function (req, res) {
    models.reportModel.findById(req.body._id, function (err, doc) {
        if (err) return console.log(err + " search.findReport");
        //console.log(doc);
        callback(doc);
    });

    var callback = function (doc) {
        res.send(doc);
    }
});

app.post('/database/documents/deleteReport', function (req, res) {
    models.reportModel.findById(req.body._id, function (err, doc) {
        if (err) return console.log(err + " error finding report to update");

        doc.remove(callback());
    });

    var callback = function () {
        res.send("Deleted");
    }
});

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

/**
 * Start Database
 */

database.startDatabase();