'use strict';

import { Routes, RouterModule} from '@angular/router';
import { LoginComponent} from './login/login.component';

const APP_ROUTES: Routes = [
    {path: 'login', component: LoginComponent},
    {path: '**', redirectTo: 'login'}
];

export const routing = RouterModule.forRoot(APP_ROUTES);