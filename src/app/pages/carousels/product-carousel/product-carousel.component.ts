import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-carousel',
  standalone: true,
  imports: [ NgFor],
  templateUrl: './product-carousel.component.html',
  styleUrl: './product-carousel.component.scss'
})
export class ProductCarouselComponent {
  
  @Input() photo: any = [];
  @Input() video: any = [];
  media: any[] = [];
  // images = [
  //   'assets/images/product-image.png',
  //   'assets/images/map.png',
  //   'assets/images/header-img.png'
  // ];

  // selectedImage = this.photo[0];
  selectedImage = this.photo.length > 0 ? this.photo[0] : this.video[0];
  

  selectImage(image: string) {
    
    this.selectedImage = image;
  }
  ngOnInit():void{
    
    this.nextImage();
    this.media = this.photo.length > 0 ? this.photo : this.video;
    this.selectedImage = this.media[0];
    this.selectedImage = this.media[0];
    
  }
  previousImage() {
    const currentIndex = this.media.indexOf(this.selectedImage);
    const previousIndex = (currentIndex === 0) ? this.media.length - 1 : currentIndex - 1;
    this.selectedImage = this.media[previousIndex];
  }

  nextImage() {
    const currentIndex = this.media.indexOf(this.selectedImage);
    const nextIndex = (currentIndex === this.media.length - 1) ? 0 : currentIndex + 1;
    this.selectedImage = this.media[nextIndex];
  }
  // previousImage() {
  //   const currentIndex = this.photo.indexOf(this.selectedImage);
  //   const previousIndex = (currentIndex === 0) ? this.photo.length - 1 : currentIndex - 1;
  //   this.selectedImage = this.photo[previousIndex];
  // }

  // nextImage() {
  //   const currentIndex = this.photo.indexOf(this.selectedImage);
  //   const nextIndex = (currentIndex === this.photo.length - 1) ? 0 : currentIndex + 1;
  //   this.selectedImage = this.photo[nextIndex];
  // }
}
