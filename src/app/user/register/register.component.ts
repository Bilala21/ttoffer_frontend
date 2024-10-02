import { Component, EventEmitter, Output } from '@angular/core';
import { MainServicesService } from '../../shared/services/main-services.service';
import { Extension } from '../../helper/common/extension/extension';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common'; // Ensure you import Location from @angular/common
import { catchError } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  @Output() closeModalEvent = new EventEmitter<void>(); // Define event emitter
  @Output() backEvent = new EventEmitter<void>(); // Event emitter for back button

  email: string = '';
  phone: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  username: string = '';
  emailOrPhone: string = '';
  confirmPassword: string = '';
  errorMessage!:string;

  loading = false;
  currentUser: any = [];
  constructor(
    private mainServices: MainServicesService, private extention: Extension,
    private location: Location, private snackBar: MatSnackBar){

    }
  backButton() {
    this.backEvent.emit();
  }
  confirmRegistration() {
    let input = {
      name: this.firstName + this.lastName,
      username: this.username,
      email: this.emailOrPhone,
      password: this.password
    }
    this.mainServices.getSignUp(input).pipe(
      catchError((error) => {


        this.errorMessage = error.error.message.username!=undefined ?error.error.message.username[0]:error.error.message.password!=undefined?error.error.message.password[0]:error.error.message ;
        return '';
      })
    ).subscribe((res: any) => {

      if (res != null) {
          // this.showRegisterBox = false;
          this.closeModalEvent.emit();
          this.showSuccessMessage("Account Registered Successfully");

      }
    });
  }
  ValidFor(): boolean {
    return (
      this.firstName.trim() !== '' &&
      this.lastName.trim() !== '' &&
      this.username.trim() !== '' &&
      this.emailOrPhone.trim() !== '' &&
      this.password.trim() !== '' &&
      this.confirmPassword.trim() !== '' &&
      this.confirmPassword == this.password
    )
  }
  showSuccessMessage(message: string) {
    this.snackBar.open(message, '', {
      duration: 100000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }


}
