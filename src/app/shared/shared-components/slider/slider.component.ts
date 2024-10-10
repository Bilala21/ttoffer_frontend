import { Component } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
})
export class SliderComponent {
  slides = [
    {
      image: '/assets/images/silder-1.jpg',
      title: 'Revamp Your Space',
      description:
        'Enjoy up to <strong>40% off</strong> on stylish and comfortable furniture.',
      buttonText: 'Start Shopping Now',
    },
    {
      image: '/assets/images/silder-2.jpg',
      title: 'Elegant Designs',
      description: 'Transform your home with our latest collection.',
      buttonText: 'Browse Collection',
    },
    {
      image: '/assets/images/slider-3.jpg',
      title: 'Luxury Comfort',
      description: 'Discover furniture that matches your style.',
      buttonText: 'Shop Now',
    },
  ];
}
