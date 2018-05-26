import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { AuthGuardService } from '../guard/auth.guard'



const routes: Routes = [
  {path: 'main', component: MainPageComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPageRoutingModule { }
