import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MainServicesService } from '../../shared/services/main-services.service';
import { Extension } from '../../helper/common/extension/extension';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReviewPageComponent } from "../review-page/review-page.component";

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [
    NgFor,
    CommonModule,
    FormsModule,
    RouterModule,
    // ReviewPageComponent
],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {

  loading = false;
  notify: any [] = [
    {img:'assets/images/chat-profile1.png', heading1:'You have got a new', heading2:'message from wasif ali', heading3:'conversation',time:'31 min Ago'},
    {img:'assets/images/chat-profile1.png', heading1:'You have got a new', heading2:'message from wasif ali', heading3:'conversation',time:'31 min Ago'},
    {img:'assets/images/chat-profile1.png', heading1:'You have got a new', heading2:'message from wasif ali', heading3:'conversation',time:'31 min Ago'},
    {img:'assets/images/chat-profile1.png', heading1:'You have got a new', heading2:'message from wasif ali', heading3:'conversation',time:'31 min Ago'},
    {img:'assets/images/chat-profile1.png', heading1:'You have got a new', heading2:'message from wasif ali', heading3:'conversation',time:'31 min Ago'},
  ]
  notificationList:any
  currentUserId: number = 0
  constructor(
    private mainServices: MainServicesService,
    private extension: Extension,
  ){
    this.currentUserId = this.extension.getUserId();
  }
  ngOnInit():void{
    this.getNotification();
  }
  getNotification(){

    this.loading = true;
    this.mainServices.getNotification(this.currentUserId).subscribe((res:any) => {

      // this.notificationList = res.data
      this.notificationList = res.data.sort((a: any, b: any) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
      console.log('Notification:', this.notificationList)
      this.loading = false
    })
  }
}
