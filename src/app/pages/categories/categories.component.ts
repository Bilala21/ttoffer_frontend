import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { HeaderComponent } from "../../shared/shared-components/header/header.component";
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../../shared/shared-components/footer/footer.component";
import { MainServicesService } from '../../shared/services/main-services.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SharedDataService } from '../../shared/services/shared-data.service';
import { SharedModule } from "../../shared/shared.module";

@Component({
  selector: 'app-categories',
  standalone: true,
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
  imports: [HeaderComponent, CommonModule, FooterComponent, FormsModule, SharedModule,RouterModule]
})
export class CategoriesComponent {
  promotionBanners: any = [
    {
      banner: "https://images.olx.com.pk/thumbnails/493379125-800x600.webp"
    },
  ]
  @Input() progress: number = 30;
  show: boolean = false;
  items = [];
  categorieId: string = ""
  search: string = ""
  sub_category_id: any
  limit: string = ""
  locationId: string = ""
  sort_by: string = ""
  is_urgent: string = ""
  min_price: any
  max_price: any
  isAuctionProduct: boolean = false
  isFeatureProduct: boolean = false
  activeButton: number = 1;
  IsBit:boolean=false;
  calculateRemaningTime!:string;
  searchLocation= "";
  locations: any = [];
  subCategories: any = [
    { title: 'Sub Categories', id: 'flexRadioDefault1', content1: 'Lands & Plots', content2: 'Houses', content3: 'Apartments & Flats', content4: 'Shops - Offices', content5: 'Portions & Floors', content6: 'View all' },
    { title: 'SELLER TYPE', id: 'flexRadioDefault2', content1: 'Verified Seller', content2: 'Urgents' },
    { title: 'CONDITIONS', id: 'flexRadioDefault3', content1: 'Any', content2: 'New', content3: 'Used' },
  ];
  sellerType: any = [
    { id: 'Verified Seller' },
    { id: 'Urgents' }
  ]
  conditions: any = [
    { id: 'Any' },
    { id: 'New' },
    { id: 'Used' }
  ]
  loading = false
  trackById(index: number, item: any): number {
    return item.id;
  }

  categories: any[] = [];

  showAll: boolean = false;

  auction: any[] = []
  feature: any[] = []
  title:any;
  constructor(
    private mainServices: MainServicesService,
    private route: ActivatedRoute,
    private http: HttpClient,public subCategoryService:SharedDataService,public cd:ChangeDetectorRef
  ) { }
  ngOnInit(): void {
    this.categorieId = this.route.snapshot.paramMap.get('id')!;
    this.title = this.route.snapshot.paramMap.get('title')!;

    // this.route.queryParams.subscribe(params => {
    //   this.title = params['title'];
    // });    
    this.getAllProducts();
    // this.subCategory();
this.loadSubCategories(this.categorieId)
  }
  showAuction(buttonIndex: number) {
    this.activeButton = buttonIndex;
  }

  showFeature(buttonIndex: number) {
    this.activeButton = buttonIndex;
  }

  currentUserId: number = 0;
  addWishLst(item: any) {
    ;
    let input = {
      user_id: this.currentUserId,
      product_id: item.id
    }
    this.mainServices.addWishList(input).subscribe((res: any) => {
      ;
      this.getFeatcherdProduct();
      this.getAuctionProduct();
    })
  }
  removeWishLst(item: any) {

    let input = {
      id: item.id
    }
    this.mainServices.removeWishList(input).subscribe((res: any) => {


      this.getFeatcherdProduct();
      this.getAuctionProduct();
    })
  }

  getDisplayedFeatured() {
    return this.showAll ? this.feature : this.feature.slice(0, 8);
  }

  getAuctionProduct() {

    this.mainServices.getAuctionProduct().subscribe(res => {
      this.auction = res.data
      console.log(this.auction)
    })
  }

  getFeatcherdProduct() {
    this.mainServices.getFeatureProduct().subscribe(res => {
      this.feature = res.data
      this.feature = this.feature.sort((a: any, b: any) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
      console.log(this.feature)
    },
      (error) => {
        if (error.status === 401) {
          // console.error('Unauthorized access. Redirecting to login...');
        } else {
          // console.error('Error fetching feature product:', error);
        }
      })
  }
  filterByLocation(){
    if(this.searchLocation !== ""){
      this.auction = this.auction.filter(x=>x.location == this.searchLocation)
      this.feature = this.feature.filter(x=>x.location == this.searchLocation)
    }
  }
  filterByPrice() {
    if (this.min_price != undefined && this.min_price !== null) {
        this.feature = this.feature.filter(item => item.fix_price !== null && item.fix_price >= this.min_price);
        this.auction = this.auction.filter(item => item.auction_price !== null && item.auction_price >= this.min_price);
    }

    if (this.max_price != undefined && this.max_price !== null) {
        this.feature = this.feature.filter(item => item.fix_price !== null && item.fix_price <= this.max_price);
        this.auction = this.auction.filter(item => item.auction_price !== null && item.auction_price <= this.max_price);
    }
}
  getProductByLocation(location:any){
    this.searchLocation = location;
    this.getAllProducts()

  }
  openfilter() {
    this.show = !this.show
  }
 
  loadSubCategories(categoryId: any): void {
    // debugger
   this.subCategoryService.getDataByCategoryId(categoryId);
   
  }
  
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAllProducts() {

    this.loading = true
    let input = {
      search: this.search,
      category_id: this.categorieId,
      sub_category_id: this.sub_category_id,
      limit: this.limit,
      location: this.searchLocation,
      sort_by: this.sort_by,
      is_urgent: this.is_urgent,
      min_price: this.min_price,
      max_price: this.max_price
    }
    // debugger
    this.mainServices.getAllProducts(input).subscribe((res: any) => {

      this.categories = res.data
      this.cd.detectChanges();
      console.log('Categories', this.categories)
      if (this.categories.length > 0) {
        this.feature = []
        this.auction = []
        this.categories.forEach(category => {
          var attributes = null
          const parsedAttributes = JSON.parse(category.attributes);
          if(parsedAttributes.attributes != undefined){
            attributes = JSON.parse(parsedAttributes.attributes);

          }
          if(attributes == null || this.categorieId == attributes.category_id){

          if (category.fix_price !== null) {

            this.feature.push(category);
            this.addLocationIfNotExists(category.location);
            this.filterByLocation();
            this.filterByPrice();
          }
          else if (category.auction_price !== null) {
            this.auction.push(category);
            // this.auction.forEach(item =>{
            //   // this.locations.push(item.)
            // })
            this.addLocationIfNotExists(category.location);
            this.filterByLocation();
            this.filterByPrice();


          }
          else {
            // this.feature = []
            // this.auction = []
          }}
          this.loading = false

        });
        this.feature = this.feature.sort((a: any, b: any) => {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });
        this.auction = this.auction.sort((a: any, b: any) => {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });
        this.startCountdowns();
      }
      else {
        this.loading = false
        this.feature = []
        this.auction = []
      }
    })
  }
  private addLocationIfNotExists(locationId: string) {
    // Check if the location already exists in the array
    if (locationId != null && !this.locations.some((location: { id: string; }) => location.id === locationId)) {
      // Add the new location if it does not exist
      this.locations.push({ id: locationId });
  }
}

startCountdowns() {
  this.auction.forEach((item, index) => {
    // if(item.title =='multi image and vieo'){
    //
    // }
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
    formattedTime += `${days}d `;
} if (hours > 0) {
    formattedTime += `${hours}h `;
} if (minutes > 0) {
    formattedTime += `${minutes}m `;
}
    formattedTime += `${seconds}s `;


  return formattedTime;
}
  getSubCatProducts(row: any) {

    this.sub_category_id = row.id;
    this.getAllProducts();

  }

  // location = [
  //   { title: 'TOP LOCATION', id: 'flexCheckDefault', content1: 'Dhaka, Bangladesh', content2: 'Wisconsin, USA', content3: 'Michigan, USA', content4: 'New York, USA', content5: 'New Mexico, USA', content6: 'Washington, USA', content7: 'Brasilia, Brazil' },
  // ];
  locationRadius = [
    { title: 'LOCATION RADIUS', subTitle: '32 miles' },
  ];

  prices = [
    { title: 'PRICES' },
  ];

  activeIndices: Set<number> = new Set([0, 1, 2]);

  toggleAccordion(index: number) {
    if (this.activeIndices.has(index)) {
      this.activeIndices.delete(index);
    } else {
      this.activeIndices.add(index);
    }
  }

  activeLocationIndex: number | null = 0;
  activeRadiusIndex: number | null = 0;
  activePriceIndex: number | null = 0;

  toggleLocationAccordion(index: number): void {
    this.activeLocationIndex = this.activeLocationIndex === index ? null : index;
  }

  toggleRadiusAccordion(index: number): void {
    this.activeRadiusIndex = this.activeRadiusIndex === index ? null : index;
  }

  togglePriceAccordion(index: number): void {
    this.activeRadiusIndex = this.activeRadiusIndex === index ? null : index;
  }

  isLocationActive(index: number): boolean {
    return this.activeLocationIndex === index;
  }

  isRadiusActive(index: number): boolean {
    return this.activeRadiusIndex === index;
  }

  getCategoryContents(category: any): string[] {
    let contents = [];
    for (let key in category) {
      if (key.startsWith('content')) {
        contents.push(category[key]);
      }
    }
    return contents;
  }

  isActive(index: number): boolean {
    return this.activeIndices.has(index);
  }


  getDisplayedItems() {
    return this.showAll ? this.categories : this.categories.slice(0, 15);
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
  Km(item: any) {
    const attributesObject = JSON.parse(item.attributes);
    if ('attributes' in attributesObject) {
      const parsedAttributes = JSON.parse(attributesObject.attributes);
      return parsedAttributes.mileage;
    }
    return attributesObject.mileage;
  }
  petrol(item: any) {
    const attributesObject = JSON.parse(item.attributes);
    if ('attributes' in attributesObject) {
      const parsedAttributes = JSON.parse(attributesObject.attributes);
      return parsedAttributes.fuelType;
    }
    return attributesObject.fuelType;
  }
  bed(item: any) {
    const attributesObject = JSON.parse(item.attributes);
    if ('attributes' in attributesObject) {
      const parsedAttributes = JSON.parse(attributesObject.attributes);
      return parsedAttributes.bedrooms;
    }
    return attributesObject.bedrooms;
  }
  bath(item: any) {
    const attributesObject = JSON.parse(item.attributes);
    if ('attributes' in attributesObject) {
      const parsedAttributes = JSON.parse(attributesObject.attributes);
      return parsedAttributes.bedrooms;
    }
    return attributesObject.bedrooms;
  }
  getProductCondition(condition: any) {

    if(condition == "Any"){
      this.sort_by =""
    }
    else if(condition == "New"){
      this.sort_by = "newest on top"
    }
    else if(condition == "Used"){
      this.sort_by = "newest on bottom"
    }
    this.getAllProducts()
  }

  // togglePriceAccordion(index: number): void {
  //   this.activeAccordionIndex = this.activeAccordionIndex === index ? -1 : index;
  // }
  // isRadiusActive(index: number): boolean {
  //   return this.activeAccordionIndex === index;
  // }

  updateProgress(): void {
    const maxRange = 1000;
    this.progress = ((this.max_price - this.min_price) / maxRange) * 100;
  }
  // getSubCatProduct(row:any){
  //
  //   this.getAllProducts();

  // }
  sellerVerify(){

  }
  getproductBySellerType(sellerType:any){
    // debugger
this.is_urgent=sellerType;
this.getAllProducts();
  }
}
