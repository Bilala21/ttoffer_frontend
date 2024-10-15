import { Component } from '@angular/core';
import { MainServicesService } from '../../shared/services/main-services.service';
import { HeaderComponent } from '../../shared/shared-components/header/header.component';
import { FooterComponent } from '../../shared/shared-components/footer/footer.component';
import { ProductCarouselComponent } from "../carousels/product-carousel/product-carousel.component";
import { SharedModule } from '../../shared/shared.module';
import { ProductCardComponent } from "../../components/product-card/product-card.component";
import { forkJoin } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-body',
  standalone: true,
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss',

  imports: [HeaderComponent, ProductCardComponent, FooterComponent, ProductCarouselComponent, SharedModule, RouterLink]
})
export class BodyComponent {
  loading = false;
  auctionPosts: any = []
  featuredPosts: any = []
  permotionBanners: any = [
    {
      banner: "https://images.olx.com.pk/thumbnails/493379125-800x600.webp"
    },
    {
      banner: "https://www.ilaan.com/assets/images/pictures/p-upload.png?v=1.2"
    }
  ]
  constructor(
    private mainServices: MainServicesService,
  ) {
  }
  ngOnInit(): void {
    forkJoin({
      auctionProduct: this.mainServices.getAuctionProduct(),
      featureProduct: this.mainServices.getFeatureProduct(),
    }).subscribe({
      next: (response) => {
        this.auctionPosts = response.auctionProduct.data
        this.featuredPosts = response.featureProduct.data
        console.log('Auction Product:', this.auctionPosts);
        console.log('Feature Product:', this.featuredPosts);
      },
      error: (err) => {
        console.error('Error occurred while fetching data', err);
      }
    });
  }
}
