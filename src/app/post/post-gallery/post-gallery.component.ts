import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-gallery',
  templateUrl: './post-gallery.component.html',
  styleUrls: ['./post-gallery.component.css']
})
export class PostGalleryComponent implements OnInit {
  @Input() photo: any = [];
  @Input() video: any = [];
  media: any[] = [];
  constructor() { }

  ngOnInit() {
    this.nextImage();
    this.media = this.photo.length > 0 ? this.photo : this.video;
    this.selectedImage = this.media[0];
    this.selectedImage = this.media[0];
  }
  selectedImage = this.photo.length > 0 ? this.photo[0] : this.video[0];
  

  selectImage(image: string) {
    
    this.selectedImage = image;
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

}
