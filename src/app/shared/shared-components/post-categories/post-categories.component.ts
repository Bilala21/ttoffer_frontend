import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-categories',
  templateUrl: './post-categories.component.html',
  styleUrls: ['./post-categories.component.css']
})
export class PostCategoriesComponent implements OnInit {

  constructor() { }
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
  ngOnInit() {
  }

}
