import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmailSignInComponent } from './email-sign-in/email-sign-in.component';
import { PhoneSignInComponent } from './phone-sign-in/phone-sign-in.component';
import { RegisterComponent } from './register/register.component';



@NgModule({
  declarations: [EmailSignInComponent,
    PhoneSignInComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[EmailSignInComponent,
    PhoneSignInComponent,
    RegisterComponent
  ]
})
export class UserModule { }
