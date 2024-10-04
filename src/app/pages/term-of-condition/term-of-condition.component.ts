import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/shared-components/header/header.component';
import { FooterComponent } from '../../shared/shared-components/footer/footer.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-term-of-condition',
  standalone: true,
  templateUrl: './term-of-condition.component.html',
  styleUrls: ['./term-of-condition.component.css'],
  imports: [HeaderComponent, FooterComponent, NgFor,  NgIf, CommonModule]
})
export class TermOfConditionComponent implements OnInit {
  supportEmail!:string;
  constructor() { }

  ngOnInit() {
    this.supportEmail='support@ttoffer.com';
  }

}
