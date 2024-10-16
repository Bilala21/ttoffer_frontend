import { NgFor } from '@angular/common';
import { Component, OnInit, HostListener } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MainServicesService } from '../../shared/services/main-services.service';
import { LoaderComponent } from "../loader/loader.component";
import { AuthService } from '../../shared/services/authentication/Auth.service';
import { LoginModalComponent } from "../../pages/login-modal/login-modal.component";


@Component({
  selector: 'app-header-navigation',
  standalone: true,
  imports: [RouterLink, NgFor, LoaderComponent, LoginModalComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderNavigationComponent implements OnInit {
  currentUser: any = {};
  loading: boolean = false;
  apiData: any = [];
  categoryLimit: number = 8;
  categories: any = [];
  showSearch: boolean = false;
  screenWidth: number = window.innerWidth;
  screenHeight: number = window.innerHeight;

  constructor(private mainServicesService: MainServicesService,private authService: AuthService,private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('key') as string);
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.getScreenSize();
  }

  getScreenSize() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    if (this.screenWidth < 1024) {
      this.categoryLimit = 4;
    }
    if (this.screenWidth < 576) {
      this.categoryLimit = 2;
    }
    else {
      this.categoryLimit = 8;
    }
  }

  showSearchBar() {
    this.showSearch = !this.showSearch;
  }

  logout() {
    this.loading = true;
    localStorage.clear();
    this.authService.signOut();
    this.router.navigate(['/body']).then(() => {
      window.location.reload();
    });
    this.loading = false;
  }


  ngOnInit(): void {
    this.loading = true;
    this.getScreenSize();
    this.mainServicesService.getCategories().subscribe({
      next: (res: any) => {
        this.categories = res;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      },
    });
  }
  openChat() {
    const storedData = localStorage.getItem('key');
      if (!storedData) {
      this.authService.triggerOpenModal();
      return;
    } else {
      // debugger
      const userData = JSON.parse(storedData);
      const userId = userData?.id; 
      if (userId) {
        this.router.navigate([`/chatBox/${userId}`]);
      }
    }
  }
  openSelling(){
    const storedData = localStorage.getItem('key');
    if (!storedData) {
    this.authService.triggerOpenModal();
    return;
  } else {
    // debugger
    const userData = JSON.parse(storedData);
    const userId = userData?.id; 
    if (userId) {
      this.router.navigate([`/selling/${userId}`]);
    }
  }
  }
  
}
