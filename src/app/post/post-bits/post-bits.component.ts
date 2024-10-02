import { Component, OnInit } from '@angular/core';
import { LookupService } from '../../shared/services/lookup/lookup.service';
import { Bid } from '../../shared/Models/Product/Bid';

@Component({
  selector: 'app-post-bits',
  templateUrl: './post-bits.component.html',
  styleUrls: ['./post-bits.component.css']
})
export class PostBitsComponent implements OnInit {
  showBid: boolean = false;
  bids: Bid[] = [];

  constructor(private lookUpService: LookupService) {}

  ngOnInit(): void {
    this.loadBids(1); // Example: Load bids for page 1
  }

  async loadBids(page: number) {
    try {
      this.bids = await this.lookUpService.GetBidListByProduct(page);
    } catch (error) {
      console.error('Error loading bids:', error);
    }
  }
  showInput() {
    this.showBid = !this.showBid
  }
}
