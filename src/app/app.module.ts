import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainPageModule } from './main-page/main-page.module';
import { AboutAuthorModule } from './about-author/about-author.module';
import { AuthorizationModule } from './authorization/authorization.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MainPageModule,
    AboutAuthorModule,
    AuthorizationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
