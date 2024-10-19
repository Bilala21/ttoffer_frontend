import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GlobalStateService } from '../../shared/services/state/global-state.service';
import { MainServicesService } from '../../shared/services/main-services.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  constructor(private globalStateService: GlobalStateService, private mainServices: MainServicesService, private toastr: ToastrService) { }
  @Input() postData: any = {}
  @Input({ required: true }) postDetialUrl: string = ""
  wishList: any = []
  currentUser: any = {}
  getYear(date: string) {
    return new Date(date).getFullYear();
  }

  toggleWishlist(item: any) {
    this.globalStateService.wishlistToggle(item.id);
    this.globalStateService.currentState.subscribe(state => {
      this.wishList = state.wishListItems
      this.currentUser = state.currentUser
    });
    let input = {
      user_id: this.currentUser.id,
      product_id: item.id
    }
    this.mainServices.addWishList(input).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.toastr.success('Product added to wishlist successfully', 'Success');
        }
        console.log(res, "toggleWishlist");
      },
      error: (err) => {
        this.toastr.error('Failed to add product to wishlist', 'Error');
        console.log(err);
      },
    })
  }
}
