import { Component, OnInit } from '@angular/core';
import { MainServicesService } from '../../shared/services/main-services.service';

@Component({
  selector: 'app-post-category',
  templateUrl: './post-category.component.html',
  styleUrls: ['./post-category.component.scss'],
})
export class PostCategoryComponent implements OnInit {
  activeButton: number = 1;
  isActive = false;
  postCols = 'col-12 col-md-6 col-lg-6 col-xl-4';
  feature = [];
  auction = [];
  constructor(private mainServices: MainServicesService) {}

  ngOnInit() {
    this.getAuctionProduct();
    this.getFeaturedProduct();
  }
  // getAuctionProduct
  getAuctionProduct() {
    this.mainServices.getAuctionProduct().subscribe({
      next: (res) => {
        this.auction = res.data;
        console.log(this.auction);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  // getFeaturedProduct
  getFeaturedProduct() {
    this.mainServices.getFeatureProduct().subscribe({
      next: (res: any) => {
        // Set and sort feature products by created_at date
        this.feature = res.data;
        this.feature = this.feature.sort((a: any, b: any) => {
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        });
        console.log(this.feature);
      },
      error: (error) => {
        if (error.status === 401) {
          // Handle unauthorized access here (e.g., redirect to login)
          console.error('Unauthorized access. Redirecting to login...');
        } else {
          console.error('Error fetching feature product:', error);
        }
      },
    });
  }

  toggleSidebar() {
    this.isActive = !this.isActive;
  }
  setActiveButton(buttonNumber: number) {
    this.activeButton = buttonNumber;
  }
}
