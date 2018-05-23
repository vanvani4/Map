import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorizationRoutingModule } from './authorization-routing.module';
import { AuthorizationComponent } from './authorization.component';

@NgModule({
  imports: [
    CommonModule,
    AuthorizationRoutingModule
  ],
  declarations: [AuthorizationComponent]
})
export class AuthorizationModule { }
