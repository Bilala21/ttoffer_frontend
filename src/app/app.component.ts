import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductDetailsComponent } from "./pages/product-details/product-details.component";
import { ProfilePageComponent } from "./pages/profile-page/profile-page.component";
import { ChatBoxComponent } from "./pages/chat-box/chat-box.component";
import { ReviewPageComponent } from "./pages/review-page/review-page.component";
import { WhoBoughtAdComponent } from "./pages/who-bought-ad/who-bought-ad.component";
import { HeaderComponent } from "./shared/shared-components/header/header.component";
import { FooterComponent } from "./shared/shared-components/footer/footer.component";
import { SellingComponent } from './pages/selling/selling.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [HeaderComponent,FooterComponent,RouterOutlet, ChatBoxComponent, ProfilePageComponent, ProductDetailsComponent, SellingComponent, WhoBoughtAdComponent, ReviewPageComponent, HeaderComponent, FooterComponent,CommonModule]
})
export class AppComponent {
  title = 'tt-offer';
}

