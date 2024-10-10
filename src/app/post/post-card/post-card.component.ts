import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
  location = "2972 Westheimer Rd. Santa Ana, Illinois 85486";
  constructor() { }

  ngOnInit() {
  }

}
