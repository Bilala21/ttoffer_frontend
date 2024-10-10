import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardComponent } from '../../../components/selling/card/card.component';

@Component({
  selector: 'app-seller-reveiw',
  standalone: true,
  templateUrl: './seller-reveiw.component.html',
  styleUrl: './seller-reveiw.component.scss',
  imports: [RouterLink, NgFor, CardComponent, NgIf, NgFor]
})

export class SellerReveiwComponent {
  buttonData: any = [
    {
      text: "View <br/> Post",
      href: "#",
      img: "/assets/images/icons/eye.png",
    },
    {
      text: "Edit <br/> Post",
      href: "#",
      img: "/assets/images/icons/edit.png",
    },
    {
      text: "Mark as<br/> Sold",
      href: "#",
      img: "/assets/images/icons/bookmark.png",
    },
    {
      text: "Sell <br/>Faster",
      href: "#",
      img: "/assets/images/icons/trend-up.png",
    },
  ]
}
