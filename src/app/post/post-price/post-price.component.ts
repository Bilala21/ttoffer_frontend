import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-price',
  templateUrl: './post-price.component.html',
  styleUrls: ['./post-price.component.css']
})
export class PostPriceComponent implements OnInit {
notFilledImage="assets/images/action.png"
filledImage="assets/images/action_filled.png";
constructor() { }

  ngOnInit() {
  }

}
