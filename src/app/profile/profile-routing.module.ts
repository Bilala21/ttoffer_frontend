import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { profile } from 'console';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path:"profile-detail",component:ProfileComponent  
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
