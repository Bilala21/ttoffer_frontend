import { Routes } from '@angular/router';
import { HeaderComponent } from './shared/shared-components/header/header.component';
import { BodyComponent } from './pages/body/body.component';
import { ProductViewsComponent } from './pages/product-views/product-views.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ChatBoxComponent } from './pages/chat-box/chat-box.component';
import { WhoBoughtAdComponent } from './pages/who-bought-ad/who-bought-ad.component';
import { ReviewPageComponent } from './pages/review-page/review-page.component';
import { AuctionProductComponent } from './pages/auction-product/auction-product.component';
import { AuctionUserProfileComponent } from './pages/auction-user-profile/auction-user-profile.component';
import { PrivacyPolicyComponent } from './pages/Privacy-Policy/Privacy-Policy.component';
import { TermOfConditionComponent } from './pages/term-of-condition/term-of-condition.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { MarkAsSoldComponent } from './pages/mark-as-sold/mark-as-sold.component';
import { SellingDetailComponent } from './pages/selling/detail/selling-detail.component';
import { SellingComponent } from './pages/selling/selling.component';
import { PostPerformanceComponent } from './pages/selling/post-performance/post-performance.component';
import { DeleteAccountPageComponent } from './pages/profile-page/delete-account/delete-account.component';
import { ProductBuyerComponent } from './pages/selling/buyer/product-buyer.component';
import { SellerReveiwComponent } from './pages/selling/reviews/seller-reveiw.component';

export const routes: Routes = [


    {
        path: '',
        redirectTo: 'body',
        pathMatch: 'full'
    },
    // {
    //     path:'header',
    //     component:HeaderComponent
    // },
    {
        path: 'body',
        component: BodyComponent
    },
    // {
    //     path:'productView',
    //     component:ProductViewsComponent
    // },

    {
        path: 'productDetails/:id',
        component: ProductDetailsComponent
    },
    {
        path: 'profilePage/:id',
        component: ProfilePageComponent
    },
    {
        path: 'user/delete-account/:id',
        component: DeleteAccountPageComponent
    },
    {
        path: 'profilePageBy/:id/:name',
        component: ProfilePageComponent
    },
    {
        path: 'catagories/:id',
        component: CategoriesComponent
    },
    {
        path: 'chatBox/:id',
        component: ChatBoxComponent
    },
    {
        path: 'selling/:id',
        component: SellingComponent
    },
    {
        path: 'selling-detail/:id',
        component: SellingDetailComponent
    },
    {
        path: 'product-buyer',
        component: ProductBuyerComponent
    },
    {
        path: 'seller-review/:id',
        component: SellerReveiwComponent
    },
    {
        path: 'post-performance/:id',
        component: PostPerformanceComponent
    },
    {
        path: 'whoBoughtAd/:id',
        component: WhoBoughtAdComponent
    },
    {
        path: 'review/:id',
        component: ReviewPageComponent
    },
    {
        path: 'auctionProduct/:id',
        component: AuctionProductComponent
    },
    {
        path: 'auctionUserProfile/:id',
        component: AuctionUserProfileComponent
    },
    {
        path: 'product-views/:id',
        component: ProductViewsComponent
    },
    {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent
    },
    {
        path: 'term-of-condition',
        component: TermOfConditionComponent
    },
    {
        path: 'contact-us',
        component: ContactUsComponent
    },
    {
        path: 'markAsSold/:id',
        component: MarkAsSoldComponent
    },

    //New

    {
        path: 'post',
        loadChildren: () => import('./post/post.module').then(m => m.PostModule)
    },
    {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
    },

];
