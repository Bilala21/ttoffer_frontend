import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/shared-components/header/header.component';
import { FooterComponent } from '../../shared/shared-components/footer/footer.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-Privacy-Policy',
  standalone: true,
  templateUrl: './Privacy-Policy.component.html',
  styleUrls: ['./Privacy-Policy.component.css'],
  imports: [HeaderComponent, FooterComponent, NgFor,  NgIf, CommonModule]
})
export class PrivacyPolicyComponent implements OnInit {
  supportEmail!:string;
  constructor() { }

  ngOnInit() {
    this.supportEmail='support@ttoffer.com.';
  }

}
