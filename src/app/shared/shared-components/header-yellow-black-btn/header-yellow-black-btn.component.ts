import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-yellow-black-btn',
  templateUrl: './header-yellow-black-btn.component.html',
  styleUrl: './header-yellow-black-btn.component.scss',
})
export class HeaderYellowBlackBtnComponent {
  @Input() currentInfo: any;
}
