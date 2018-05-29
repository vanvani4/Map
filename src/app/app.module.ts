import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MainPageModule } from './main-page/main-page.module';
import { AboutAuthorModule } from './about-author/about-author.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { AuthenticationService } from './guard/authentication.service';
import { AuthGuardService } from './guard/auth.guard';
import { MaterialModule } from './material/material.module';

const appRoutes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MainPageModule,
    AboutAuthorModule,
    AuthorizationModule,
    RouterModule.forRoot(appRoutes),
    MaterialModule
  ],
  providers: [AuthenticationService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
