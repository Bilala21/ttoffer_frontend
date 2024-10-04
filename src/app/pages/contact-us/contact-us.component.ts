import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/shared-components/header/header.component';
import { FooterComponent } from '../../shared/shared-components/footer/footer.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
  imports: [HeaderComponent, FooterComponent, NgFor,  NgIf, CommonModule]
})
export class ContactUsComponent implements OnInit {
  contactEmail!:string;
  phoneNo!:string;
  constructor() { }

  ngOnInit() {
    this.contactEmail='test@gmail.com'
    this.phoneNo='032145435435'
  }

}
