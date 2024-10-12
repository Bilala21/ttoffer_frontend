import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CardComponent } from '../../../components/selling/card/card.component';
import { MainServicesService } from '../../../shared/services/main-services.service';
import { LoaderComponent } from "../../../components/loader/loader.component";

@Component({
  selector: 'app-selling-detail',
  standalone: true,
  templateUrl: './selling-detail.component.html',
  styleUrl: './selling-detail.component.scss',
  imports: [RouterLink, NgFor, CardComponent, LoaderComponent, LoaderComponent, NgIf]
})

export class SellingDetailComponent implements OnInit {
  constructor(private route: ActivatedRoute, private postService: MainServicesService) { }
  postData: any = {}
  loading: boolean = false
  buttonData: any = [
    {
      text: "View <br/> Post",
      href: "#",
      img: "/assets/images/icons/eye.png",
    },
    {
      text: "Edit <br/> Post",
      href: "#",
      img: "/assets/images/icons/edit.png",
    },
    {
      text: "Mark as<br/> Sold",
      href: "#",
      img: "/assets/images/icons/bookmark.png",
    },
    {
      text: "Sell <br/>Faster",
      href: "#",
      img: "/assets/images/icons/trend-up.png",
    },
  ]
  ngOnInit(): void {
    this.loading = true
    this.route.params.subscribe(params => {
      this.postService.getPostById({ product_id: params['id'] }).subscribe({
        next: (data: any) => {
          console.log(data, "post data");
          this.postData=data?.data
          this.loading = false
        },
        error: (err) => {
          console.log(err);
          this.loading = false
        },
      })
    });
  }
}
