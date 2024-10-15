import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmailSignInComponent } from '../pages/email-sign-in/email-sign-in.component';
import { PhoneSignInComponent } from '../pages/phone-sign-in/phone-sign-in.component';
import { RegisterComponent } from '../pages/register/register.component';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
  ]
})
export class UserModule { }
