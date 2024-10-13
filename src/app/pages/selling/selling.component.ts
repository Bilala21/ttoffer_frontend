import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../../shared/shared-components/header/header.component";
import { FooterComponent } from "../../shared/shared-components/footer/footer.component";
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { MainServicesService } from '../../shared/services/main-services.service';
import { Extension } from '../../helper/common/extension/extension';

@Component({
    selector: 'app-selling',
    standalone: true,
    templateUrl: './selling.component.html',
    styleUrl: './selling.component.scss',
    imports: [FormsModule, CommonModule, HeaderComponent, FooterComponent,RouterModule]
})
export class SellingComponent {
  showPerformance:boolean = false;
  sellingId:any;
  currentUserid:number = 0;
  sellingList: any = [];
  whoBouthList:any;
  loading = false;
  // chatBox: any[]= [
  //   // {img:'assets/images/chat-profile1.png', name:'Elmer Laverty', text:'Haha oh man 🔥', time:'12m'},
  //   // {img:'assets/images/chat-profile2.png', name:'Florencio Dorrance', text:'woohoooo', time:'24m'},
  //   // {img:'assets/images/chat-profile3.png', name:'Lavern Laboy', text:`Haha that's terrifying 😂`, time:'1h'},
  //   // {img:'assets/images/chat-profile4.png', name:'Titus Kitamura', text:'omg, this is amazing', time:'5h'},
  // ]
  message:any [] = [
    // {img:'assets/images/profile-img.png', name:'Anthony (Web3.io)', text:'How are you today?', time:'9:54 AM'},
    // {img:'assets/images/profile-img.png', name:'Anthony (Web3.io)', text:'How are you today?', time:'9:54 AM'},
    // {img:'assets/images/profile-img.png', name:'Anthony (Web3.io)', text:'How are you today?', time:'9:54 AM'},
    // {img:'assets/images/profile-img.png', name:'Anthony (Web3.io)', text:'How are you today?', time:'9:54 AM'},
  ]
  constructor(
    private route: ActivatedRoute,
    private mainServices: MainServicesService,
    private extension: Extension,
    private router:Router,
  ){
    this.currentUserid = extension.getUserId()
  }
  ngOnInit():void{
    this.sellingId = this.route.snapshot.paramMap.get('id')!;
    this.getSelling();
    // this.getAllChatsOfUser();
    this.whoBought();
  }
  openTab(){
    this.showPerformance = !this.showPerformance
  }
  getSelling() {
    this.loading = true
    this.mainServices.getSelling().subscribe((res:any) => {
      this.sellingList = res.data.selling
      this.sellingList = this.sellingList.filter((item:any) => {
        return item.id == this.sellingId;
      });
      console.log(this.sellingList)
      this.loading = false
    })
  }
  markAsSold(prodictId:any){
    console.log('sold out ', prodictId)
    this.mainServices.markAsSold(prodictId).subscribe(res =>{

      res
    })
  }
  // getAllChatsOfUser = () => {

  //   this.loading = true
  //   this.mainServices.getAllChatsOfUser(this.currentUserid).subscribe((res:any) =>{

  //     this.message = res.data
  //     console.log(this.message)
  //     this.loading = false
  //   });
  // }
  whoBought(){
    let input = {
      user_id: this.currentUserid
    }
    this.mainServices.whoBought(input).subscribe(res =>{

      res
      this.whoBouthList = res
      console.log('who bought',this.whoBouthList)
    })
  }
  redirectToEditSection(){
    debugger
  const sellinList=JSON.stringify(this.sellingList[0])
  localStorage.setItem('editProduct',sellinList);
  this.router.navigate([`profilePage/${this.sellingList[0].id}`]);
}
}
