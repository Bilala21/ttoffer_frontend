import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MainServicesService } from '../../shared/services/main-services.service';
import { LoaderComponent } from "../loader/loader.component";
@Component({
  selector: 'app-header-navigation',
  standalone: true,
  imports: [RouterLink, NgFor, LoaderComponent, LoaderComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderNavigationComponent implements OnInit {
  currentUser: any = {}
  loading: boolean = false
  apiData: any = []
  categoryLimit: number = 2
  categories: any = []
  showSearch: boolean = false
  constructor(private mainServicesService: MainServicesService) {
    this.currentUser = JSON.parse(localStorage.getItem('key') as string)
  }
  showSearchBar() {
    this.showSearch = !this.showSearch
  }
  ngOnInit(): void {
    this.loading = true
    this.mainServicesService.getCategories().subscribe({
      next: (res: any) => {
        this.categories = res
        this.loading = false
      },
      error: (err) => {
        console.log(err);
        this.loading = false
      },
    });
  }
}