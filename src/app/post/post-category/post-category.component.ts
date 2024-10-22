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
  constructor(private globalStateService: GlobalStateService, private mainServices: MainServicesService, private countdownTimerService: CountdownTimerService,private cd:ChangeDetectorRef) {
  }
  activeButton: number = 1;
  isActive = false;
  postCols = 'col-12 col-md-6 col-lg-6 col-xl-4';
  feature = [];
  auction = [];
  data:any[]=[]
  promotionBanners: any = [
    {
      banner: "https://images.olx.com.pk/thumbnails/493379125-800x600.webp"
    },
  ]
  activeTab: any = "auction"
  handleTab(tab: string) {
   
    this.activeTab = tab
    this.globalStateService.updateProdTab("ProductType", tab)
  }

  ngOnInit() {
    // this.getAuctionProduct();
    // this.getFeaturedProduct();
    this.handleTab(this.activeTab)

    this.globalStateService.currentState.subscribe((state) => {
      this.data = state.filteredProducts;
      this.globalStateService.productlength=this.data.length
      // this.activeTab = state.prodTab

    })
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