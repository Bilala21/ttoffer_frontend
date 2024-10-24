import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MainServicesService } from '../../shared/services/main-services.service';
import { GlobalStateService } from '../../shared/services/state/global-state.service';
import { CountdownTimerService } from '../../shared/services/countdown-timer.service';

@Component({
  selector: 'app-post-category',
  templateUrl: './post-category.component.html',
  styleUrls: ['./post-category.component.scss'],
})
export class PostCategoryComponent implements OnInit {
  promotionBanners: any = [
    {
      banner: "https://images.olx.com.pk/thumbnails/493379125-800x600.webp"
    },
  ];
  activeTab: any = "auction";
  data: any = [];

  constructor(
    private route: ActivatedRoute,
    private globalStateService: GlobalStateService,
  ) {}

  handleTab(tab: string) {
    this.activeTab = tab;
    this.globalStateService.updateProdTab("ProductType", tab);
  }

  ngOnInit(): void {
    // Read the 'name' query parameter from the route
    this.route.queryParams.subscribe((params) => {
      const tabName = params['name'] || this.activeTab; 
      this.handleTab(tabName);
    });

    // Subscribe to the current state
    this.globalStateService.currentState.subscribe((state) => {
      this.data = state.filteredProducts;
      this.globalStateService.productlength = this.data.length;
    });
  }
}
