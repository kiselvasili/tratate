'use strict';
var router_1 = require('@angular/router');
var login_component_1 = require('./login/login.component');
var APP_ROUTES = [
    { path: 'login', component: login_component_1.LoginComponent },
    { path: '**', redirectTo: 'login' }
];
exports.routing = router_1.RouterModule.forRoot(APP_ROUTES);
//# sourceMappingURL=app.routes.js.map