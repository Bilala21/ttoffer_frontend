import { Component, Input } from '@angular/core';
import { HeaderComponent } from "../../shared/shared-components/header/header.component";
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../../shared/shared-components/footer/footer.component";
import { MainServicesService } from '../../shared/services/main-services.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-categories',
  standalone: true,
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
  imports: [HeaderComponent, CommonModule, FooterComponent, FormsModule]
})
export class CategoriesComponent {
  @Input() progress: number = 30;
  show: boolean = false
  categorieId: string = ""
  search: string = ""
  sub_category_id: any
  limit: string = ""
  locationId: string = ""
  sort_by: string = ""
  is_urgert: string = ""
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
  subCatContent: any = [];
  loading = false
  trackById(index: number, item: any): number {
    return item.id;
  }

  auction: any[] = []
  feature: any[] = []


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
  constructor(
    private mainServices: MainServicesService,
    private route: ActivatedRoute,
    private http: HttpClient,
  ) { }
  ngOnInit(): void {
    this.categorieId = this.route.snapshot.paramMap.get('id')!;
    this.getAllProducts();
    this.subCategory();

  }
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAllProducts() {

    this.loading = true

    let formData = new FormData();
    let input = {
      search: this.search,
      category_id: this.categorieId,
      sub_category_id: this.sub_category_id,
      limit: this.limit,
      location: this.locationId,
      sort_by: this.sort_by,
      is_urgert: this.is_urgert,
      min_price: this.min_price,
      max_price: this.max_price
    }
    this.mainServices.getAllProducts(input).subscribe((res: any) => {

      this.categories = res.data
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

  categories: any[] = [
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


  getDisplayedItems() {
    return this.showAll ? this.categories : this.categories.slice(0, 15);
  }

  // { title: 'Sub Categories', id: 'flexRadioDefault1', content1: 'Lands & Plots', content2: 'Houses', content3: 'Apartments & Flats', content4: 'Shops - Offices', content5: 'Portions & Floors', content6: 'View all' },
  // { title: 'SELLER TYPE', id: 'flexRadioDefault2', content1: 'Verified Seller', content2: 'Urgents' },
  // { title: 'CONDITIONS', id: 'flexRadioDefault3', content1: 'Any', content2: 'New', content3: 'Used' },

  subCategory() {
    if (this.categorieId == "1") {

      this.subCatContent = [
        { id: 0, category_id: 1, name: "Mobile Phones" },
        { id: 1, category_id: 1, name: "Accessories" },
        { id: 2, category_id: 1, name: "Smart Watches" },
        { id: 3, category_id: 1, name: "Tablets" },
        { id: 3, category_id: 1, name: "Others" },
      ]
    }
    else if (this.categorieId == "2") {

      this.subCatContent = [
        { id: 28, category_id: 2, name: "Computer & Accessories" },
        { id: 29, category_id: 2, name: "Television & Accessories" },
        { id: 30, category_id: 2, name: "AC & Coolers" },
        { id: 31, category_id: 2, name: "Generators, UPS & Power Solutions" },
        { id: 32, category_id: 2, name: "Refrigerators & Freezers" },
        { id: 33, category_id: 2, name: "Air Purifiers & Humidifiers" },
        { id: 34, category_id: 2, name: "Cameras & Accessories" },
        { id: 35, category_id: 2, name: "Games & Entertainment" },
        { id: 36, category_id: 2, name: "Kitchen Appliances" },
        { id: 37, category_id: 2, name: "Fans" },
        { id: 38, category_id: 2, name: "Video-Audios" },
        { id: 39, category_id: 2, name: "Washing Machines & Dryers" },
        { id: 40, category_id: 2, name: "Microwaves & Ovens" },
        { id: 41, category_id: 2, name: "Sewing Machines" },
        { id: 42, category_id: 2, name: "Water Dispensers" },
        { id: 43, category_id: 2, name: "Heater & Geysers" },
        { id: 44, category_id: 2, name: "Irons & Steamers" },
        { id: 45, category_id: 2, name: "Other Home Appliances" },
      ]
    }
    else if (this.categorieId == "3") {

      this.subCatContent = [
        { id: 5, category_id: 3, name: "Lands & Plots" },
        { id: 6, category_id: 3, name: "Houses" },
        { id: 7, category_id: 3, name: "Apartments & Flats" },
        { id: 8, category_id: 3, name: "Shops - Offices - Commercial Space" },
        { id: 9, category_id: 3, name: "Portions & Floors" },
        { id: 10, category_id: 3, name: "Others" },
      ]
    }
    else if (this.categorieId == "4") {

      this.subCatContent = [
        { id: 20, category_id: 4, name: "Portions & Floors" },
        { id: 21, category_id: 4, name: "Houses" },
        { id: 22, category_id: 4, name: "Apartments & Flats" },
        { id: 23, category_id: 4, name: "Shops - Offices - Commercial Space " },
        { id: 24, category_id: 4, name: "Rooms" },
        { id: 25, category_id: 4, name: "Vacation Rentals - Guest Houses" },
        { id: 26, category_id: 4, name: "Roommates & Paying Guests" },
        { id: 26, category_id: 4, name: "Others" },
      ]
    }
    else if (this.categorieId == "5") {

      this.subCatContent = [
        { id: 11, category_id: 5, name: "Cars" },
        { id: 12, category_id: 5, name: "Cars Accessories" },
        { id: 13, category_id: 5, name: "Spare Parts" },
        { id: 14, category_id: 5, name: "Buses, Vans & Trucks" },
        { id: 16, category_id: 5, name: "Tractors & Trailers" },
        { id: 17, category_id: 5, name: "Cars on Installments" },
        { id: 19, category_id: 5, name: "Boats" },
        { id: 18, category_id: 5, name: "Other Vehicles" },
      ]
    }
    else if (this.categorieId == "6") {

      this.subCatContent = [
        { id: 46, category_id: 6, name: "Motorcycles" },
        { id: 47, category_id: 6, name: "Bicycles" },
        { id: 48, category_id: 6, name: "Spare Parts" },
        { id: 49, category_id: 6, name: "Bikes Accessories" },
        { id: 50, category_id: 6, name: "Scooters" },
        { id: 51, category_id: 6, name: "ATV & Quads" },
        { id: 52, category_id: 6, name: "Other Bikes" },
      ]
    }
    else if (this.categorieId == "7") {

      this.subCatContent = [
        { id: 53, category_id: 7, name: "Online" },
        { id: 54, category_id: 7, name: "Architecture & Interior Design" },
        { id: 55, category_id: 7, name: "Education" },
        { id: 56, category_id: 7, name: "Content Writing" },
        { id: 57, category_id: 7, name: "Part time" },
        { id: 58, category_id: 7, name: "Sales" },
        { id: 59, category_id: 7, name: "Marketing" },
        { id: 60, category_id: 7, name: "Customer Service" },
        { id: 61, category_id: 7, name: "Restaurants & Hospitality" },
        { id: 62, category_id: 7, name: "Domestic Staff" },
        { id: 63, category_id: 7, name: "Medical" },
        { id: 64, category_id: 7, name: "Graphic Design" },
        { id: 65, category_id: 7, name: "Accounting & Finance" },
        { id: 66, category_id: 7, name: "IT & Networking" },
        { id: 67, category_id: 7, name: "Delivery Riders" },
        { id: 68, category_id: 7, name: "Hotel & Tourism" },
        { id: 69, category_id: 7, name: "Engineering" },
        { id: 70, category_id: 7, name: "Security" },
        { id: 71, category_id: 7, name: "Manufacturing" },
        { id: 72, category_id: 7, name: "Clerical & Administration" },
        { id: 73, category_id: 7, name: "Human Resources" },
        { id: 74, category_id: 7, name: "Real Estate" },
        { id: 75, category_id: 7, name: "Advertising & PR" },
        { id: 76, category_id: 7, name: "Internships" },
        { id: 77, category_id: 7, name: "Other Jobs" },
      ]
    }
    else if (this.categorieId == "8") {

      this.subCatContent = [
        { id: 78, category_id: 8, name: "Insurance Services" },
        { id: 79, category_id: 8, name: "Tuitions & Academies" },
        { id: 80, category_id: 8, name: "Home & Office Repair" },
        { id: 81, category_id: 8, name: "Car Rental" },
        { id: 82, category_id: 8, name: "Domestic Help" },
        { id: 83, category_id: 8, name: "Web Development" },
        { id: 84, category_id: 8, name: "Travel & Visa" },
        { id: 85, category_id: 8, name: "Electronics & Computer Repair" },
        { id: 86, category_id: 8, name: "Movers & Packers" },
        { id: 87, category_id: 8, name: "Drivers & Taxi" },
        { id: 88, category_id: 8, name: "Health & Beauty" },
        { id: 89, category_id: 8, name: "Event Services" },
        { id: 90, category_id: 8, name: "Construction Services" },
        { id: 91, category_id: 8, name: "Farm & Fresh Food" },
        { id: 92, category_id: 8, name: "Consultancy Services" },
        { id: 93, category_id: 8, name: "Architecture & Interior Design" },
        { id: 94, category_id: 8, name: "Video & Photography" },
        { id: 95, category_id: 8, name: "Renting Services" },
        { id: 96, category_id: 8, name: "Catering & Restaurant" },
        { id: 97, category_id: 8, name: "Car Services" },
        { id: 98, category_id: 8, name: "Tailor Services" },
        { id: 99, category_id: 8, name: "Other Services" },
      ]
    }
    else if (this.categorieId == "9") {

      this.subCatContent = [
        { id: 116, category_id: 9, name: "Sofa & Chairs" },
        { id: 117, category_id: 9, name: "Beds & Wardrobes" },
        { id: 118, category_id: 9, name: "Bathroom & Accessories" },
        { id: 119, category_id: 9, name: "Tables & Dining" },
        { id: 120, category_id: 9, name: "Home Decoration" },
        { id: 121, category_id: 9, name: "Office Furniture" },
        { id: 122, category_id: 9, name: "Garden & Outdoor" },
        { id: 123, category_id: 9, name: "Painting & Mirrors" },
        { id: 124, category_id: 9, name: "Curtain & Blinds" },
        { id: 125, category_id: 9, name: "Rugs & Carpets" },
        { id: 126, category_id: 9, name: "Other" },
      ]
    }
    else if (this.categorieId == "10") {

      this.subCatContent = [
        { id: 127, category_id: 10, name: "Clothes" },
        { id: 128, category_id: 10, name: "Watches" },
        { id: 129, category_id: 10, name: "Wedding" },
        { id: 130, category_id: 10, name: "Footwear" },
        { id: 131, category_id: 10, name: "Skin & Hair" },
        { id: 132, category_id: 10, name: "Jewelry" },
        { id: 133, category_id: 10, name: "Bags" },
        { id: 134, category_id: 10, name: "Makeup" },
        { id: 135, category_id: 10, name: "Fragrance" },
        { id: 136, category_id: 10, name: "Fashion Accessories" },
        { id: 137, category_id: 10, name: "Other Fashion" },
      ]
    }
    else if (this.categorieId == "11") {

      this.subCatContent = [
        { id: 138, category_id: 11, name: "Toys" },
        { id: 139, category_id: 11, name: "Kids Vehicles" },
        { id: 140, category_id: 11, name: "Baby Gear" },
        { id: 141, category_id: 11, name: "Kids Furniture" },
        { id: 142, category_id: 11, name: "Swings & Slides" },
        { id: 143, category_id: 11, name: "Kids Accessories" },
        { id: 144, category_id: 11, name: "Kids Clothings" },
        { id: 145, category_id: 11, name: "Bath & Diapers" },
        { id: 146, category_id: 11, name: "Others" },
      ]
    }
    else if (this.categorieId == "12") {

      this.subCatContent = [
        { id: 100, category_id: 12, name: "Hens" },
        { id: 101, category_id: 12, name: "Parrots" },
        { id: 102, category_id: 12, name: "Livestock" },
        { id: 103, category_id: 12, name: "Cats" },
        { id: 104, category_id: 12, name: "Dogs" },
        { id: 105, category_id: 12, name: "Pet Food & Accessories" },
        { id: 106, category_id: 12, name: "Pigeons" },
        { id: 107, category_id: 12, name: "Rabbits" },
        { id: 108, category_id: 12, name: "Fish" },
        { id: 109, category_id: 12, name: "Other Birds" },
        { id: 110, category_id: 12, name: "Doves" },
        { id: 111, category_id: 12, name: "Fertile Eggs" },
        { id: 112, category_id: 12, name: "Ducks" },
        { id: 113, category_id: 12, name: "Peacocks" },
        { id: 114, category_id: 12, name: "Horses" },
        { id: 115, category_id: 12, name: "Other Animal" },
      ]
    }
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

    // this.is_urgert = condition
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
}
