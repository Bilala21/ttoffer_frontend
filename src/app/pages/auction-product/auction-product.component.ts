import { Component } from '@angular/core';
import { RelatedCarouselComponent } from "../carousels/related-carousel/related-carousel.component";
import { FooterComponent } from "../../shared/shared-components/footer/footer.component";
import { ProductCarouselComponent } from "../carousels/product-carousel/product-carousel.component";
import { HeaderComponent } from "../../shared/shared-components/header/header.component";
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MainServicesService } from '../../shared/services/main-services.service';
import { Extension } from '../../helper/common/extension/extension';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-auction-product',
  standalone: true,
  templateUrl: './auction-product.component.html',
  styleUrl: './auction-product.component.scss',
  imports: [
    RelatedCarouselComponent,
    FooterComponent,
    NgIf,
    ProductCarouselComponent,
    HeaderComponent,
    NgFor,
    CommonModule,
    FormsModule,
    NgxSpinnerComponent
  ]
})
export class AuctionProductComponent {
  showBid: boolean = false;
  allowedToBid: boolean = false;
  isVerified:boolean=false;
  profileImg: any[] = [
    { elipsImg1: 'assets/images/Ellipse1.svg', elipsImg2: 'assets/images/Ellipse2.svg', elipsImg3: 'assets/images/Ellipse3.svg', elipsImg4: 'assets/images/Ellipse4.svg', subHeading1: 'Sale Faster', subHeading2: 'Mark As Sold' }
  ]

  liveAuction: any[] = [
    // {elipsImg:'assets/images/liveProfile1.svg', name:'Ronald Richards', time:'20s',price:'$24.5k'},
    // {elipsImg:'assets/images/liveProfile2.svg',name:'Cameron Williamson', time:'1m', price:'$20k'},
    // {elipsImg:'assets/images/liveProfile3.svg', name:'Guy Hawkins', time:'5m', price:'$15k'},
    // {elipsImg:'assets/images/liveProfile4.svg',name:'Darrell Steward', time:'7m',price:'$12.5k'},
    // {elipsImg:'assets/images/liveProfile5.svg',name:'Wade Warren', time:'10m', price:'$10k'}
  ]
  productId: any;
  auctionProduct: any[] = [];
  auctionProductTemp: any[] = [];
  // featuredProducts: any[] = []
  currentUserid: number = 0
  offerPrice: number = 0;
  center: google.maps.LatLngLiteral = { lat: 24, lng: 12 };
  zoom = 4;
  price: any
  bidlist: any[] = [];
  maxPrice:number = 0
  loading = false;
  calculateRemaningTime!:string;
  IsBit:boolean=false;
  constructor(
    private route: ActivatedRoute,
    private mainServices: MainServicesService,
    private extension: Extension,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService
  ) {
    this.currentUserid = extension.getUserId()
  }
  ngOnInit(): void {

    this.productId = this.route.snapshot.paramMap.get('id')!;
    this.getAuctionProduct();
    this.getBid();
    // this.spinner.show();

    // // Example: Hide spinner after 3 seconds
    // setTimeout(() => {
    //   this.spinner.hide();
    // }, 3000);
  }
  showSuccessMessage(message:string) {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }
  getUserId() {
    const jsonStringGetData = localStorage.getItem('key');
    if (jsonStringGetData) {
      const user = JSON.parse(jsonStringGetData);
      this.currentUserid = user.id;
    }
  }
  showInput() {
    this.showBid = !this.showBid
  }

  openModal() {
    const modal = document.getElementById('offerModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      modal.setAttribute('aria-modal', 'true');
      modal.removeAttribute('aria-hidden');
      document.body.classList.add('modal-open');
      const backdrop = document.createElement('div');
      backdrop.className = 'modal-backdrop fade show';
      document.body.appendChild(backdrop);
    }
  }

  closeModal() {
    const modal = document.getElementById('offerModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
      modal.removeAttribute('aria-modal');
      document.body.classList.remove('modal-open');
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        document.body.removeChild(backdrop);
      }
    }
  }



  getAuctionProduct() {

    this.loading = true;
    this.mainServices.getAuctionProduct().subscribe(res => {
      console.log("Auction Response ",res.data);
      this.auctionProduct = res.data
      this.auctionProductTemp = res.data
      this.auctionProduct = this.auctionProduct.filter((item) => {

        if((item.user.email_verified_at!=null ||item.user.email_verified_at!=undefined)&& (item.user.image_verified_at!=null || item.user.image_verified_at !=undefined) &&(item.user.phone_verified_at!=null || item.user.phone_verified_at !=undefined))
          {
            this.isVerified=true;
          }
          else{
            this.isVerified=false;
          }
          return item.id == this.productId;
      });
      this.allowedToBid = this.auctionProduct.filter((item) => {
        return item.user_id == this.currentUserid;
      }).length <= 0;

      this.loading = false;
      this.auctionProduct = this.auctionProduct.map((item) => {
        let remainingDays = null;
        if (item.starting_date && item.ending_date) {
          const startDate = new Date(item.starting_date);
          const endDate = new Date(item.ending_date);
          const timeDiff = endDate.getDate() - startDate.getDate();
          // remainingDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
          remainingDays = timeDiff
        }
        return {
          ...item,
          remainingDays: remainingDays
        };
      });
      this.startCountdowns();

      console.log(this.auctionProduct)
    })
  }
  startCountdowns() {
    this.auctionProduct.forEach((item, index) => {
      // const endingDateTimeString = `${item.ending_date.split(' ')[0]} ${item.ending_time}`;
      // const endingDateTime = new Date(endingDateTimeString).getTime();

      const datePart = item.ending_date.split('T')[0]; // Extract the date part
      const endingDateTimeString = `${datePart}T${item.ending_time}:00.000Z`; // Combine with the time and format it
      const endingDateTime = new Date(endingDateTimeString).getTime(); // Parse and get the timestamp
      const intervalId = setInterval(() => {
        const nowUTC = Date.now();
        const timeDifference = endingDateTime - nowUTC;
        if (timeDifference <= 0 || Number.isNaN(timeDifference)) {
          clearInterval(intervalId);
          this.calculateRemaningTime='Bid Time Finished';
          this.IsBit=false
          // this.auction.splice(index, 1); // Remove the item from auction
        } else {
          this.calculateRemaningTime= this.formatTimeDifference(timeDifference)+ ' remaining';
          // item.remainingTime = this.formatTimeDifference(timeDifference)+ ' remaining';
          this.IsBit=true;
        }
      }, 1000); // Update every second
    });
  }
  formatTimeDifference(timeDifference: number): string {
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    let formattedTime = '';
    if (days > 0) {
      formattedTime += `${days}d `;
    }
    if (hours > 0 || days > 0) {
      formattedTime += `${hours}h `;
    }
    if (minutes > 0 || hours > 0 || days > 0) {
      formattedTime += `${minutes}m `;
    }
    formattedTime += `${seconds}s`;

    return formattedTime;
  }
  placeBid() {
    this.loading = true;
    if (this.price<this.maxPrice) {
      return
    }
    let input = {
      user_id: this.currentUserid,
      product_id: this.productId,
      price: this.price
    }
    this.mainServices.placeBid(input).subscribe((res:any) => {
      this.showSuccessMessage(res.message)
      this.getBid();
      this.loading = false;
      this.closeModal();
      console.log(res)
    })
  }
  getBid() {
    this.loading = true;
    let input = {
      product_id: this.productId,
    }
    this.profileImg=[];
    this.mainServices.getPlacedBids(input).subscribe((res: any) => {
      this.liveAuction = res.data;

      // this.profileImg = res.data.user;
      res.data.forEach((item:any) => {
        if (item.user && item.user.img) {
          const imgObject = { img: item.user.img };
          this.profileImg.push(imgObject);
        }
      });
      console.log('live auction', this.liveAuction,res,this.profileImg)
      if (this.liveAuction && this.liveAuction.length > 0) {
        const prices = this.liveAuction.map((item) => item.price);
        this.maxPrice = Math.max(...prices);
        // console.log('Max price', maxPrice);
      }
      this.loading = false;
    })
  }
  bid26() {
    this.price = "26000"
  }
  bid28() {
    this.price = "28000"
  }
  bid32() {
    this.price = "32000"
  }
  bid35() {
    this.price = "35000"
  }
}
