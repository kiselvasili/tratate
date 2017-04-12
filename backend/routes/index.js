let express = require('express');

let User = require('./User');
let Auth = require('./Auth');

let router = express.Router();

router.use('/user', User);
router.use('/auth', Auth);

module.exports = router;