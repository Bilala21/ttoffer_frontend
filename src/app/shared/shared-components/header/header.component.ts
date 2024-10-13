import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MainServicesService } from '../../services/main-services.service';
import { BodyComponent } from '../../../pages/body/body.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NotificationComponent } from "../../../pages/notification/notification.component";
import { routes } from '../../../app.routes';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { Extension } from '../../../helper/common/extension/extension';
import { AuthService } from '../../services/authentication/Auth.service';
import { catchError, of, throwError } from 'rxjs';
import { UserModule } from '../../../user/user.module';
import { LookupService } from '../../services/lookup/lookup.service';
import { category } from '../../Models/Product/category';
import { SharedDataService } from '../../services/shared-data.service';
@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [
    NgIf,
    FormsModule,
    NgFor,
    CommonModule,
    NotificationComponent,
    RouterModule,
    UserModule
  ]
})
export class HeaderComponent {


}
