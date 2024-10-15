import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent implements OnInit {
  @Input() postData: any = {}
  @Input({ required: true }) postDetialUrl: string = ""
  getYear(date: string) {
    return new Date(date).getFullYear();
  }
  ngOnInit(): void {

    console.log(this.postData, "postData");
  }
}
