import { Component ,Input} from '@angular/core';

@Component({
  selector: 'app-promotion-slider',
  templateUrl: './promotion-slider.component.html',
  styleUrl: './promotion-slider.component.scss'
})
export class PromotionSliderComponent {
   @Input() banner:any
   @Input() bannerClass:string = ''
}
