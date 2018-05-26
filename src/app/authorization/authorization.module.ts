import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthorizationRoutingModule } from './authorization-routing.module';
import { AuthorizationComponent } from './login-page/authorization.component';

@NgModule({
  imports: [
    CommonModule,
    AuthorizationRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AuthorizationComponent]
})
export class AuthorizationModule { }
