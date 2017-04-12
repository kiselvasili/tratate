let logger = require('winston');
let handleError = require('./serviceErrorHandler');

module.exports = (() => {
    let _this = this;
    _this.requestMethods = {
        get: 'GET',
        post: 'POST',
        put: 'PUT',
        delete: 'DELETE'
    };

    _this.getMethod = (req) => {
        return {
            id: req.params.id,
            queryParams: req.query.params,
            user: req.user,
            logout: req.logout
        };
    };

    _this.postMethod = (req) => {
        return {
            id: req.params.id,
            body: req.body,
            user: req.user
        };
    };

    _this.deleteMethod = (req) => {
        return {
            id: req.params.id,
            user: req.user
        };
    };

    _this.parseParameters = (req) => {
        if (req.method === _this.requestMethods.get) {
            return _this.getMethod(req);
        }

        if (req.method === _this.requestMethods.post || req.method === _this.requestMethods.put) {
            return _this.postMethod(req);
        }

        if (req.method === _this.requestMethods.delete) {
            return _this.deleteMethod(req);
        }

        return;
    };

    _this.handleRequest = (req, res, Service, cb) => {
        let service = new Service();
        let params = _this.parseParameters(req);
        let result = cb.call(service, params);

        result
            .then((response) => res.send(response || {}))
            .catch(err => {
                return Promise.reject(handleError(err, res));
            });
    };

    return {
        handleRequest: _this.handleRequest
    };
})();