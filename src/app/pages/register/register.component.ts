import { Component, EventEmitter, Output } from '@angular/core';
import { MainServicesService } from '../../shared/services/main-services.service';
import { Extension } from '../../helper/common/extension/extension';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService
import { CommonModule, Location } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() backEvent = new EventEmitter<void>();

  registerForm: FormGroup;
  errorMessage!: string;
  loading = false;

  constructor(
    private mainServices: MainServicesService,
    private extention: Extension,
    private location: Location,
    private toastr: ToastrService, // Inject ToastrService
    private fb: FormBuilder
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      emailOrPhone: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator() });
  }

  backButton() {
    this.backEvent.emit();
  }
  passwordMatchValidator(): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: boolean } | null => {
      const password = formGroup.get('password')?.value;
      const confirmPassword = formGroup.get('confirmPassword')?.value;
      return password && confirmPassword && password !== confirmPassword
        ? { passwordMismatch: true }
        : null;
    };
  }
  confirmRegistration() {
    if (this.registerForm.valid) {
      const input = {
        name: `${this.registerForm.value.firstName} ${this.registerForm.value.lastName}`,
        username: this.registerForm.value.username,
        email: this.registerForm.value.emailOrPhone,
        password: this.registerForm.value.password
      };

      this.mainServices.getSignUp(input).pipe(
        catchError((error) => {
          this.errorMessage = error.error.message.username !== undefined
            ? error.error.message.username[0]
            : error.error.message.password !== undefined
              ? error.error.message.password[0]
              : error.error.message;
          return [];
        })
      ).subscribe((res: any) => {
        if (res != null) {
          this.toastr.success('Registration successful!', 'Success');
          this.closeModalEvent.emit();
        }
      });
    } else {
      this.errorMessage = 'Please fill out the form correctly.';
    }
  }
}
