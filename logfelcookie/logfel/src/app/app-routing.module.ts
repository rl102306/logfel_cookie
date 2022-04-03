import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './view/login/login.component';
import { UcfComponent } from './view/ucf/ucf.component';
import { SlGuard } from './guard/sl.guard';
import { NlGuard } from './guard/nl.guard';

const routes: Routes = [
  {path: 'login', component:LoginComponent,canActivate:[SlGuard]},
  {path: 'ucf', component:UcfComponent,canActivate:[NlGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
