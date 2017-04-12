let log = require('winston');
let base64url = require('base64url');
let PORT = 8080;
let secretString = base64url('stickydricky');

module.exports = {
    db: {
        dbConnectionString: 'mysql://root:root@localhost:3306/demo2'
    },
    port: PORT,
    url: `http://localhost:${PORT}/`,
    jwtSecret: secretString
};
