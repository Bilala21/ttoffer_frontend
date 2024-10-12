import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MainServicesService } from '../../services/main-services.service';
import { BodyComponent } from '../../../pages/body/body.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NotificationComponent } from "../../../pages/notification/notification.component";
import { routes } from '../../../app.routes';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { Extension } from '../../../helper/common/extension/extension';
import { AuthService } from '../../services/authentication/Auth.service';
import { catchError, of, throwError } from 'rxjs';
import { UserModule } from '../../../user/user.module';
import { LookupService } from '../../services/lookup/lookup.service';
import { category } from '../../Models/Product/category';
import { SharedModule } from '../../shared.module';
@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [
    NgIf,
    FormsModule,
    NgFor,
    CommonModule,
    NotificationComponent,
    RouterModule,
    UserModule,
    SharedModule,
],
})
export class HeaderComponent {
  isMenuDropdownOpen = false;
  sideBarVale = false;
  sideBar() {
    console.log('check');
    this.sideBarVale = !this.sideBarVale;

    if (this.sideBarVale) {
      document.body.style.overflow = 'hidden';
    }else{
      document.body.style.overflow = '';
    }
  }
  

  // haroon-start-code
  isMobileSubMenuVisible = false;
  isDesktop = true;
  maxCategoriesToShow = 8; // Default for desktop

 

  toggleMobileSubMenu() {
    this.isMobileSubMenuVisible = !this.isMobileSubMenuVisible;
  }

  getVisibleCategories() {
    return this.categories;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateScreenSize(event.target.innerWidth);
  }

  updateScreenSize(width: number) {
    if (width < 992) { // Tablet/Mobile screen sizes
      this.isDesktop = false;
      this.maxCategoriesToShow = 4; // Show fewer categories on smaller screens
    } else {
      this.isDesktop = true;
      this.maxCategoriesToShow = 8; // Show more categories on larger screens
    }
  }

  // haroon-end-code
  @ViewChild('inputFields')
  isMobileMenuVisible: boolean = false;
  inputFields: ElementRef[] = [];
  showEmailBox: boolean = false;
  showMainBox: boolean = false;
  showRegisterBox: boolean = false;
  showForgotBox: boolean = false;
  showForgotPhoneBox: boolean = false;
  showOTPBox: boolean = false;
  showPhoneBox: boolean = false;
  isMobileMenuOpen = false;
  isMoreMenuOpen = false;
  featuredProducts: any;
  image: any
  showCarousel: boolean = true;
  showBanner: boolean = true;
  hideHeader: boolean = true;
  email: string = '';
  phone: string = '';
  password: string = '';
  otp: string[] = ['', '', '', '', '', ''];
  otpVerify: number = 0
  firstName: string = '';
  lastName: string = '';
  username: string = '';
  emailOrPhone: string = '';
  confirmPassword: string = '';
  openMenu: boolean = false;
  currentUser: any = [];
  imgUrl: any;
  onlineCount: number = 0;
  dropdownVisible = false;
  private intervalId: any;
  loading = false;
  currentUserId:string="";
  errorMessage!:string;
  categories: any = [
    { imgSrc: '/assets/catImage/mobile.png', title: 'Mobile', id: 1 },
    { imgSrc: '/assets/catImage/electronics.png', title: 'Electronic & Appliances',id: 2 },
    { imgSrc: '/assets/catImage/propertySale.png', title: 'Property For Sale', id: 3 },
    { imgSrc: '/assets/catImage/vahicel.png', title: 'Vahicels',id: 4 },
    { imgSrc: '/assets/catImage/bike.png', title: 'Bikes',id: 5 },
    { imgSrc: '/assets/catImage/jobs.png', title: 'Jobs',id: 6 },
    { imgSrc: '/assets/catImage/service.png', title: 'Services',id: 7 },
    { imgSrc: '/assets/catImage/furniture.png', title: 'Furniture & Home',id: 8 },
    { imgSrc: '/assets/catImage/fashion.png', title: 'Fashion & Beauty', id: 9 },
    { imgSrc: '/assets/catImage/kids.png', title: 'Kids', id: 10},
    { imgSrc: '/assets/catImage/animals.png', title: 'Animals',id: 11 },
    { imgSrc: '/assets/catImage/bit-coin.png', title: 'Crypto Market', subTitle:'Coming Soon'}
  ];
  async ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  updateOnlineCount() {
    // this.onlineCount = Math.floor(Math.random() * 100);
    const min = 700;
    const max = 13000;
    this.onlineCount = Math.floor(Math.random() * (max - min + 1)) + min;
  }
  toggleMobileMenu() {
    this.isMobileMenuVisible = !this.isMobileMenuVisible;
  }
  async ngOnInit(): Promise<void> {
    // Set the screen size on component initialization
    this.updateScreenSize(window.innerWidth);
    if (!localStorage.getItem('key')) {
      this.openModal()
    }
    this.userInfo()
    this.updateOnlineCount();

    this.categories = await this.lookupService.GetProductCategories();
    this.intervalId = setInterval(() => this.updateOnlineCount(), 100000);
  }

  onSubmit() {
    if (this.phone && this.password) {
      console.log('Phone:', this.phone);
      console.log('Password:', this.password);
    }
  }

  openMobileMenu() {
    this.openMenu = !this.openMenu
  }

  resetForm() {
    this.email = '';
    this.phone = '';
    this.password = '';
    this.firstName = '';
    this.lastName = '';
    this.username = '';
    this.emailOrPhone = '';
    this.confirmPassword = '';

  }

  isOTPComplete(): boolean {
    return this.otp.every(value => value.trim() !== '');
  }

  verifyOTP() {
    if (this.isOTPComplete()) {
      console.log('OTP:', this.otp.join(''));
    }
  }

  focusNextInput(index: number) {
    if (index < this.otp.length - 1 && this.otp[index].trim() !== '') {
      this.inputFields[index + 1].nativeElement.focus();
    }
  }



  signIn() {
    if (this.isFormValid()) {
      console.log('Email:', this.email);
      console.log('Password:', this.password);
    }
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

  isFormValid(): boolean {
    return (
      this.email.trim() !== '' && this.password.trim() !== ''

    );
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
          this.showRegisterBox = false;
          this.showSuccessMessage("Account Registered Successfully");

        }
      });
  }
  googleSignIn() {
    this.authService.signInWithGoogle().subscribe({
      next: (result) => {
        const user = result.user;
        if (user) {

          let input = {
            name: user.displayName,
            username: user.email?.split('.com')[0],
            email: user.email,
            password: user.email
          }
          this.googleAccountRegister(input,user);
          console.log('User signed in:', user);
        }
      },
      error: (error) => {

        console.error('Error signing in:', error);
      }
    });
  }
  googleAccountRegister(input: any,user:any) {
    this.mainServices.getSignUp(input).pipe(
        catchError((error: any) => {

        if (error.error.message === "Email address already taken.") {
            let loginInput = {
              email: user.email,
            password: user.email
          }

            this.Login(loginInput);
        }
        else{
          this.showSuccessMessage(error.error.error)
          this.loading=false;
          }

          return of(null);
        })
    ).subscribe(res => {
        if (res != null) {
          let loginInput = {
            email: user.email,
          password: user.password
        }
          this.Login(loginInput);
        }
      });
  }
  Login(loginInput: any) {
    this.mainServices.getAuthByLogin(loginInput).pipe(
        catchError((error: any) => {
        this.showSuccessMessage(error.error.error)
      this.loading=false
          return of(null);
        })
    ).subscribe(res => {
        if (res) {
          // Proceed with login processing if response is not null
          localStorage.setItem('authToken', res.data.token);
          const jsonString = JSON.stringify(res.data.user);
        localStorage.setItem("key", jsonString);
          const jsonStringGetData = localStorage.getItem('key');
        this.currentUser = jsonStringGetData ? JSON.parse(jsonStringGetData) : [];
          this.loading = false;
          this.location.go(this.location.path());
          window.location.reload();
          this.closeModal();
        }
      });
  }
  constructor(
    private lookupService:LookupService,
    private router: Router, private mainServices: MainServicesService, private extention: Extension,
    private location: Location,
    private snackBar: MatSnackBar,
    private authService: AuthService) {
    this.inputFields = new Array(6);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkRoute(event.url);
      }
    });
    this.currentUserId = extention.getUserId();
  }

  isDropdownOpen = false;

  toggleDropdown(event: MouseEvent) {
    this.isDropdownOpen = !this.isDropdownOpen;
    event.stopPropagation();
  }
  toggleDropdown1(event: MouseEvent) {

    this.dropdownVisible = !this.dropdownVisible;
    event.stopPropagation();
  }
  @HostListener('document:click', ['$event'])
  closeDropdownOnOutsideClick(event: MouseEvent): void {
    // Check if the click is outside the dropdown
    if (this.isDropdownOpen && !this.isClickInsideDropdown(event)) {
      this.isDropdownOpen = false;
    }
    if (this.dropdownVisible && !this.isClickInsideDropdown(event)) {
      this.dropdownVisible=false;
    }
  }

  backButton(){
    this.showRegisterBox=false;
    this.showPhoneBox=false;
    this.showEmailBox=false;
  }
  private isClickInsideDropdown(event: MouseEvent): boolean {
    // Check if the click target is the dropdown or a child of it
    const dropdownElement = document.querySelector('.dropdown-menu');
    return dropdownElement?.contains(event.target as Node) || false;
  }
  checkRoute(url: string): void {
    if (url === '/productDetails') {
      this.showCarousel = false;
    }
    else
     if (url === '/profilePage') {
      this.showBanner = false;
      this.showCarousel = false;
      this.hideHeader = false;
    }
    else
     if (url === '/chatBox') {
      this.showBanner = false;
      this.showCarousel = false;
    }
    else if (url === '/selling') {
      this.showBanner = false;
      this.showCarousel = false;
    }
    else if (url === '/whoBoughtAd') {
      this.showBanner = false;
      this.showCarousel = false;
    }
    else
     if (url === '/reviewPage') {
      this.showBanner = false;
      this.showCarousel = false;
    }
    else if (url === '/auctionProduct') {
      this.showBanner = false;
      this.showCarousel = false;
    }
    else if (url === '/auctionUserProfile') {
      this.showBanner = false;
      this.showCarousel = false;
    }
    else {
      this.showBanner = true;
      this.showCarousel = true;
      this.hideHeader = true;
    }
  }
  showSuccessMessage(message: string) {
    this.snackBar.open(message, '', {
      duration: 100000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }


  getAuth() {
    this.loading = true
    let input = {
      email: this.email,
      password: this.password
    }
    this.closeModal();
    this.mainServices.getAuthByLogin(input).subscribe(res => {
      res
        localStorage.setItem('authToken', res.data.token);
        const jsonString = JSON.stringify(res.data.user);
      localStorage.setItem("key", jsonString);
        const jsonStringGetData = localStorage.getItem('key');
      this.currentUser = jsonStringGetData ? JSON.parse(jsonStringGetData) : [];
        this.loading = false;
      this.location.go  (this.location.path());
        window.location.reload();
      this.closeModal()
      },
    (err:any)=>{
      this.showSuccessMessage(err.error.message)
      this.loading=false
      }
  )
  }
  getAuthPhone() {
    this.loading = true
    let input = {
      phone: this.phone,
      password: this.password
    }
    this.closeModal();
    this.mainServices.loginWithPhone(input).subscribe((res:any) => {
      res
        localStorage.setItem('authToken', res.data.token);
        const jsonString = JSON.stringify(res.data.user);
      localStorage.setItem("key", jsonString);
        const jsonStringGetData = localStorage.getItem('key');
      this.currentUser = jsonStringGetData ? JSON.parse(jsonStringGetData) : [];
      this.loading = false
      },
    (err:any)=>{

      this.showSuccessMessage(err.error.message)
      this.loading=false
      }
  )
  }
  openEmail() {
    this.showEmailBox = true
  }
  openRegister() {
    this.showRegisterBox = true
  }
  openOTP() {

    let input = {
      email:this.email
    }
    this.mainServices.forgetPassword(input).subscribe((res:any) => {

      this.otpVerify = res.otp
      console.log(this.otpVerify)
      this.showSuccessMessage(res.msg)
      this.showOTPBox = true
      this.showForgotPhoneBox = false
      this.showForgotBox = false
      },
    (err:any)=>{

      this.showSuccessMessage(err.error.msg)
      this.loading = false
      }
  )
  }
  openForgot() {
    this.showForgotPhoneBox = true
    this.showPhoneBox = false
  }
  openForgotEmail() {
    this.showForgotBox = true
    this.showEmailBox = false
  }
  back() {
  }
  openPhone() {
    this.showPhoneBox = true
  }
  openModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      modal.setAttribute('aria-modal', 'true');
      modal.removeAttribute('aria-hidden');
      document.body.classList.add('modal-open');
      const backdrop = document.createElement('div');
      backdrop.className = 'modal-backdrop fade show';
      document.body.appendChild(backdrop);
    }
  }

  closeModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
      modal.removeAttribute('aria-modal');
      document.body.classList.remove('modal-open');
      const backdrop = document.querySelector('.modal-backdrop');
      this.showEmailBox = false;
      this.showMainBox = false;
      this.showRegisterBox = false;
      this.showPhoneBox = false;
      this.showForgotBox = false;
      this.showOTPBox = false;

      if (backdrop) {
        document.body.removeChild(backdrop);
      }
      this.resetForm();

    }
  }
  userInfo() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const jsonStringGetData = localStorage.getItem('key');
      this.currentUser = jsonStringGetData ? JSON.parse(jsonStringGetData) : [];
      this.imgUrl = this.currentUser.img;
    } else {
      this.currentUser = [];
      this.imgUrl = null;
      console.warn('localStorage is not available.');
    }
  }
  signInWithEmail() {
    if (this.isFormValid()) {
      this.getAuth();
    }
  }
  loginWithPhone() {
    if (this.isFormValid()) {
      this.getAuth();
    }
  }
  navigateToProfilePage(userId: string) {
    this.router.navigate([`/profilePageBy/${userId}/addPost`]);
  }
  // logout(){
  //   this.router.navigate(['/body']);
  //   this.loading = true
  //   localStorage.clear();
  //    this.location.go  (this.location.path());
  //   this.authService.signOut();
  //   window.location.reload();
  //   this.loading = false

  // }
  logout() {
    this.loading = true;


    localStorage.clear();
    this.authService.signOut();


    this.router.navigate(['/body']).then(() => {

      // this.location.go(this.location.path());


      window.location.reload();
    });


    this.loading = false;
  }



}
