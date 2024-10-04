import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/shared-components/header/header.component';
import { FooterComponent } from '../../shared/shared-components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxDropzoneModule } from 'ngx-dropzone';

@Component({
  selector: 'app-mark-as-sold',
  templateUrl: './mark-as-sold.component.html',
  styleUrls: ['./mark-as-sold.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    NgFor,
    FooterComponent,
    FormsModule,
    NgIf,
    RouterModule,
    NgFor,
    NgxDropzoneModule,
  ]
})
export class MarkAsSoldComponent implements OnInit {

  loading = false;
  adList=[{img:'assets/images/action_filled.png',message:'Someone from TTOffer?'},
    {img:'assets/images/action_filled.png',message:'Someone from Outside TTOffer?'},
    {img:'assets/images/action_filled.png',message:'Anthony'},
    {img:'assets/images/action_filled.png',message:'Mark'},
  ];
  isBtnDisabled = true;
  constructor() { }

  ngOnInit() {
  }

  onBuyerSelected(buyer: string) {
    console.log('Selected buyer:', buyer);
    this.isBtnDisabled=false;
    // Handle the buyer selection logic here
  }

  onDoneClick() {
    // Logic for when 'Done' is clicked
  }

  onSkipClick() {
    // Logic for when 'Skip' is clicked
  }
}
