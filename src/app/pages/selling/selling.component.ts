import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../../shared/shared-components/header/header.component";
import { FooterComponent } from "../../shared/shared-components/footer/footer.component";
import { RouterLink } from '@angular/router';
import { SellingNotfoundComponent } from '../../components/selling/selling-notfound/selling-notfound.component';
import { TabsComponent } from '../../components/selling/tabs/tabs.component';
import { GlobalStateService } from '../../shared/services/state/global-state.service';
import { CardComponent } from '../../components/selling/card/card.component';
import { MainServicesService } from '../../shared/services/main-services.service';

@Component({
  selector: 'app-selling',
  standalone: true,
  templateUrl: './selling.component.html',
  styleUrl: './selling.component.scss',
  imports: [FormsModule, CommonModule, RouterLink, NgIf, NgClass, NgFor, CardComponent, HeaderComponent, FooterComponent, SellingNotfoundComponent, TabsComponent]
})

export class SellingComponent {
  loading = false;
  apiData: any = {}
  activeTab: string = "selling"
  tabs: any = [
    { index: 1, tabName: "selling" },
    { index: 2, tabName: "purchase" },
    { index: 3, tabName: "archive" }
  ]

  notFoundData: any = {
    "selling": {
      tabName: "selling",
      image: "/assets/sellling/selling-notfoun1.png",
      heading: "Begin Selling Items!",
      text: "Make local buying and selling easy and straightforward!",
    },
    "purchase": {
      tabName: "buying",
      image: "/assets/sellling/selling-notfoun1.png",
      heading: "Begin Buying Items!",
    },
    "archive": {
      tabName: "archive",
      image: "/assets/sellling/archive.png",
      heading: "When you archive an item, it’ll appear here",
    }
  }
  constructor(
    private globalStateService: GlobalStateService, private mainServicesService: MainServicesService
  ) {

  }
  async getData() {
    this.loading=true
    this.mainServicesService.getSelling().subscribe({
      next: (res: any) => {
        this.apiData = res.data;
        this.loading=false
      },
      error: (err) => {
        console.log(err);
        this.loading=false
      },
    });
  }

  ngOnInit(): void {
    this.globalStateService.currentState.subscribe(state => {
      this.activeTab = state.tab.tabName;
    });
    this.getData()
    
  }
}
