let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let logger = require('winston');
let morgan = require('morgan');

let config = require('./config');
let db = require('./db');
let router = require('./routes');
let auth = require('./util/auth');
let handleError = require('./util/serviceErrorHandler');

let app = express();
let PORT = process.env.PORT || config.port;
let corsOptions = {
    origin: '*'
};

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors(corsOptions));

auth.init(app);

app.use('/api', router);

app.use((req, res) => {
    res.send(404, 'Page not found');
});

app.use((err, req, res, next) => {
    if (!next) {
        handleError(err, res);
    }

    next(err, req, res);
});

db.connect()
    .then(() => {
        // Start server
        app.listen(PORT, () => {
            logger.info('Server listening on : ', PORT);
        });
    });