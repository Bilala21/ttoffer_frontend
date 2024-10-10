import { Component, Input } from '@angular/core';
// import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header-gray-links',
  templateUrl: './header-gray-links.component.html',
  styleUrls: ['./header-gray-links.component.scss'],
  // imports: [RouterModule],  // Import RouterModule
})
export class HeaderGrayLinksComponent {
  @Input() currentUserId: any;
}
