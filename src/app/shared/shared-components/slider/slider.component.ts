import { Component } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
})
export class SliderComponent {
  slides = [
    {
      image: 'https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/9d56fb9fb543451d.jpg?q=20',
    },
    {
      image: 'https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/9d56fb9fb543451d.jpg?q=20',
    },
    {
      image: 'https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/9d56fb9fb543451d.jpg?q=20',
    },
  ];
}
