import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './shared-components/slider/slider.component';
import { PromotionSliderComponent } from './shared-components/promotion-slider/promotion-slider.component';
import { UserStarRatingComponent } from './shared-components/user-star-rating/user-star-rating.component';
import { PostCategoriesComponent } from './shared-components/post-categories/post-categories.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    SliderComponent,
    PromotionSliderComponent,
    UserStarRatingComponent,
    PostCategoriesComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
 exports:[
  SliderComponent,
  PromotionSliderComponent,
  UserStarRatingComponent,
  PostCategoriesComponent
 ]
})
export class SharedModule { }
