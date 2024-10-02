import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-category',
  templateUrl: './post-category.component.html',
  styleUrls: ['./post-category.component.css'],
})
export class PostCategoryComponent implements OnInit {
  activeButton: number = 1;
  isActive = false;
  postCols = "col-12 col-md-6 col-lg-6 col-xl-4"
  constructor() { }

  ngOnInit() {
  }
  toggleSidebar() {
    this.isActive = !this.isActive;
  }
  setActiveButton(buttonNumber: number) {
    this.activeButton = buttonNumber;
  }
}
