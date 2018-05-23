import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutAuthorRoutingModule } from './about-author-routing.module';
import { AboutAuthorComponent } from './about-author/about-author.component';

@NgModule({
  imports: [
    CommonModule,
    AboutAuthorRoutingModule
  ],
  declarations: [AboutAuthorComponent]
})
export class AboutAuthorModule { }
