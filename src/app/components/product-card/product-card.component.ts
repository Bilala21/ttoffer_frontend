import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GlobalStateService } from '../../shared/services/state/global-state.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent implements OnInit {
  constructor(private globalStateService: GlobalStateService) { }
  @Input() postData: any = {}
  @Input({ required: true }) postDetialUrl: string = ""
  wishList: any = []
  getYear(date: string) {
    return new Date(date).getFullYear();
  }

  toggleWishlist(item: any) {
    const currentUser = JSON.parse(localStorage.getItem("key") || '{}');
    console.log(currentUser, "currentUser");
    let input = {
      user_id: 1,
      product_id: item.id
    }
    this.globalStateService.wishlistToggle(item.id);
    this.globalStateService.currentState.subscribe(state => {
      this.wishList = state.wishListItems
      console.log(state.wishListItems, 'state.wishListItems;');
    });
    // this.mainServices.addWishList(input).subscribe((res: any) => {
    // })
  }
  ngOnInit(): void {

    console.log(this.postData, "postData");
  }
}
