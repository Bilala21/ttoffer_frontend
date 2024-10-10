import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { SliderComponent } from './shared-components/slider/slider.component';
import { PromotionSliderComponent } from './shared-components/promotion-slider/promotion-slider.component';
import { UserStarRatingComponent } from './shared-components/user-star-rating/user-star-rating.component';
import { PostCategoriesComponent } from './shared-components/post-categories/post-categories.component';
import { HeaderGrayLinksComponent } from "./shared-components/header-gray-links/header-gray-links.component";
import { HeaderYellowBlackBtnComponent } from "./shared-components/header-yellow-black-btn/header-yellow-black-btn.component";
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    SliderComponent,
    PromotionSliderComponent,
    UserStarRatingComponent,
    PostCategoriesComponent,
    HeaderGrayLinksComponent,
    HeaderYellowBlackBtnComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgIf
  ],
 exports:[
  SliderComponent,
  PromotionSliderComponent,
  UserStarRatingComponent,
  PostCategoriesComponent,
  HeaderGrayLinksComponent,
  HeaderYellowBlackBtnComponent,
 ]
})
export class SharedModule { }
