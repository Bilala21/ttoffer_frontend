import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CategoriesComponent } from "./pages/categories/categories.component";
import { ProductDetailsComponent } from "./pages/product-details/product-details.component";
import { ProfilePageComponent } from "./pages/profile-page/profile-page.component";
import { AuctionProductComponent } from "./pages/auction-product/auction-product.component";
import { AuctionUserProfileComponent } from "./pages/auction-user-profile/auction-user-profile.component";
import { ChatBoxComponent } from "./pages/chat-box/chat-box.component";
import { ReviewPageComponent } from "./pages/review-page/review-page.component";
import { WhoBoughtAdComponent } from "./pages/who-bought-ad/who-bought-ad.component";
import { HeaderComponent } from "./shared/shared-components/header/header.component";
import { FooterComponent } from "./shared/shared-components/footer/footer.component";
import { SellingComponent } from './pages/selling/selling.component';
import { HeaderNavigationComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [HeaderComponent, HeaderNavigationComponent, FooterComponent, RouterOutlet, ChatBoxComponent, ProfilePageComponent, ProductDetailsComponent, SellingComponent, WhoBoughtAdComponent, ReviewPageComponent, HeaderComponent, FooterComponent]
})
export class AppComponent {
  title = 'tt-offer';
}

