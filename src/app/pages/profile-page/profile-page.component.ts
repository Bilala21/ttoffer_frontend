import { CommonModule, NgFor, NgIf, Location } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/shared-components/header/header.component";
import { FooterComponent } from "../../shared/shared-components/footer/footer.component";
import { SellingComponent } from "../selling/selling.component";
import { MainServicesService } from '../../shared/services/main-services.service';
import { Extension } from '../../helper/common/extension/extension';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';
import { blob } from 'stream/consumers';
import { ReviewPageComponent } from '../review-page/review-page.component';
import { PaymentComponent } from '../payment/payment.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from '../notification/notification.component';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { CurrentLocationComponent } from '../current-location/current-location.component';

interface ImageSnippet {
  file: File | null;
  url: string | ArrayBuffer | null;
}
@Component({
  selector: 'app-profile-page',
  standalone: true,
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  imports: [
    CommonModule,
    HeaderComponent,
    NgFor,
    FooterComponent,
    SellingComponent,
    FormsModule,
    NgIf,
    RouterModule,
    NgFor,
    NotificationComponent,
    NgxDropzoneModule,
    ReviewPageComponent,
    PaymentComponent,
    StarRatingComponent,
    CurrentLocationComponent
  ]
})

export class ProfilePageComponent {
  showOTPBox: boolean = false;
  progress!: number;
  showMore: boolean = false;
  selectedTab: string = 'purchasesSales';
  selectedTabItem: string = '';
  selectedTabId: any;
  activeButton: number = 1;
  showDiv: boolean = false;
  currentUserProfile: any;
  rating: number = 0; // Current rating
  maxRating: number = 1; // Maximum rating, default is 5
  ratingChange: any;
  imageUrl: string | ArrayBuffer | null = null;
  currentUserId: number = 0
  user_Id: number = 0
  title: string = "";
  description: string = "";
  // productImage:any = [];
  userImage: any;
  profilePhoto: File | null = null;
  selectedCategoryId: any;
  selectedSubCategoryId: any;
  pricingCatId: string = "";
  brandId: string = "";
  conditionId: string = "";
  storageId: string = "";
  colorId: string = "";
  typeId: string = "";
  bedRoomId: string = "";
  areaSizeId: string = "";
  yearBuiltId: string = "";
  feartureId: string = "";
  amenitiesId: string = "";
  makeAndModelId: string = "";
  yearId: string = "";
  price: string = "";
  mileage: string = "";
  fuelTypeId: string = "";
  engineCapacityId: string = "";
  subCategoriesId: any;
  modelId: string = "";
  jobtypeId: string = "";
  experienceId: string = "";
  educationId: string = "";
  salaryId: string = "";
  salaryPeriodId: string = "";
  companyNameId: string = "";
  positionTypeId: string = "";
  careerLevelId: string = "";
  carId: string = "";
  ageId: string = "";
  breedId: string = "";
  fashionTypeId: string = "";
  fabricId: string = "";
  suitTypeId: string = "";
  toyId: string = "";
  startingTime: string = "";
  endingTime: string = "";
  startingDate: Date | null = null;
  endingDate: Date | null = null;
  productId: number = 0;
  locationId: string = "";
  jSonAttributes: any;
  startingPrice: string = "";
  lowestPrice: string = "";
  defaultsImage: string = "assets/images/best-selling.png"
  public imagesFiles: File[] = [];
  filesabc!: File[];
  imageFilesAbc: File[] = [];
  videoFilesAbc: File[] = []
  showNotification: boolean = false
  notificationList: any
  customLink: any;
  allowRating:boolean=false;
  isDisabled:boolean = false;
  isEditPost:boolean = false;

  showNotif() {
    this.showNotification = true
  }
  rawData: any = [
    { id: 1, name: 'One' },
    { id: 2, name: 'Two' },
    { id: 3, name: 'Three' },
  ]

  
  categories: any = [
    { id: 1, name: 'Mobiles' },
    { id: 3, name: 'Property for Sale' },
    { id: 5, name: 'Vehicles' },
    { id: 4, name: 'Property for Rent' },
    { id: 2, name: 'Electronic & Appliance' },
    { id: 6, name: 'Bike' },
    { id: 7, name: 'Job' },
    { id: 8, name: 'Services' },
    { id: 12, name: 'Animals' },
    { id: 9, name: 'Furniture and home decor' },
    { id: 10, name: 'Fashion (dress) and beauty' },
    { id: 11, name: 'Kids' },
    // {id:12, name:'Kids'}
  ]
  pricingCategories: any = [
    { id: 'FixedPrice', name: 'Fixed Price' },
    { id: 'Auction', name: 'Auction' },
    { id: 'SellToTTOffer', name: 'Sell To TTOffer' }
  ]
  brandList: any = [
    { id: 'Samsung', name: 'Samsung' },
    { id: 'Infinix', name: 'Infinix' },
    { id: 'Xiaomi', name: 'Xiaomi' },
    { id: 'Motorola', name: 'Motorola' },
    { id: 'Huawei', name: 'Huawei' },
    { id: 'Apple', name: 'Apple' },
    { id: 'Other', name: 'Other' }
  ]
  brandElectornicsList: any = [
    { id: 'Dawlence', name: 'Dawlence' },
    { id: 'Pel', name: 'Pel' },
    { id: 'LG', name: 'LG' },
    { id: 'Samsung', name: 'Samsung' },
    { id: 'Bosch', name: 'Bosch' },
    { id: 'Kenmore', name: 'Kenmore' },
    { id: 'Amana', name: 'Amana' }
  ]
  conditionList: any = [
    { id: 'New', name: 'New' },
    { id: 'Used', name: 'Used' },
    { id: 'Refurbished', name: 'Refurbished' },
    { id: 'Other', name: 'Other' },
  ]
  conditionKidsList: any = [
    { id: 'New', name: 'New' },
    { id: 'Used', name: 'Used' },
    { id: 'Open Box', name: 'Open Box' },
    { id: 'Other', name: 'Other' },
  ]
  storageList: any = [
    { id: '32GB', name: '32GB' },
    { id: '16GB', name: '16GB' },
    { id: '64GB', name: '64GB' },
    { id: '128GB', name: '128GB' },
    { id: '256GB', name: '256GB' },
    { id: '512GB', name: '512GB' },
    { id: '1 TB+', name: '1 TB+' },
  ]
  colorList: any = [
    { id: 'White', name: 'White' },
    { id: 'Black', name: 'Black' },
    { id: 'Red', name: 'Red' },
    { id: 'Other', name: 'Other' },
  ]
  typeList: any = [
    { id: 'Apartment', name: 'Apartment' },
  ]
  bedRoomList: any = [
    { id: '1', name: '1' },
    { id: '2', name: '2' },
    { id: '3', name: '3' },
    { id: '4', name: '4' },
    { id: '5', name: '5' },
    { id: '5', name: '6' },
    { id: '5', name: '7' },
    { id: '5', name: '8' },
    { id: '5', name: '9' },
    { id: '5', name: '10' },
    { id: '5', name: '11' },
    { id: '5', name: '12' },
    { id: '5', name: '13' },
    { id: '6+', name: '13+' },
    { id: 'Studio', name: 'Studio' },
  ]
  areaSizeList: any = [
    { id: '1,000 sqft', name: '1,000 sqft' },
  ]
  yearBuilt: any = [
    { id: '2020', name: '2020' },
  ]
  feartureBuilt: any = [
    { id: 'Servant Quarters', name: 'Servant Quarters' },
    { id: 'Drawing Room', name: 'Drawing Room' },
    { id: 'Dining Room', name: 'Dining Room' },
    { id: 'Kitchen', name: 'Kitchen' },
    { id: 'Study Room', name: 'Study Room' },
    { id: 'Prayer Room', name: 'Prayer Room' },
    { id: 'Powder Room', name: 'Powder Room' },
    { id: 'Gym', name: 'Gym' },
    { id: 'Store Room', name: 'Store Room' },
    { id: 'Steam Room', name: 'Steam Room' },
    { id: 'Guest Room', name: 'Guest Room' },
    { id: 'Laundry Room', name: 'Laundry Room' },
    { id: 'Home Theater', name: 'Home Theater' },
    { id: 'Office', name: 'Office' },
    { id: 'Library', name: 'Library' },
    { id: 'Wine Cellar', name: 'Wine Cellar' },
    { id: 'Basement', name: 'Basement' },
    { id: 'Attic', name: 'Attic' },
    { id: 'Balcony', name: 'Balcony' },
    { id: 'Terrace', name: 'Terrace' },
    { id: 'Garden', name: 'Garden' },
    { id: 'Swimming Pool', name: 'Swimming Pool' },
    { id: 'Garage', name: 'Garage' },
  ]
  amenitiesList: any = [
    { id: 'Apartment', name: 'Apartment' },
  ]
  makeAndModelList: any = [
    { id: 'Audi', name: 'Audi' },
    { id: 'BMW', name: 'BMW' },
    { id: 'Corolla', name: 'Corolla' },
  ]
  yearList: any = [
    { id: '2021', name: '2021' },
    { id: '2000', name: '2000' },
    { id: '2001', name: '2001' },
  ]
  fuelTypeList: any = [
    { id: 'Diesel', name: 'Diesel' },
    { id: 'Petrol', name: 'Petrol' },
    { id: 'Gas', name: 'Gas' },
    { id: 'Other', name: 'Other' },
  ]
  subCatMobile:any=[
    { id:0, category_id: 1, name: "Mobile Phones" },
    { id:1, category_id: 1, name: "Accessories" },
    { id:2, category_id: 1, name: "Smart Watches" },
    { id:3, category_id: 1, name: "Tablets" },
  ]
  subCatPropertyForSales:any=[
    { id: 5, category_id: 3, name: "Lands & Plots" },
    { id: 6, category_id: 3, name: "Houses" },
    { id: 7, category_id: 3, name: "Apartments & Flats" },
    { id: 8, category_id: 3, name: "Shops - Offices - Commercial Space" },
    { id: 9, category_id: 3, name: "Portions & Floors" },
    { id: 10, category_id: 3, name: "Others" },
  ]
  subCatVehicles:any=[
    { id: 11, category_id: 5, name: "Cars" },
    { id: 12, category_id: 5, name: "Cars Accessories" },
    { id: 13, category_id: 5, name: "Spare Parts" },
    { id: 14, category_id: 5, name: "Buses, Vans & Trucks" },
    // { id: 15, category_id: 5, name: "Rickshaw & Chingchi" },
    { id: 16, category_id: 5, name: "Tractors & Trailers" },
    { id: 17, category_id: 5, name: "Cars on Installments" },
    { id: 18, category_id: 5, name: "Other Vehicles" },
    { id: 19, category_id: 5, name: "Boats" },
  ]
  subCatPropertyRent:any=[
    { id:20, category_id: 4, name: "Portions & Floors" },
    { id:21, category_id: 4, name: "Houses" },
    { id:22, category_id: 4, name: "Apartments & Flats" },
    { id:23, category_id: 4, name: "Shops - Offices - Commercial Space " },
    { id:24, category_id: 4, name: "Rooms" },
    { id:25, category_id: 4, name: "Vacation Rentals - Guest Houses" },
    { id:26, category_id: 4, name: "Roommates & Paying Guests" },
  ]
  subCatElectronics:any=[
    { id:28, category_id: 2, name: "Computer & Accessories" },
    { id:29, category_id: 2, name: "Television & Accessories" },
    { id:30, category_id: 2, name: "AC & Coolers" },
    { id:31, category_id: 2, name: "Generators, UPS & Power Solutions" },
    { id:32, category_id: 2, name: "Refrigerators & Freezers" },
    { id:33, category_id: 2, name: "Air Purifiers & Humidifiers" },
    { id:34, category_id: 2, name: "Cameras & Accessories" },
    { id:35, category_id: 2, name: "Games & Entertainment" },
    { id:36, category_id: 2, name: "Kitchen Appliances" },
    { id:37, category_id: 2, name: "Fans" },
    { id:38, category_id: 2, name: "Video-Audios" },
    { id:39, category_id: 2, name: "Washing Machines & Dryers" },
    { id:40, category_id: 2, name: "Microwaves & Ovens" },
    { id:41, category_id: 2, name: "Sewing Machines" },
    { id:42, category_id: 2, name: "Water Dispensers" },
    { id:43, category_id: 2, name: "Heater & Geysers" },
    { id:44, category_id: 2, name: "Irons & Steamers" },
    { id:45, category_id: 2, name: "Other Home Appliances" },
  ]

  subCatBike:any=[
    { id:46, category_id: 6, name: "Motorcycles" },
    { id:47, category_id: 6, name: "Bicycles" },
    { id:48, category_id: 6, name: "Spare Parts" },
    { id:49, category_id: 6, name: "Bikes Accessories" },
    { id:50, category_id: 6, name: "Scooters" },
    { id:51, category_id: 6, name: "ATV & Quads" },
    { id:52, category_id: 6, name: "Other Bikes" },
  ]
  subCatJob:any=[
    { id:53, category_id: 7, name: "Online" },
    { id:54, category_id: 7, name: "Architecture & Interior Design" },
    { id:55, category_id: 7, name: "Education" },
    { id:56, category_id: 7, name: "Content Writing" },
    { id:57, category_id: 7, name: "Part time" },
    { id:58, category_id: 7, name: "Sales" },
    { id:59, category_id: 7, name: "Marketing" },
    { id:60, category_id: 7, name: "Customer Service" },
    { id:61, category_id: 7, name: "Restaurants & Hospitality" },
    { id:62, category_id: 7, name: "Domestic Staff" },
    { id:63, category_id: 7, name: "Medical" },
    { id:64, category_id: 7, name: "Graphic Design" },
    { id:65, category_id: 7, name: "Accounting & Finance" },
    { id:66, category_id: 7, name: "IT & Networking" },
    { id:67, category_id: 7, name: "Delivery Riders" },
    { id:68, category_id: 7, name: "Hotel & Tourism" },
    { id:69, category_id: 7, name: "Engineering" },
    { id:70, category_id: 7, name: "Security" },
    { id:71, category_id: 7, name: "Manufacturing" },
    { id:72, category_id: 7, name: "Clerical & Administration" },
    { id:73, category_id: 7, name: "Human Resources" },
    { id:74, category_id: 7, name: "Real Estate" },
    { id:75, category_id: 7, name: "Advertising & PR" },
    { id:76, category_id: 7, name: "Internships" },
    { id:77, category_id: 7, name: "Other Jobs" },
  ]
  subCatServices:any=[
    { id:78, category_id: 8, name: "Insurance Services" },
    { id:79, category_id: 8, name: "Tuitions & Academies" },
    { id:80, category_id: 8, name: "Home & Office Repair" },
    { id:81, category_id: 8, name: "Car Rental" },
    { id:82, category_id: 8, name: "Domestic Help" },
    { id:83, category_id: 8, name: "Web Development" },
    { id:84, category_id: 8, name: "Travel & Visa" },
    { id:85, category_id: 8, name: "Electronics & Computer Repair" },
    { id:86, category_id: 8, name: "Movers & Packers" },
    { id:87, category_id: 8, name: "Drivers & Taxi" },
    { id:88, category_id: 8, name: "Health & Beauty" },
    { id:89, category_id: 8, name: "Event Services" },
    { id:90, category_id: 8, name: "Construction Services" },
    { id:91, category_id: 8, name: "Farm & Fresh Food" },
    { id:92, category_id: 8, name: "Consultancy Services" },
    { id:93, category_id: 8, name: "Architecture & Interior Design" },
    { id:94, category_id: 8, name: "Video & Photography" },
    { id:95, category_id: 8, name: "Renting Services" },
    { id:96, category_id: 8, name: "Catering & Restaurant" },
    { id:97, category_id: 8, name: "Car Services" },
    { id:98, category_id: 8, name: "Tailor Services" },
    { id:99, category_id: 8, name: "Other Services" },
  ]
  subCatAnimal:any=[
    { id:100, category_id: 12, name: "Hens" },
    { id:101, category_id: 12, name: "Parrots" },
    { id:102, category_id: 12, name: "Livestock" },
    { id:103, category_id: 12, name: "Cats" },
    { id:104, category_id: 12, name: "Dogs" },
    { id:105, category_id: 12, name: "Pet Food & Accessories" },
    { id:106, category_id: 12, name: "Pigeons" },
    { id:107, category_id: 12, name: "Rabbits" },
    { id:108, category_id: 12, name: "Fish" },
    { id:109, category_id: 12, name: "Other Birds" },
    { id:110, category_id: 12, name: "Doves" },
    { id:111, category_id: 12, name: "Fertile Eggs" },
    { id:112, category_id: 12, name: "Ducks" },
    { id:113, category_id: 12, name: "Peacocks" },
    { id:114, category_id: 12, name: "Horses" },
    { id:115, category_id: 12, name: "Other Animal" },
  ]
  subCatFurniture:any=[
    { id:116, category_id: 9, name: "Sofa & Chairs" },
    { id:117, category_id: 9, name: "Beds & Wardrobes" },
    { id:118, category_id: 9, name: "Bathroom & Accessories" },
    { id:119, category_id: 9, name: "Tables & Dining" },
    { id:120, category_id: 9, name: "Home Decoration" },
    { id:121, category_id: 9, name: "Office Furniture" },
    { id:122, category_id: 9, name: "Garden & Outdoor" },
    { id:123, category_id: 9, name: "Painting & Mirrors" },
    { id:124, category_id: 9, name: "Curtain & Blinds" },
    { id:125, category_id: 9, name: "Rugs & Carpets" },
    { id:126, category_id: 9, name: "Other" },
  ]
  subCatFashion: any = [
    { id:127, category_id: 10, name: "Clothes" },
    { id:128, category_id: 10, name: "Watches" },
    { id:129, category_id: 10, name: "Wedding" },
    { id:130, category_id: 10, name: "Footwear" },
    { id:131, category_id: 10, name: "Skin & Hair" },
    { id:132, category_id: 10, name: "Jewellery" },
    { id:133, category_id: 10, name: "Bags" },
    { id:134, category_id: 10, name: "Makeup" },
    { id:135, category_id: 10, name: "Fragrance" },
    { id:136, category_id: 10, name: "Fashion Accessories" },
    { id:137, category_id: 10, name: "Other Fashion" },
  ]

  subCatKid: any = [
    { id:138, category_id: 11, name: "Toys" },
    { id:139, category_id: 11, name: "Kids Vehicles" },
    { id:140, category_id: 11, name: "Baby Gear" },
    { id:141, category_id: 11, name: "Kids Furniture" },
    { id:142, category_id: 11, name: "Swings & Slides" },
    { id:143, category_id: 11, name: "Kids Accessories" },
    { id:144, category_id: 11, name: "Kids Clothings" },
    { id:145, category_id: 11, name: "Bath & Diapers" },
    { id:146, category_id: 11, name: "Others" },
  ]

  subCategoriesList: any = [
    { id: 11, name: "Clothes" },
    { id: 11, name: "Watches" },
    { id: 11, name: "Wedding" },
    { id: 11, name: "Footwear" },
    { id: 11, name: "Skin & Hair" },
    { id: 11, name: "Jewellery" },
    { id: 11, name: "Bags" },
    { id: 11, name: "Makeup" },
    { id: 11, name: "Fragrance" },
    { id: 11, name: "Fashion Accessories" },
    { id: 11, name: "Other Fashion" },
  ]
  engineCapacityList: any = [
    { id: '50cc', name: '50cc' },
    { id: '60cc', name: '60cc' },
    { id: '150cc', name: '150cc' },
    { id: '250cc', name: '250cc' },
    { id: '500cc', name: '500cc' },
    { id: '1000cc', name: '1000cc' },
    { id: 'Others', name: 'Others' },
  ]
  modelList: any = [
    { id: 'Yamaha R1', name: 'Yamaha R1' },
  ]
  jobtypeList: any = [
    { id: 'Graphic Design', name: 'Graphic Design' },
    { id: 'Software Engineer', name: 'Software Engineer' },
    { id: 'Electric Engineer', name: 'Electric Engineer' },
    { id: 'Mechanic', name: 'Mechanic' },
    { id: 'Painter', name: 'Painter' },
    { id: 'Others', name: 'Others' },
  ]
  experiencelist: any = [
    { id: 'Freshie', name: 'Freshie' },
    { id: 'Intermediate', name: 'Intermediate' },
    { id: 'Others', name: 'Others' },
  ]
  educationlist: any = [
    { id: 'Intermediate', name: 'Intermediate' },
    { id: 'High School', name: 'High School' },
    { id: 'Bachelor\'\s Degree', name: 'Bachelor\'\s Degree' },
    { id: 'Master\'\s Degree', name: 'Master\'\s Degree' },
    { id: 'PhD', name: 'PhD' },
    { id: 'Others', name: 'Others' },
  ]
  salaryList: any = [
    { id: '$30,000', name: '$30,000' },
    { id: '$50,000', name: '$50,000' },
    { id: '$60,000', name: '$60,000' },
    { id: 'Others', name: 'Others' },
  ]
  salaryPeriodList: any = [
    { id: 'Monthly', name: 'Monthly' },
    { id: 'Daily', name: 'Daily' },
    { id: 'Weekly', name: 'Weekly' },
    { id: 'Others', name: 'Others' },
  ]
  comanNameList: any = [
    { id: 'DevSinc', name: 'DevSinc' },
    { id: 'System Limited', name: 'System Limited' },
    { id: 'Neon System', name: 'Neon System' },
    { id: 'Others', name: 'Others' },
  ]
  positioinTypeList: any = [
    { id: 'Full Time', name: 'Full Time' },
    { id: 'Half Time', name: 'Half Time' },
    { id: 'Others', name: 'Others' },
  ]
  careerLevelList: any = [
    { id: 'Mid - Senior Level', name: 'Mid - Senior Level' },
    { id: 'Full - Senior Level', name: 'Full - Senior Level' },
    { id: 'Others', name: 'Others' },
  ]
  carList: any = [
    { id: 'Corolla', name: 'Corolla' },
  ]
  ageList: any = [
    { id: '1 year', name: '1 year' },
    { id: '2 year', name: '2 year' },
    { id: '3 year', name: '3 year' },
    { id: '4 year', name: '4 year' },
    { id: '5 year', name: '5 year' },
    { id: 'Others', name: 'Others' },
  ]
  breedList: any = [
    { id: 'Husky', name: 'Husky' },
    { id: 'Bully', name: 'Bully' },
    { id: 'Pointer', name: 'Pointer' },
    { id: 'Others', name: 'Others' },
  ]
  fashionTypeList: any = [
    { id: '1 seater', name: '1 seater' },
    { id: '2 seater', name: '2 seater' },
    { id: '3 seater', name: '3 seater' },
    { id: '4 seater', name: '4 seater' },
    { id: 'Others', name: 'Others' },
  ]
  fabricList: any = [
    { id: 'Cotton', name: 'Cotton' },
  ]
  suitTypeList: any = [
    { id: 'Tuxedo', name: 'Tuxedo' },
  ]
  toyList: any = [
    { id: 'Doll', name: 'Doll' },
  ]
  locationList: any = [
    { id: 'America', name: 'America' },
  ]
  compStatusId: any
  CombitanStatusList: any = [
    { id: 'Off plan', name: 'Off plan' },
    { id: 'Ready', name: 'Ready' },
    { id: 'Other', name: 'Other' },
  ]
  furnisheableId: any;
  FurnishableList: any = [
    { id: 'All', name: 'All' },
    { id: 'Furnished', name: 'Furnished' },
    { id: 'Unfurnished', name: 'Unfurnished' },
  ]
  bathRoomId: any
  BathRoomList: any = [
    { id: '1', name: '1' },
    { id: '2', name: '2' },
    { id: '3', name: '3' },
  ]
  // selectedFile: File | null = null;
  selectedFile: File[] = []
  loading = false;
  categoryLookup: { [key: string]: any };

  constructor(
    private mainServices: MainServicesService,
    private extension: Extension,
    private route: ActivatedRoute,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router:Router
  ) {
    this.currentUserId = this.extension.getUserId();
    this.categoryLookup = {
      "1": this.subCatMobile,
      "2": this.subCatElectronics,
      "3": this.subCatPropertyForSales,
      "4": this.subCatPropertyRent,
      "5": this.subCatVehicles,
      "6": this.subCatBike,
      "7": this.subCatJob,
      "8": this.subCatServices,
      "9": this.subCatFurniture,
      "10": this.subCatFashion,
      "11": this.subCatKid,
      "12": this.subCatAnimal,
    };
  }
  ngOnInit() {
    this.getNotification();
    this.startingDate = new Date();
    this.endingDate = new Date();
    this.customLink = window.location.href;
    this.selectedTabItem = this.route.snapshot.paramMap.get('name')!;
    this.selectedTabId = this.route.snapshot.paramMap.get('id')!;
    if (this.selectedTabItem != null) {
      this.selectTab(this.selectedTabItem)
    }
    else {
      this.selectTab("purchasesSales")
    }
    this.getSelling();
    this.getCurrentUser();
    this.wishListProduct();
  }
  showOtp(){
    this.showOTPBox =  true
  }
  showSuccessMessage(message: string) {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }
  showErrorMessage(message: string) {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
}
  openPage() {
    this.showDiv = true;
  }
  onSelectImage(event: any) {

    console.log(event);
    this.imagesFiles.push(...event.addedFiles);
  }
    copyCustomLink() {
      navigator.clipboard.writeText(this.customLink).then(() => {
        this.showSuccessMessage(`Profile link ${this.customLink} copied to clipboard!`);
      }).catch(err => {
        console.error('Could not copy text: ', err);
      });
    }

  // handleInputChange() {
  //   console.log('Starting Time:', this.startingTime);
  //   console.log('Ending Time:', this.endingTime);
  //   console.log('Starting Date:', this.startingDate);
  //   console.log('Ending Date:', this.endingDate);
  // }

  selectTab(tab: string) {
    this.selectedTab = tab;
    this.showDiv = false;
    this.showMore = false
  }

  toggleActive(buttonIndex: number) {
    this.activeButton = buttonIndex;
  }

  sellingList: any = []
  sellingListTemp: any = []
  purchaseListTemp: any = []
  purchaseSale: any[] = [
    // { img: 'assets/images/light-clothes-img.svg', heading: 'Modern light clothes', elipsImg1: 'assets/images/Ellipse1.svg', elipsImg2: 'assets/images/Ellipse2.svg', elipsImg3: 'assets/images/Ellipse3.svg', elipsImg4: 'assets/images/Ellipse4.svg', subHeading1: 'Sale Faster', subHeading2: 'Mark As Sold' },
    // { img: 'assets/images/light-img2.svg', heading: 'Modern light clothes', elipsImg1: 'assets/images/Ellipse1.svg', elipsImg2: 'assets/images/Ellipse2.svg', elipsImg3: 'assets/images/Ellipse3.svg', elipsImg4: 'assets/images/Ellipse4.svg', subHeading1: 'Sale Faster', subHeading2: 'Mark As Sold' },
    // { img: 'assets/images/light-img3.svg', heading: 'Modern light clothes', elipsImg1: 'assets/images/Ellipse1.svg', elipsImg2: 'assets/images/Ellipse2.svg', elipsImg3: 'assets/images/Ellipse3.svg', elipsImg4: 'assets/images/Ellipse4.svg', subHeading1: 'Sale Faster', subHeading2: 'Mark As Sold' },
    // { img: 'assets/images/light-clothes-img.svg', heading: 'Modern light clothes', elipsImg1: 'assets/images/Ellipse1.svg', elipsImg2: 'assets/images/Ellipse2.svg', elipsImg3: 'assets/images/Ellipse3.svg', elipsImg4: 'assets/images/Ellipse4.svg', subHeading1: 'Sale Faster', subHeading2: 'Mark As Sold' },
    // { img: 'assets/images/light-img2.svg', heading: 'Modern light clothes', elipsImg1: 'assets/images/Ellipse1.svg', elipsImg2: 'assets/images/Ellipse2.svg', elipsImg3: 'assets/images/Ellipse3.svg', elipsImg4: 'assets/images/Ellipse4.svg', subHeading1: 'Sale Faster', subHeading2: 'Mark As Sold' },
    // { img: 'assets/images/light-img3.svg', heading: 'Modern light clothes', elipsImg1: 'assets/images/Ellipse1.svg', elipsImg2: 'assets/images/Ellipse2.svg', elipsImg3: 'assets/images/Ellipse3.svg', elipsImg4: 'assets/images/Ellipse4.svg', subHeading1: 'Sale Faster', subHeading2: 'Mark As Sold' },
  ]

  savedItems: any
  // = [
  //   // {img: 'assets/images/product2.svg', heading:'Modern light clothes', location:'Dhaka Bangladesh', time:'34m Ago', },
  //   // {img: 'assets/images/product2.svg', heading:'Modern light clothes', location:'Dhaka Bangladesh', time:'34m Ago', },
  //   // {img: 'assets/images/product2.svg', heading:'Modern light clothes', location:'Dhaka Bangladesh', time:'34m Ago', },
  //   // {img: 'assets/images/product2.svg', heading:'Modern light clothes', location:'Dhaka Bangladesh', time:'34m Ago', },
  //   // {img: 'assets/images/product2.svg', heading:'Modern light clothes', location:'Dhaka Bangladesh', time:'34m Ago', },
  // ]

  paymentDeposit: any[] = [
    { img: 'assets/images/Applelogo.svg', detail1: 'Apply Pay', detail2: 'Default', id: 'flexRadioDefault1' },
    { img: 'assets/images/visalogo.svg', detail1: 'Visa', date: 'Expiry 06/2024', detail2: 'Set as default', btn: 'Edit', id: 'flexRadioDefault2' },
    { img: 'assets/images/StripLogo.svg', detail1: 'Mastercard', date: 'Expiry 06/2024', detail2: 'Set as default', btn: 'Edit', id: 'flexRadioDefault2' },
    { img: 'assets/images/GPay.svg', detail1: 'Google Pay', date: 'Expiry 06/2024', detail2: 'Set as default', btn: 'Edit', id: 'flexRadioDefault2' },

  ]

  selectedFiles: Array<{ src: string }> = [];
  selectedImagesList: File[] = [];
  selectedImageIndex: number = -1;
  selectedVideoIndex: number = -1;

  // onFilesSelected(event: any): void {

  //   const files = event.target.files;
  //   this.selectedImagesList.push(files[0])
  //   for (let file of files) {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       this.selectedFiles.push({ src: e.target.result });
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  // onFileSelected(event: Event) {
  //
  //   const input = event.target as HTMLInputElement;
  //   if (input.files) {
  //     this.filesabc = Array.from(input.files);
  //   } else {
  //     this.filesabc = [];
  //   }
  // }
  onFileChange(event: any) {

    if (event.target.files && event.target.files.length > 0) {

      for (let i = 0; i < event.target.files.length; i++) {

        this.imageFilesAbc.push(event.target.files[i]);
        this.readFileAsDataURL(event.target.files[i]);
      }
    }
  }
  readFileAsDataURL(file: File) {

    const reader = new FileReader();
    reader.onload = () => {
      this.selectedFiles.push({ src: reader.result as string });
    };
    reader.readAsDataURL(file);
  }
  // onFilesSelected(event: any): void {
  //
  //   const files = event.target.files;
  //   for (let file of files) {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       this.selectedFiles.push({ url: e.target.result });
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  selectImage(index: number): void {
    this.selectedImageIndex = index;
  }

  openMore() {
    this.showMore = !this.showMore
  }


  deleteSelectedImage(): void {
    if (this.selectedImageIndex > -1 && this.selectedImageIndex < this.selectedFiles.length) {
      this.selectedFiles.splice(this.selectedImageIndex, 1);
      this.selectedImageIndex = -1;
    }
  }
  deleteProductImage(file: any) {

    let input = {
      id: file.id,
      product_id: file.product_id
    }
    this.mainServices.deleteProductImage(input).subscribe(res => {

      res
      console.log(res)
    })
  }
  updateProductImage() {

    this.loading = true
    let formData = new FormData();
    this.imageFilesAbc.forEach((file, index) => {
      formData.append(`src[]`, file, file.name);
    });
    formData.append('product_id', ((this.productId) ? Number(this.productId) : 0).toString());
    this.http.post('https://www.ttoffer.com/backend/public/api/upload-image', formData, { headers: this.getHeaders() }).subscribe(res => {

      this.loading = false
      res
      console.log(res)
    })
  }



  confirmSelection(): void {

    if (this.selectedImageIndex > -1 && this.selectedImageIndex < this.selectedFiles.length) {
      console.log('Image selected:', this.selectedFiles[this.selectedImageIndex]);
    }
  }



  selectedVideos: Array<{ url: string }> = [];

  onVideosSelected(event: any): void {
    const files = event.target.files;
    for (let file of files) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedVideos.push({ url: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  }

  selectVideo(index: number): void {
    this.selectedVideoIndex = index;
  }

  deleteSelectedVideo(): void {
    if (this.selectedVideoIndex > -1 && this.selectedVideoIndex < this.selectedVideos.length) {
      this.selectedVideos.splice(this.selectedVideoIndex, 1);
      this.selectedVideoIndex = -1; // Reset selection
    }
  }

  confirmVideoSelection(): void {
    if (this.selectedVideoIndex > -1 && this.selectedVideoIndex < this.selectedVideos.length) {
      // Perform any action needed on selection
      console.log('Video selected:', this.selectedVideos[this.selectedVideoIndex]);
    }
  }

  openModal() {
    const modal = document.getElementById('editModal');
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
    const modal = document.getElementById('editModal');
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

  openNewCardModal() {
    const modal = document.getElementById('newCardModal');
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

  closeNewCardModal() {
    const modal = document.getElementById('newCardModal');
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

  openUserNameModal() {
    const modal = document.getElementById('userNameModal');
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

  closeUserNameModal() {
    const modal = document.getElementById('userNameModal');
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

  openNumberModal() {
    const modal = document.getElementById('numberModal');
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

  closeNumberModal() {
    const modal = document.getElementById('numberModal');
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

  openEmailModal() {
    const modal = document.getElementById('emailModal');
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
  openVerifyEmailModal() {
    const modal = document.getElementById('verifyEmailModal');
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

  closeVerifyEmailModal() {
    const modal = document.getElementById('verifyEmailModal');
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

  openVerifyPhoneModal() {
    const modal = document.getElementById('verifyPhoneModal');
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

  closeVerifyPhoneModal() {
    const modal = document.getElementById('verifyPhoneModal');
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

  closeEmailModal() {
    const modal = document.getElementById('emailModal');
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
  openPasswordModal() {
    const modal = document.getElementById('passwordModal');
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

  closePasswordModal() {
    const modal = document.getElementById('passwordModal');
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

  openLocationModal() {
    const modal = document.getElementById('locationModal');
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

  closeLocationModal() {
    const modal = document.getElementById('locationModal');
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

  openBoostModal() {
    const modal = document.getElementById('boostPlusModal');
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

  closeBoostModal() {
    const modal = document.getElementById('boostPlusModal');
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

  openBoostPlanModal() {
    const modal = document.getElementById('boostModal');
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

  closeBoostPlanModal() {
    const modal = document.getElementById('boostModal');
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
  onImageUpload(event: any): void {
    if (event.target.files && event.target.files.length > 0) {

      for (let i = 0; i < event.target.files.length; i++) {

        this.selectedFile.push(event.target.files[i]);
        this.readFileAsDataURL(event.target.files[i]);
      }
    }
    // this.selectedFile = event.target.files[0] ?? null;
    // const input = event.target as HTMLInputElement;
    // let files = input.files;

    // if (files && files[0]) {
    //   let file = files[0];
    //   this.selectedFile = file;
    this.updateProfile();
    // }
  }

  updateProfile(): void {

    if (this.selectedFile) {
      let formData = new FormData();
      // this.filesabc.forEach(file => formData.append('video', file, file.name));
      this.selectedFile.forEach((file, index) => {
        formData.append(`img`, file, file.name);
      });
      formData.append('user_id', ((this.currentUserId) ? Number(this.currentUserId) : 0).toString());

      this.http.post('https://www.ttoffer.com/backend/public/api/update/user', formData, { headers: this.getHeaders() }).subscribe(
        (response: any) => {

          this.UpdateLocalUserData(response.data)
          this.showSuccessMessage(response.message)
          console.log('File upload successful', response);
          // this.updateProductImage()
          // this.atributes()
          // this.addProductSeccondStep();
        },
        error => {
          console.error('File upload failed', error);
        }
      );
      // let data = {
      //   user_id: 11,
      //   img: this.selectedFile
      // };

      // this.mainServices.updateUserImage(data).subscribe(
      //   res => {

      //     console.log('Response:', res); // For debugging
      //   },
      //   err => {
      //     console.error('Upload failed:', err);
      //   }
      // );
    }
  }
  UpdateLocalUserData(data: any) {
    const jsonString = JSON.stringify(data);
    localStorage.setItem("key", jsonString);
    this.getCurrentUser();
  }
  // onImageUpload(event: any): void {
  //
  //   const input = event.target as HTMLInputElement;
  //   let files = input.files;

  //   if (files && files[0]) {
  //     let file = files[0];
  //     this.userImage = file;
  //     this.profilePhoto = file;
  //     this.updateProfile()
  //   }
  // }

  // updateProfile() {
  //
  //   let data = {
  //     user_id:11,
  //     // src: "",
  //     img:this.userImage,
  //   }
  //   this.mainServices.updateUserImage(data).subscribe(res => {
  //
  //     console.log('Response:', res); // For debugging
  //   });
  // }

  triggerFileInput(): void {
    const fileInput = document.getElementById('image-upload') as HTMLInputElement;
    fileInput.click();
  }
  // AddProductFirstStep() {

  //   let input = {
  //     user_id: this.currentUserId,
  //     title: this.title,
  //     description: this.description,
  //     photo: this.selectedFiles,
  //     video: this.selectedFiles,
  //   }
  //   this.mainServices.addProductFirstStep(input).subscribe((res: any) => {

  //     res
  //     this.productId = res.product_id
  //     this.atributes()
  //     this.addProductSeccondStep();
  //     console.log(res);
  //   })
  // }
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
  AddProductFirstStep() {

    this.loading = true
    let formData = new FormData();
    // this.filesabc.forEach(file => formData.append('video', file, file.name));
    this.videoFilesAbc.forEach((file, index) => {
      formData.append(`video[]`, file, file.name);
    });
    formData.append('user_id', ((this.currentUserId) ? Number(this.currentUserId) : 0).toString());
    formData.append('title', this.title);
    formData.append('description', this.description);

    this.http.post('https://www.ttoffer.com/backend/public/api/add-product-first-step', formData, { headers: this.getHeaders() }).subscribe(
      (response: any) => {

        console.log('File upload successful', response);
        this.productId = response.product_id
        this.updateProductImage()
        this.attributes()
        this.addProductSeccondStep();
        this.loading = false
      },
      error => {
        console.error('File upload failed', error);
      }
    );
  }
  EditProductFirstStep() {

    let formData = new FormData();
    // this.filesabc.forEach(file => formData.append('video', file, file.name));
    // this.imageFilesAbc.forEach((file, index) => {
    //   formData.append(`video[]`, file, file.name);
    // });
    formData.append('user_id', ((this.currentUserId) ? Number(this.currentUserId) : 0).toString());
    formData.append('title', this.title);
    formData.append('description', this.description);
    formData.append('product_id', ((this.productId) ? Number(this.productId) : 0).toString());

    this.http.post('https://www.ttoffer.com/backend/public/api/edit-product-first-step', formData, { headers: this.getHeaders() }).subscribe(
      (response: any) => {

        // console.log('File upload successful', response);
        this.productId = response.product_id
        this.attributes()
        this.EditProductSeccondStep();
      },
      error => {
        console.error('File upload failed', error);
      }
    );
  }


  addProductSeccondStep() {

    this.loading = true
    let input = {
      product_id: this.productId,
      category_id: this.selectedCategoryId,
      sub_category_id:this.selectedSubCategoryId,
      condition: this.conditionId,
      make_and_model: this.makeAndModelId,
      mileage: this.mileage,
      color: this.colorId,
      brand: this.brandId,
      model: this.modelId,
      edition: "",
      authenticity: "",
      attributes: this.jSonAttributes,
    }
    this.mainServices.addProductSecondStep(input).subscribe(res => {

      res
      this.loading = false
      this.addProductThirdStep()
      console.log(res);
    })
  }
  EditProductSeccondStep() {

    this.loading = true
    let input = {
      user_id: this.currentUserId,
      product_id: this.productId,
      category_id: this.selectedCategoryId,
      sub_category_id:this.selectedSubCategoryId,
      condition: this.conditionId,
      make_and_model: this.makeAndModelId,
      mileage: this.mileage,
      color: this.colorId,
      brand: this.brandId,
      model: this.modelId,
      edition: "",
      authenticity: "",
      attributes: this.jSonAttributes,
    }
    this.mainServices.editProductSecondStep(input).subscribe(res => {

      res
      this.EditProductThirdStep()
      console.log(res);
      this.loading = false
    })
  }
  addProductThirdStep() {

    this.loading = true
    let input
    if (this.pricingCatId == "Auction") {
      input = {
        product_id: this.productId,
        auction_price: this.startingPrice,
        starting_date: this.startingDate,
        // starting_time: '12:16',
        starting_time: this.startingTime,
        ending_date: this.endingDate,
        // ending_time: '12:16',
        ending_time: this.endingTime,
        // fix_price: null,

      }
    }
    else if (this.pricingCatId == "FixedPrice") {

      input = {
        product_id: this.productId,
        fix_price: this.price,
        // auction_price: null,
      }
    }
    else {

      input = {
        product_id: this.productId,
        // fix_price: this.price,
      }
    }
    this.mainServices.addProductThirdStep(input).subscribe((res: any) => {

      res
      // this.showSuccessMessage(res.message)
      this.addProductLastStep();
      console.log(res);
      this.loading = false
    })
  }
  EditProductThirdStep() {

    this.loading = true
    let input
    if (this.pricingCatId == "Auction") {
      input = {
        product_id: this.productId,
        auction_price: this.startingPrice.toString(),
        starting_date: this.startingDate ? new Date(this.startingDate).toISOString() : null,
        // starting_time: '12:16',
        starting_time: this.startingTime.toString(),
        ending_date: this.endingDate ? new Date(this.endingDate).toISOString() : null,
        // ending_time: '12:16',
        ending_time: this.endingTime,
        fix_price: null,
      }
    }
    else if (this.pricingCatId == "FixedPrice") {
      input = {
        product_id: this.productId,
        fix_price: this.price,
        auction_price: null,
      }
    }
    else {
      input = {
        product_id: this.productId,
        // fix_price: this.price,
      }
    }
    this.mainServices.editProductThirdStep(input).subscribe(res => {
      res

      this.editProductLastStep();
      console.log(res);
      this.loading = false
    })
  }
  addProductLastStep() {
    this.loading = true
    let input = {
      product_id: this.productId,
      location: this.locationId,
    }
    this.mainServices.addProductLastStep(input).subscribe((res: any) => {

      res
      this.showSuccessMessage(res.msg)
      console.log(res);
      this.loading = false
      this.router.navigate([''])
    })
  }

  editProductLastStep() {

    this.loading = true
    let input = {
      product_id: this.productId,
      location: this.locationId,
    }
    this.mainServices.editProductLastStep(input).subscribe((res: any) => {
      res

      this.showSuccessMessage(res.msg)
      console.log(res);
      this.loading = false
      this.router.navigate([''])
    })
  }
  getSelling() {

    this.loading = true
    this.mainServices.getSelling().subscribe((res: any) => {

      this.sellingList = res
      this.purchaseListTemp = res.data.purchase
      // this.purchaseListTemp = this.purchaseListTemp.filter((item: any) => {
      //   return this.selectedTabItem == null
      //     ? item.user_id == this.selectedTabId
      //     : item.id == this.selectedTabId;        });
      this.sellingListTemp = res.data.selling
      if (this.selectedTab != "") {
        this.sellingListTemp = this.sellingListTemp.filter((item: any) => {
          // return item.id == this.selectedTabId;
          return this.selectedTabItem == null
          ? item.user_id == this.selectedTabId
          : item.id == this.selectedTabId;        });
        // this.readFileAsDataURL(this.sellingListTemp[0].video[0].src)
        console.log('this is temp file:', this.sellingListTemp)
        // this.convertLinksToBase64(this.sellingListTemp[0].video)

        if(this.selectedTabItem == 'editPost'){
          this.isEditPost = true
          this.locationId = this.sellingListTemp[0].location
          this.productId = this.sellingListTemp[0].id
          this.title = this.sellingListTemp[0].title
          this.description = this.sellingListTemp[0].description
        }else{
          this.locationId = this.currentUserProfile.location
        }

        const parsedAttributes = JSON.parse(this.sellingListTemp[0].attributes);
        const parsedAttributesAttributes = JSON.parse(parsedAttributes.attributes);
        // const parsedAttributes = JSON.parse(attributesObject.attributes);
        this.loading = false
        // const parsedAttributes = JSON.parse(this.sellingListTemp[0].attributes);

        // Extract the category_id
        // this.categories.id = attributesObject.category_id;


        this.brandId = parsedAttributes.brand;
        this.selectedCategoryId = parsedAttributesAttributes.category_id
        this.selectedSubCategoryId = parsedAttributesAttributes.sub_category_id
        this.subCategoriesId = this.getSubCategoryName(this.selectedCategoryId, this.selectedSubCategoryId);
        console.log('Extracted category_id:', this.categories.id);
        // this.brandId = parsedAttributes.brand
        this.conditionId = parsedAttributes.condition
        this.makeAndModelId = parsedAttributes.makeAndModel
        this.mileage = parsedAttributes.milage
        // this.pricingCatId = parsedAttributes.milage
        // this.price = parsedAttributes.price
        this.storageId = parsedAttributes.storage
        this.colorId = parsedAttributesAttributes.color
        this.typeId = parsedAttributes.type
        this.bedRoomId = parsedAttributes.bedrooms
        this.areaSizeId = parsedAttributes.area
        this.feartureId = parsedAttributes.feature
        this.amenitiesId = parsedAttributes.Amenities
        this.yearId = parsedAttributes.year
        this.price = parsedAttributes.price
        this.fuelTypeId = parsedAttributes.fuelType
        this.engineCapacityId = parsedAttributes.engineCapacity
        this.subCategoriesId = parsedAttributes.subcategory
        this.modelId = parsedAttributes.model
        this.jobtypeId = parsedAttributes.type
        this.experienceId = parsedAttributes.experience
        this.educationId = parsedAttributes.education
        this.salaryId = parsedAttributes.salary
        this.salaryPeriodId = parsedAttributes.salaryPeriod
        this.companyNameId = parsedAttributes.companyName
        this.positionTypeId = parsedAttributes.possitionType
        this.careerLevelId = parsedAttributes.carrierLevel
        this.carId = parsedAttributes.car
        this.ageId = parsedAttributes.age
        this.breedId = parsedAttributes.breed
        // this.fashionTypeId = parsedAttributes.milage
        this.fabricId = parsedAttributes.fabric
        this.suitTypeId = parsedAttributes.suitType
        this.toyId = parsedAttributes.toy
        this.startingTime = this.sellingListTemp[0].starting_time
        this.endingTime = this.sellingListTemp[0].ending_time
        this.startingDate = this.sellingListTemp[0].starting_date
        this.endingDate = this.sellingListTemp[0].ending_date
        this.startingPrice = this.sellingListTemp[0].auction_price
        this.price = this.sellingListTemp[0].fix_price
        if (this.sellingListTemp[0].fix_price != null) {
          this.pricingCatId = "FixedPrice"
        } else if (this.sellingListTemp[0].auction_price != null) {
          this.pricingCatId = "Auction"
        }
        else {
          this.pricingCatId = "SellToTTOffer"
        }
      }
      console.log(this.sellingList)

    })
  }
  getNotification(){

    this.loading = true;
    this.mainServices.getNotification(this.currentUserId).subscribe((res:any) => {

      // this.notificationList = res.data
      this.notificationList = res.data.sort((a: any, b: any) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
      console.log('Notification:', this.notificationList)
      this.loading = false
    })
  }
  getSubCategoryName(categoryId: number, subCategoryId: number): string | undefined {
    // Combine all subcategories into one array
    const allSubCategories = [
      ...this.subCatMobile,
      ...this.subCatPropertyForSales,
      ...this.subCatVehicles,
      ...this.subCatPropertyRent,
      ...this.subCatElectronics,
      ...this.subCatBike,
      ...this.subCatJob,
      ...this.subCatServices,
      ...this.subCatAnimal,
      ...this.subCatFurniture,
      ...this.subCatFashion,
      ...this.subCatKid,
    ];

    // Find the subcategory that matches both categoryId and subCategoryId
    const foundSubCategory = allSubCategories.find(
      subCat => subCat.category_id === categoryId && subCat.id === subCategoryId
    );

    // Return the name of the found subcategory, or undefined if not found
    return foundSubCategory ? foundSubCategory.name : "";
  }

  getCurrentUser() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const jsonStringGetData = localStorage.getItem('key');
      if (jsonStringGetData) {
        this.currentUserProfile = JSON.parse(jsonStringGetData);
       this.allowRating= this.currentUserProfile.Id==this.currentUserId;
        console.log(this.currentUserProfile)
        this.imageUrl = this.currentUserProfile.img
      } else {
        console.warn('localStorage is not available.');
      }
    }
  }
  updateUserName = () => {
    let input = {
      name: this.currentUserProfile.name
    };
    this.loading = true;
    this.isDisabled = true;

    this.mainServices.updateUserName(input).subscribe({
      next: (res: any) => {
        console.log(res);
        const jsonString = JSON.stringify(res.data);
        localStorage.setItem("key", jsonString);
        this.getCurrentUser();
        this.loading = false;
        this.isDisabled = false;
        this.closeUserNameModal();
      },
      error: (error: any) => {
        console.error(error);
        this.loading = false;
        this.isDisabled = false;
      }
    });
  };

  updateUserNumber = () => {
    let input = {
      phone: this.currentUserProfile.phone
    };
    this.isDisabled = true;

    this.mainServices.updateNumber(input).subscribe({
      next: (res: any) => {
        console.log(res);
        const jsonString = JSON.stringify(res.data);
        localStorage.setItem("key", jsonString);
        this.getCurrentUser();
        this.loading = false;
        this.isDisabled = false;
        this.closeNumberModal();
      },
      error: (error: any) => {
        console.error(error);
        this.loading = false;
        this.isDisabled = false;
      }
    });
  };

  updateUserEmail = () => {
    this.closeModal();
    this.loading = true;
    let input = {
      email: this.currentUserProfile.email
    };
    this.isDisabled = true;

    this.mainServices.updateEmail(input).subscribe({
      next: (res: any) => {
        console.log(res);
        const jsonString = JSON.stringify(res.data);
        localStorage.setItem("key", jsonString);
        this.getCurrentUser();
        this.showSuccessMessage(res.message);
        this.loading = false;
        this.isDisabled = false;
        this.closeEmailModal();
      },
      error: (error: any) => {
        console.error(error);
        this.loading = false;
        this.isDisabled = false;
      }
    });
  };

  updateUserPassword = () => {
    let input = {
      password: this.currentUserProfile.password
    };
    this.isDisabled = true;

    this.mainServices.updatePassword(input).subscribe({
      next: (res: any) => {
        console.log(res);
        const jsonString = JSON.stringify(res.data);
        localStorage.setItem("key", jsonString);
        this.getCurrentUser();
        this.loading = false;
        this.isDisabled = false;
        this.closePasswordModal();
      },
      error: (error: any) => {
        console.error(error);
        this.loading = false;
        this.isDisabled = false;
      }
    });
  };
  updateUserLocation = () => {
    let input = {
      location: this.currentUserProfile.location
    };
    this.isDisabled = true;

    this.mainServices.updateLocation(input).subscribe({
      next: (res: any) => {
        console.log(res);
        const jsonString = JSON.stringify(res.data);
        localStorage.setItem("key", jsonString);
        this.getCurrentUser();
        this.isDisabled = false;
        this.closeLocationModal();
      },
      error: (error: any) => {
        console.error(error);
        this.isDisabled = false;
      }
    });
  }
  wishListProduct() {

    this.loading = true
    var input = {
      user_id: this.currentUserId
    }
    this.mainServices.wishListProduct(input).subscribe((res: any) => {

      this.savedItems = res.data

      // this.savedItems.isAuction = this.savedItems.fix_price == null ? true:false;
      console.log('SAVED ITEMS', this.savedItems)
      this.loading = false
    },
      (err: any) => {
        this.loading = false

      })
  }
  // parseDate(event: any): Date {

  //   let date = (event.target as HTMLTextAreaElement).value;
  //   let dateString: string = date;
  //   if (dateString) {
  //     return new Date(dateString);
  //   }
  //   return new Date();
  // }
  // parseSTime(event: Event): any {

  //   const input = event.target as HTMLInputElement;
  //   this.startingTime = input.value;
  // }
  // parseETime(event: Event): any {

  //   const input = event.target as HTMLInputElement;
  //   this.endingTime = input.value;
  // }
  // parseDate(event: any): Date {
  //   const date = (event.target as HTMLInputElement).value;
  //   return date ? new Date(date) : new Date();
  // }
  parseDate(event: any): Date {
    const date = (event.target as HTMLInputElement).value;
    const selectedDate = date ? new Date(date) : new Date();

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time for comparison
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
        this.showErrorMessage('Selected date cannot be in the past.');
        event.target.value = ''; // Clear the input field
        return new Date(); // Return the current date as a fallback
    }

    return selectedDate;
}

  parseETime(event: any): void {
    const selectedEndingTime = event.target.value;
    const selectedStartingTime = this.startingTime;

    if (!this.startingDate || !this.endingDate) {
        this.showErrorMessage('Invalid date selected.');
        setTimeout(() => this.endingTime = "", 1); // Clear the ending time input
        return;
    }

    const selectedEndingDate = new Date(this.endingDate);
    const selectedStartingDate = new Date(this.startingDate);

    // Create Date objects for starting and ending times
    const startTime = new Date(`${selectedStartingDate.toDateString()} ${selectedStartingTime}`);
    const endTime = new Date(`${selectedEndingDate.toDateString()} ${selectedEndingTime}`);

    // Check if ending time is less than starting time on the same date
    if (selectedStartingDate.toDateString() === selectedEndingDate.toDateString()) {
        if (endTime < startTime) {
            this.showErrorMessage('Ending time cannot be less than starting time.');
            setTimeout(() => this.endingTime = "", 1); // Clear the ending time input
            return;
        }
    }

    // Update the endingTime if valid
    this.endingTime = selectedEndingTime;
}

parseSTime(event: any): void {
    const selectedStartingTime = event.target.value;

    if (!this.startingDate) {
        this.showErrorMessage('Invalid date selected.');
        setTimeout(() => this.startingTime = "", 1); // Clear the starting time input
        return;
    }

    const selectedStartingDate = new Date(this.startingDate);
    const currentDateTime = new Date();
    const startTime = new Date(`${selectedStartingDate.toDateString()} ${selectedStartingTime}`);

    // Check if starting time is less than current time on the same date
    if (selectedStartingDate.toDateString() === currentDateTime.toDateString()) {
        if (startTime < currentDateTime) {
            this.showErrorMessage('Starting time cannot be in the past.');
            setTimeout(() => this.startingTime = "", 1); // Clear the starting time input
            return;
        }
    }

    // Update the startingTime if valid
    this.startingTime = selectedStartingTime;
}




  // Format a Date object as 'yyyy-MM-dd'
  formatDate(date: any): string {
    // If the input is a string, convert it to a Date object
    if (typeof date === 'string') {
        date = new Date(date);
    }

    // Check if date is a valid Date object
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        console.error("Invalid date object passed:", date);
        return ""; // Return an empty string or a default value
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

  // Example method to get today's date as 'yyyy-MM-dd'
  getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  // Method to get current time in 'HH:MM' format
  getCurrentTime(): string {
    const now = new Date();
    const utcHours = String(now.getUTCHours()).padStart(2, '0');
    const utcMinutes = String(now.getUTCMinutes()).padStart(2, '0');
    return `${utcHours}:${utcMinutes}`;
  }

  // Get minimum time based on the selected date
  getMinTime(type: 'start' | 'end'): string {
    const todayDate = this.getTodayDate();

    if (type === 'start') {
      if (this.startingDate) {
        const formattedStartDate = this.formatDate(this.startingDate);
        return formattedStartDate === todayDate ? this.getCurrentTime() : '00:00';
      }
      return '00:00'; // Default value when startingDate is null
    } else if (type === 'end') {
      if (this.endingDate) {
        const formattedEndDate = this.formatDate(this.endingDate);
        return formattedEndDate === todayDate ? this.getCurrentTime() : '00:00';
      }
      return '00:00'; // Default value when endingDate is null
    }

    return '00:00'; // Fallback default value
  }

  attributes() {
    const subCategoryList = this.categoryLookup[this.selectedCategoryId];
    const matchingCategories = this.categories.filter((cat: any) => cat.id == this.selectedCategoryId);
    const category = matchingCategories.length > 0 ? matchingCategories[0] : null;
    const categoryName = category?.name ?? '';
    // const subCategoryName = subCategoryList ? subCategoryList[this.selectedSubCategoryId]?.name ?? '' : '';
    const matchingSubCategories = subCategoryList ? subCategoryList.filter((subCat: any) => subCat.id == this.selectedSubCategoryId) : [];
    const subCategory = matchingSubCategories.length > 0 ? matchingSubCategories[0] : null;

    // Get the subcategory name
    const subCategoryName = subCategory?.name ?? '';
    this.subCategoriesId = subCategory?.Id;
    if (this.selectedCategoryId == "1") {

      const jsonData = {
        category_id: this.selectedCategoryId ?? '',
        category_name: categoryName,
        // sub_category_id:this.selectedSubCategoryId,
        sub_category_id:this.selectedSubCategoryId,
        sub_category_name:subCategoryName,
        product_id: this.productId,
        brand: this.brandId ?? '',
        condition: this.conditionId ?? '',
        price: (this.price == null)?null:this.price.trim() ?? '',
        storage: this.storageId ?? '',
        color: this.colorId ?? '',
        location: this.locationId
      };
      this.jSonAttributes = JSON.stringify(jsonData);
    }
    else if (this.selectedCategoryId == "3") {
      const jsonData = {
        category_id: this.selectedCategoryId ?? '',
        category_name: categoryName,
        sub_category_id:this.selectedSubCategoryId,
        sub_category_name:subCategoryName,
        product_id: this.productId,
        type: this.typeId ?? '',
        bedrooms: this.bedRoomId ?? '',
        area: this.areaSizeId ?? '',
        condition: this.conditionId,
        yearBuilt: this.yearBuiltId ?? '',
        feature: this.feartureId ?? '',
        Amenities: this.amenitiesId ?? '',
        price: (this.price == null)?null:this.price.trim() ?? '',
        storage: this.storageId ?? '',
        location: this.locationId ?? '',
        bathRoom: this.bathRoomId

      };
      this.jSonAttributes = JSON.stringify(jsonData);
    }
    else if (this.selectedCategoryId == "5") {
      const jsonData = {
        category_id: this.selectedCategoryId ?? '',
        category_name: categoryName,
        sub_category_id:this.selectedSubCategoryId,
        sub_category_name:subCategoryName,
        product_id: this.productId,
        makeAndModel: this.makeAndModelId ?? '',
        year: this.yearBuiltId ?? '',
        condition: this.conditionId ?? '',
        mileage: this.mileage ?? '',
        fuelType: this.fuelTypeId ?? '',
        color: this.colorId ?? '',
        price: (this.price == null)?null:this.price.trim() ?? '',
        location: this.locationId ?? ''

      };
      this.jSonAttributes = JSON.stringify(jsonData);
    }
    else if (this.selectedCategoryId == "4") {
      const jsonData = {
        category_id: this.selectedCategoryId ?? '',
        category_name: categoryName,
        sub_category_id:this.selectedSubCategoryId,
        sub_category_name:subCategoryName,
        product_id: this.productId,
        type: this.typeId ?? '',
        bedrooms: this.bedRoomId ?? '',
        area: this.areaSizeId ?? '',
        condition: this.conditionId,
        yearBuilt: this.yearBuiltId ?? '',
        feature: this.feartureId ?? '',
        Amenities: this.amenitiesId ?? '',
        price: (this.price == null)?null:this.price.trim() ?? '',
        storage: this.storageId ?? '',
        location: this.locationId ?? '',

      };
      this.jSonAttributes = JSON.stringify(jsonData);
    }
    else if (this.selectedCategoryId == "2") {
      const jsonData = {
        category_id: this.selectedCategoryId ?? '',
        category_name: categoryName,
        sub_category_id:this.selectedSubCategoryId,
        sub_category_name:subCategoryName,
        product_id: this.productId,
        // type: this.typeId ?? '',
        // bedrooms: this.bedRoomId ?? '',
        // area: this.areaSizeId ?? '',
        condition: this.conditionId,
        color: this.colorId ?? '',
        // yearBuilt: this.yearBuiltId ?? '',
        // feature: this.feartureId ?? '',
        // Amenities: this.amenitiesId ?? '',
        price: (this.price == null)?null:this.price.trim() ?? '',
        // storage: this.storageId ?? '',
        location: this.locationId ?? '',

      };
      this.jSonAttributes = JSON.stringify(jsonData);
    }
    else if (this.selectedCategoryId == "6") {
      const jsonData = {
        category_id: this.selectedCategoryId ?? '',
        category_name: categoryName,
        sub_category_id:this.selectedSubCategoryId,
        sub_category_name:subCategoryName,
        product_id: this.productId,

        subCatId: this.subCategoriesId ?? '',
        condition: this.conditionId,
        engineCapacity: this.engineCapacityId ?? '',
        model: this.modelId ?? '',
        price: (this.price == null)?null:this.price.trim() ?? '',
        location: this.locationId ?? '',

      };
      this.jSonAttributes = JSON.stringify(jsonData);
    }
    else if (this.selectedCategoryId == "7") {
      const jsonData = {
        category_id: this.selectedCategoryId ?? '',
        category_name: categoryName,
        sub_category_id:this.selectedSubCategoryId,
        sub_category_name:subCategoryName,
        product_id: this.productId,
        type: this.jobtypeId ?? '',
        experience: this.experienceId ?? '',
        education: this.educationId ?? '',
        salary: this.salaryId ?? '',
        condition: this.conditionId,
        salaryPeriod: this.salaryPeriodId ?? '',
        companyName: this.companyNameId ?? '',
        possitionType: this.positionTypeId ?? '',
        carrierLevel: this.careerLevelId ?? '',
        location: this.locationId ?? '',

      };
      this.jSonAttributes = JSON.stringify(jsonData);
    }
    else if (this.selectedCategoryId == "8") {
      const jsonData = {
        category_id: this.selectedCategoryId ?? '',
        category_name: categoryName,
        sub_category_id:this.selectedSubCategoryId,
        sub_category_name:subCategoryName,
        product_id: this.productId,
        subcategory: this.subCategoriesId ?? '',
        condition: this.conditionId ?? '',
        price: (this.price == null)?null:this.price.trim() ?? '',
        car: this.carId ?? '',
        location: this.locationId ?? '',

      };
      this.jSonAttributes = JSON.stringify(jsonData);
    }
    else if (this.selectedCategoryId == "12") {
      const jsonData = {
        category_id: this.selectedCategoryId ?? '',
        category_name: categoryName,
        sub_category_id:this.selectedSubCategoryId,
        sub_category_name:subCategoryName,
        product_id: this.productId,
        condition: this.conditionId,
        subcategory: this.subCategoriesId ?? '',
        age: this.ageId ?? '',
        price: (this.price == null)?null:this.price.trim() ?? '',
        breed: this.breedId ?? '',
        location: this.locationId ?? '',

      };
      this.jSonAttributes = JSON.stringify(jsonData);
    }
    else if (this.selectedCategoryId == "9") {
      const jsonData = {
        category_id: this.selectedCategoryId ?? '',
        category_name: categoryName,
        sub_category_id:this.selectedSubCategoryId,
        sub_category_name:subCategoryName,
        product_id: this.productId,
        subcategory: this.subCategoriesId ?? '',
        type: this.fashionTypeId ?? '',
        condition: this.conditionId ?? '',
        color: this.colorId ?? '',
        price: (this.price == null)?null:this.price.trim() ?? '',
        location: this.locationId ?? '',

      };
      this.jSonAttributes = JSON.stringify(jsonData);
    }
    else if (this.selectedCategoryId == "10") {
      const jsonData = {
        category_id: this.selectedCategoryId ?? '',
        category_name: categoryName,
        sub_category_id:this.selectedSubCategoryId,
        sub_category_name:subCategoryName,
        product_id: this.productId,
        subcategory: this.subCategoriesId ?? '',
        condition: this.conditionId,
        fabric: this.fabricId ?? '',
        suitType: this.suitTypeId ?? '',
        price: this.price ?? '',
        location: this.locationId ?? '',

      };
      this.jSonAttributes = JSON.stringify(jsonData);
    }
    else if (this.selectedCategoryId == "11") {
      const jsonData = {
        category_id: this.selectedCategoryId ?? '',
        category_name: categoryName,
        sub_category_id:this.selectedSubCategoryId,
        sub_category_name:subCategoryName,
        product_id: this.productId,
        subcategory: this.subCategoriesId ?? '',
        condition: this.conditionId ?? '',
        toy: this.toyId ?? '',
        price: (this.price == null)?null:this.price.trim() ?? '',
        location: this.locationId ?? '',

      };
      this.jSonAttributes = JSON.stringify(jsonData);
    }
  }
  onchange() {
    console.log('this is the selected categorie Id', this.selectedCategoryId);
  }
  markAsSold(prodictId: any) {
    this.router.navigate(['/markAsSold/',prodictId]);
    // this.loading = true
    // console.log('sold out ', prodictId)
    // this.mainServices.markAsSold(prodictId).subscribe((res: any) => {

    //   res
    //   this.getSelling();
    //   this.showSuccessMessage(res.message)
    //   this.loading = false
    // })
  }
  // getNotification() {
  //
  //   this.loading = true
  //   this.mainServices.getNotification(this.currentUserId).subscribe((res: any) => {
  //
  //     this.notificationList = res.data
  //     console.log('Notification:', this.notificationList)
  //     this.loading = false
  //   })
  // }
  addCumtomLink() {
    // let formData = new FormData();
    // formData.append('custom_link', this.customLink);
    // this.http.post('https://www.ttoffer.com/backend/public/api/edit-product-first-step', formData, { headers: this.getHeaders() }).subscribe(
    //   (response: any) => {
    //
    //   },
    //   error => {
    //     console.error('File upload failed', error);
    //   }
    // );

    let input = {
      custom_link: this.customLink
    }
    this.mainServices.customLink(input).subscribe((res: any) => {

      res;
      this.showSuccessMessage(res.message)
      console.log('customLInt', res)
    })
  }
  onLocationFound(location: string) {

    this.locationId = location;
  }
  cat(cat:any){

    cat
  }
  subcat(subCat:any){

    subCat
  }

}
