import { Component } from '@angular/core';
import { MainServicesService } from '../../shared/services/main-services.service';
import { SharedModule } from "../../shared/shared.module";
import { AppFiltersComponent } from '../../components/app-filters/app-filters.component';
import { CountdownTimerService } from '../../shared/services/countdown-timer.service';
import { forkJoin } from 'rxjs';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { GlobalStateService } from '../../shared/services/state/global-state.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
  imports: [SharedModule, AppFiltersComponent, ProductCardComponent]
})
export class CategoriesComponent {
  constructor(private globalStateService: GlobalStateService, private mainServices: MainServicesService, private countdownTimerService: CountdownTimerService) { }
  promotionBanners: any = [
    {
      banner: "https://images.olx.com.pk/thumbnails/493379125-800x600.webp"
    },
  ]
  activeTab: string = "auction"
  data: any = []
  handleTab(tab: string) {
    this.activeTab = tab
  }
  ngOnInit(): void {
    this.globalStateService.currentState.subscribe((state) => {
      this.data = state.filteredProducts
    })
    if (!this.data.length) {
      forkJoin({
        auctionProduct: this.mainServices.getAuctionProduct(),
      }).subscribe({
        next: (response) => {
          this.data = response.auctionProduct.data;
        },
        error: (err) => {
          console.error('Error occurred while fetching data', err);
        },
      });
    }
  }
}
