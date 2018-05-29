import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPageRoutingModule } from './main-page-routing.module';
import { MaterialModule } from '../material/material.module';
import { MainPageComponent } from './main-page/main-page.component';
import { MainService } from './main.service';

@NgModule({
  imports: [
    CommonModule,
    MainPageRoutingModule,
    MaterialModule
  ],
  declarations: [MainPageComponent],
  providers: [MainService]
})
export class MainPageModule { }
