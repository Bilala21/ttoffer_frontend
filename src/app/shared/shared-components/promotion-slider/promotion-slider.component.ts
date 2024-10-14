import { Component ,Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-promotion-slider',
  templateUrl: './promotion-slider.component.html',
  styleUrl: './promotion-slider.component.scss'
})
export class PromotionSliderComponent  implements OnInit {
   @Input() banners:any=[]
   @Input() bannerClass:string = ''
   ngOnInit(): void {
     console.log(this.banners,"banners");
   }
}
