import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent} from './app.component'
import { routing } from './app.routes'
import { LoginComponent } from "./login/login.component";
import { HashLocationStrategy, Location, LocationStrategy} from "@angular/common";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        routing
    ],
    providers: [
        Location,
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        }
    ],
    declarations: [
        AppComponent,
        LoginComponent
    ],
    bootstrap:    [
        AppComponent
    ]
})

export class AppModule {}