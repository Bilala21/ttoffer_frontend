import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  //  @Input() cols = "col-12 col-md-6 col-lg-6 col-xl-4";
  @Input() cols!:string
  loaded = true;
  postList = [
    {
      id: 1,
      title: 'Introduction to Angular'
    },
    {
      id: 2,
      title: 'Understanding Angular Modules'
    },
    {
      id: 3,
      title: 'Understanding Angular Modules'
    },
    {
      id: 3,
      title: 'Understanding Angular Modules'
    },
    {
      id: 3,
      title: 'Understanding Angular Modules'
    },
    {
      id: 3,
      title: 'Understanding Angular Modules'
    },
    {
      id: 3,
      title: 'Understanding Angular Modules'
    },
    {
      id: 3,
      title: 'Understanding Angular Modules'
    },
      
  
  ];
  
  constructor() { }

  ngOnInit() {
  }

}
