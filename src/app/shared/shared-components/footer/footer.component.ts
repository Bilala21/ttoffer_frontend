import { Component } from '@angular/core';
import { BodyComponent } from '../../../pages/body/body.component';
import { Extension } from '../../../helper/common/extension/extension';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [BodyComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentUserId:string=""
  constructor( private extention: Extension,) {
    this.currentUserId = extention.getUserId();

  }

}
