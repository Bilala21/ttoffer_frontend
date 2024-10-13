import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { MainServicesService } from '../../shared/services/main-services.service';
import { HeaderComponent } from '../../shared/shared-components/header/header.component';
import { FooterComponent } from '../../shared/shared-components/footer/footer.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ProductCarouselComponent } from "../carousels/product-carousel/product-carousel.component";
import { Extension } from '../../helper/common/extension/extension';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostModule } from "../../post/post.module";
import { SliderComponent } from "../../shared/shared-components/slider/slider.component";
import { PromotionSliderComponent } from "../../shared/shared-components/promotion-slider/promotion-slider.component";
import { SharedModule } from '../../shared/shared.module';






@Component({
  selector: 'app-body',
  standalone: true,
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss',

  imports: [HeaderComponent, FooterComponent, NgFor, ProductCarouselComponent, NgIf, CommonModule, PostModule,SharedModule]
})
export class BodyComponent {
  showText:string = 'Crypto Market';
  calculateRemaningTime!:string;
  IsBit:boolean=false;
  postCols = "col-12 col-md-6 col-lg-4 col-xl-3"
  firstRowItems =  [
    { imgSrc: '/assets/catImage/mobile.png', title: 'Mobile', id: 1 },
    { imgSrc: '/assets/catImage/electronics.png', title: 'Electronic & Appliances',id: 2 },
    { imgSrc: '/assets/catImage/propertySale.png', title: 'Property For Sale', id: 3 },
    { imgSrc: '/assets/catImage/propertyRent.png', title: 'Property for Rent',id: 4 },
    { imgSrc: '/assets/catImage/vahicel.png', title: 'Vahicels',id: 5 },
    { imgSrc: '/assets/catImage/bike.png', title: 'Bikes',id: 6 },
    { imgSrc: '/assets/catImage/jobs.png', title: 'Jobs',id: 7 },
    { imgSrc: '/assets/catImage/service.png', title: 'Services',id: 8 },
    { imgSrc: '/assets/catImage/furniture.png', title: 'Furniture & Home',id: 9 },
    { imgSrc: '/assets/catImage/fashion.png', title: 'Fashion & Beauty', id: 10 },
    { imgSrc: '/assets/catImage/kids.png', title: 'Kids', id: 11},
    { imgSrc: '/assets/catImage/animals.png', title: 'Animals',id: 12 },
    { imgSrc: '/assets/catImage/bit-coin.png', title: 'Crypto Market', subTitle:'Coming Soon'}
  ];

  image: any
  featuredProducts: any[] = [
    // { id: 1, price: "$2,94,000", title: "HYUNDAI GRAND | 10 1.3 CRDI", year: "2024", km: "2452Km", petrol: "Petrol", location: "2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName: "car-img.png" },
    // { id: 2, price: "$3,00,000", title: "Tourch Light", year: "2024", km: "2452Km", petrol: "Petrol", location: "2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName: "house-img.png" },
    // { id: 3, price: "$4,000", title: "Test Cards etc", year: "2024", km: "2452Km", petrol: "Petrol", location: "2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName: "car-img.png" },
    // { id: 4, price: "$2,94,000", title: "Best Products", year: "2024", km: "2452Km", petrol: "Petrol", location: "2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName: "house-img.png" },
    // { id: 5, price: "$9,000", title: "Working ON It", year: "2024", km: "2452Km", petrol: "Petrol", location: "2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName: "car-img.png" },
    // { id: 6, price: "$84,000", title: "HYUNDAI GRAND | 10 1.3 CRDI", year: "2024", km: "2452Km", petrol: "Petrol", location: "2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName: "house-img.png" },
    // { id: 7, price: "$24,000", title: "HYUNDAI GRAND | 10 1.3 CRDI", year: "2024", km: "2452Km", petrol: "Petrol", location: "2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName: "car-img.png" },
    // { id: 8, price: "$29,000", title: "HYUNDAI GRAND | 10 1.3 CRDI", year: "2024", km: "2452Km", petrol: "Petrol", location: "2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName: "house-img.png" },
    // { id: 9, price: "$20,000", title: "HYUNDAI GRAND | 10 1.3 CRDI", year: "2024", km: "2452Km", petrol: "Petrol", location: "2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName: "car-img.png" },
    // { id: 10, price: "$2,000", title: "HYUNDAI GRAND | 10 1.3 CRDI", year: "2024", km: "2452Km", petrol: "Petrol", location: "2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName: "house-img.png" },
    // { id: 11, price: "$8,000", title: "HYUNDAI GRAND | 10 1.3 CRDI", year: "2024", km: "2452Km", petrol: "Petrol", location: "2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName: "car-img.png" },
    // { id: 12, price: "$10,000", title: "HYUNDAI GRAND | 10 1.3 CRDI", year: "2024", km: "2452Km", petrol: "Petrol", location: "2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName: "house-img.png" },
  ];
  auctionProduct: any[] = [
    // { id: 1, price: "$2,94,000", title: "HYUNDAI GRAND | 10 1.3 CRDI", year: "2024", km: "2452Km", petrol: "Petrol", location: "2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName: "car-img.png" },
    // { id: 2, price: "$3,00,000", title: "Tourch Light", year: "2024", km: "2452Km", petrol: "Petrol", location: "2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName: "house-img.png" },
    // { id: 3, price: "$4,000", title: "Test Cards etc", year: "2024", km: "2452Km", petrol: "Petrol", location: "2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName: "car-img.png" },
    // { id: 4, price: "$2,94,000", title: "Best Products", year: "2024", km: "2452Km", petrol: "Petrol", location: "2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName: "house-img.png" },
    // { id: 5, price: "$9,000", title: "Working ON It", year: "2024", km: "2452Km", petrol: "Petrol", location: "2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName: "car-img.png" },
    // { id: 6, price: "$84,000", title: "HYUNDAI GRAND | 10 1.3 CRDI", year: "2024", km: "2452Km", petrol: "Petrol", location: "2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName: "house-img.png" },
    // { id: 7, price: "$24,000", title: "HYUNDAI GRAND | 10 1.3 CRDI", year: "2024", km: "2452Km", petrol: "Petrol", location: "2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName: "car-img.png" },
    // { id: 8, price: "$29,000", title: "HYUNDAI GRAND | 10 1.3 CRDI", year: "2024", km: "2452Km", petrol: "Petrol", location: "2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName: "house-img.png" },
    // { id: 9, price: "$20,000", title: "HYUNDAI GRAND | 10 1.3 CRDI", year: "2024", km: "2452Km", petrol: "Petrol", location: "2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName: "car-img.png" },
    // { id: 10, price: "$2,000", title: "HYUNDAI GRAND | 10 1.3 CRDI", year: "2024", km: "2452Km", petrol: "Petrol", location: "2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName: "house-img.png" },
    // { id: 11, price: "$8,000", title: "HYUNDAI GRAND | 10 1.3 CRDI", year: "2024", km: "2452Km", petrol: "Petrol", location: "2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName: "car-img.png" },
    // { id: 12, price: "$10,000", title: "HYUNDAI GRAND | 10 1.3 CRDI", year: "2024", km: "2452Km", petrol: "Petrol", location: "2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName: "house-img.png" },
  ]

  showAll: boolean = false;
  currentUserId : number = 0;
  loading = false;
  constructor(
    private mainServices: MainServicesService,
    private extension: Extension,
    private snackBar: MatSnackBar
  ) {
    this.currentUserId = this.extension.getUserId()
   }
   showSuccessMessage(message:string) {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }
  ngOnInit(){
    if (this.currentUserId>0) {
      this.getFeatcherdProduct();
      this.getAuctionProduct();
      // this.firstRowItems = this.firstRowItems
    }
  }
  getFeatcherdProduct() {
    this.loading = true;
    this.mainServices.getFeatureProduct().subscribe(res =>{
      this.featuredProducts = res.data
      this.featuredProducts = this.featuredProducts.sort((a: any, b: any) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
      console.log(this.featuredProducts)
      this.loading = false;
    },
    (error) => {
      if (error.status === 401) {
        this.loading = false;
        // console.error('Unauthorized access. Redirecting to login...');
      } else {
        this.loading = false;
        // console.error('Error fetching feature product:', error);
      }
    })
  }
  toggleView(): void {
    this.showAll = !this.showAll;
  }
  getDisplayedItems() {
    return this.showAll ? this.auctionProduct : this.auctionProduct.slice(0, 8);
  }
  getDisplayedFeatured() {
    return this.showAll ? this.featuredProducts : this.featuredProducts.slice(0, 8);
  }
  getBidNow() {
    // return
  }
  getAuctionProduct(){
    this.loading = true;

    this.mainServices.getAuctionProduct().subscribe(res =>{

      this.auctionProduct = res.data
      this.auctionProduct = this.auctionProduct.sort((a: any, b: any) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });

      console.log(this.auctionProduct)
      this.loading = false;
      this.auctionProduct = this.auctionProduct.map((item) => {
        let remainingDays = null;
        if (item.starting_date && item.ending_date) {
          const startDate = new Date(item.starting_date);
          const endDate = new Date(item.ending_date);
          const timeDiff = endDate.getDate() - startDate.getDate();
          // remainingDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
          remainingDays = timeDiff;
          item.isAllowedToBid = item.user_id != this.currentUserId;


        }
        return {
          ...item,
          remainingDays: remainingDays
        };
      });
      this.startCountdowns();
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
          item.calculateRemaningTime='Bid Expired';
          item.IsBit=false
          // this.auction.splice(index, 1); // Remove the item from auction
        } else {
          item.calculateRemaningTime = this.formatTimeDifference(timeDifference);
          // item.remainingTime = this.formatTimeDifference(timeDifference)+ ' remaining';
          item.IsBit=true;
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
      formattedTime += `${days} days`;
  } else if (hours > 0) {
      formattedTime += `${hours} hours`;
  } else if (minutes > 0) {
      formattedTime += `${minutes} minutes`;
  } else {
      formattedTime += `${seconds} seconds`;
  }

    return formattedTime;
  }
  addWishLst(item:any){
    this.loading = true;
    let input = {
      user_id:this.currentUserId,
      product_id:item.id
    }
    this.mainServices.addWishList(input).subscribe((res:any) =>{
      this.showSuccessMessage(res.message)
      this.getFeatcherdProduct();
      this.getAuctionProduct();
      this.loading = false;
    })
  }
  removeWishLst(item:any){
    this.loading = true;
    let input = {
      id:item.id
    }
    this.mainServices.removeWishList(input).subscribe((res:any) =>{
      this.showSuccessMessage(res.message)
      res
      this.showSuccessMessage(res.message)
      this.getFeatcherdProduct();
      this.getAuctionProduct();
      this.loading = false;
    },(err:any) =>{
      this.showSuccessMessage(err)
      this.loading = false;
    })
  }
  isVehicle(item: any): boolean {

    const attributesObject = JSON.parse(item.attributes);
    if ('attributes' in attributesObject) {
      const parsedAttributes = JSON.parse(attributesObject.attributes);
      return parsedAttributes.category_id === 'Vehicles';
    }
    return attributesObject.category_name === 'Vehicles';
  }
  isProperty(item: any): boolean {

    const attributesObject = JSON.parse(item.attributes);
    if ('attributes' in attributesObject) {
      const parsedAttributes = JSON.parse(attributesObject.attributes);
      return parsedAttributes.category_id === 'Property for Sale';
    }
    return attributesObject.category_name === 'Property for Sale';
  }
  Km(item:any){
    const attributesObject = JSON.parse(item.attributes);
    if ('attributes' in attributesObject) {
      const parsedAttributes = JSON.parse(attributesObject.attributes);
      return parsedAttributes.mileage;
    }
    return attributesObject.mileage ;
  }
  petrol(item:any){
    const attributesObject = JSON.parse(item.attributes);
    if ('attributes' in attributesObject) {
      const parsedAttributes = JSON.parse(attributesObject.attributes);
      return parsedAttributes.fuelType;
    }
    return attributesObject.fuelType ;
  }
  bed(item:any){
    const attributesObject = JSON.parse(item.attributes);
    if ('attributes' in attributesObject) {
      const parsedAttributes = JSON.parse(attributesObject.attributes);
      return parsedAttributes.bedrooms;
    }
    return attributesObject.bedrooms ;
  }
  bath(item:any){
    const attributesObject = JSON.parse(item.attributes);
    if ('attributes' in attributesObject) {
      const parsedAttributes = JSON.parse(attributesObject.attributes);
      return parsedAttributes.bedrooms;
    }
    return attributesObject.bedrooms ;
  }
}
