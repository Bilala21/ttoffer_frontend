import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostCategoryComponent } from './post-category/post-category.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
const routes: Routes = [
  {
    path:"post-category/:id",component:PostCategoryComponent
  },
  {
    path:"post-category",component:PostCategoryComponent
  },
  {
    path:"post-detail",component:PostDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
