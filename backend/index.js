let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let logger = require('winston');

let app = express();

let PORT = 8080;

let apiRoutes = express.Router();
let corsOptions = {
    origin: '*'
};

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors(corsOptions));

apiRoutes.get('/authenticate', (req, res) => {
    res.status(200).send({success: 'hello vasili'});
});

app.use('/api', apiRoutes);

app.use((req, res) => {
    res.send(404, 'Page not found');
});

app.listen(PORT, () => {
    logger.info('Server listening on : ', PORT);
});