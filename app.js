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
    console.log(req.body.descriptors[0].zonalDominance);
    var reportDoc = new models.reportModel({
        author: {firstName: req.body.firstName, lastName: req.body.lastName},
        created: req.body.created,
        level: req.body.level,
        referringPhysician: req.body.referringPhysician,
        caseID: req.body.caseID,
        descriptors: [
            {
                zonalDominance: [
                    {
                        name: req.body.descriptors[0].zonalDominance[0].name,
                        posterior: true,
                        basal: req.body.descriptors[0].zonalDominance[0].basal,
                        upper: req.body.descriptors[0].zonalDominance[0].upper,
                        middle: req.body.descriptors[0].zonalDominance[0].middle,
                        none: req.body.descriptors[0].zonalDominance[0].none
                    },
                    {
                        name: req.body.descriptors[0].zonalDominance[1].name,
                        posterior: req.body.descriptors[0].zonalDominance[1].posterior,
                        anterior: req.body.descriptors[0].zonalDominance[1].anterior,
                        none: req.body.descriptors[0].zonalDominance[1].none
                    },
                    {
                        name: req.body.descriptors[0].zonalDominance[2].name,
                        symmetrical: req.body.descriptors[0].zonalDominance[2].symmetrical,
                        asymmetrical: req.body.descriptors[0].zonalDominance[2].asymmetrical
                    },
                    {
                        name: req.body.descriptors[0].zonalDominance[3].name,
                        central: req.body.descriptors[0].zonalDominance[3].central,
                        peripheral: req.body.descriptors[0].zonalDominance[3].peripheral,
                        none: req.body.descriptors[0].zonalDominance[3].none
                    }
                ]
            }
        ]

    });

    reportDoc.save(function (err, doc) {
        if (err) {
            console.log(err);
        }
        callback(doc);
    });

    var callback = function (doc) {
        console.log(JSON.stringify(doc.descriptors[0].zonalDominance));
        res.send(doc);
    }
});

app.post('/database/documents/descriptors', function (req, res) {
    documents.descriptors(req, res);
    res.end();
});

app.post('/database/documents/descriptors1', function (req, res) {
    models.reportModel.findById(req.headers._id, function (err, doc) {
        if (err) return console.log(err + " searching report for descriptors1");

        console.log(doc);
        doc.descriptors[0].zonalDominance[0].basal = req.body.descriptors[0].zonalDominance[0].basal;
        doc.descriptors[0].zonalDominance[0].upper = req.body.descriptors[0].zonalDominance[0].upper;
        doc.descriptors[0].zonalDominance[0].middle = req.body.descriptors[0].zonalDominance[0].middle;
        doc.descriptors[0].zonalDominance[0].none = req.body.descriptors[0].zonalDominance[0].none;

        // Antero-Posterior Distribution bound variables
        doc.descriptors[0].zonalDominance[1].anterior = req.body.descriptors[0].zonalDominance[1].anterior;
        doc.descriptors[0].zonalDominance[1].posterior = req.body.descriptors[0].zonalDominance[1].posterior;
        doc.descriptors[0].zonalDominance[1].none = req.body.descriptors[0].zonalDominance[1].none;

        // Left-Right Predominance bound variables
        doc.descriptors[0].zonalDominance[2].symmetrical = req.body.descriptors[0].zonalDominance[2].symmetrical;
        doc.descriptors[0].zonalDominance[2].asymmetrical = req.body.descriptors[0].zonalDominance[2].asymmetrical;

        // Central vs Peripheral Dominance
        doc.descriptors[0].zonalDominance[3].central = req.body.descriptors[0].zonalDominance[3].central;
        doc.descriptors[0].zonalDominance[3].peripheral = req.body.descriptors[0].zonalDominance[3].peripheral;
        doc.descriptors[0].zonalDominance[3].none = req.body.descriptors[0].zonalDominance[3].none;


        doc.save(function (err) {
            if (err) return console.log(err + " error saving updated doc");
            console.log("report descriptors1 updated");
            console.log(JSON.stringify(doc.descriptors[0].zonalDominance));
            callback(doc);
        });

    });

    var callback = function (doc) {
        res.send(doc);
    }
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