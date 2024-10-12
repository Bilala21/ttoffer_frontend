import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgxApexchartsModule} from 'ngx-apexcharts';
import { CardComponent } from '../../../components/selling/card/card.component';
import { MainServicesService } from '../../../shared/services/main-services.service';
import { LoaderComponent } from "../../../components/loader/loader.component";

@Component({
  selector: 'app-post-performance',
  standalone: true,
  templateUrl: './post-performance.component.html',
  styleUrl: './post-performance.component.scss',
  imports: [RouterLink, NgFor, CardComponent, NgIf, LoaderComponent, NgxApexchartsModule, NgxApexchartsModule, LoaderComponent]
})

export class PostPerformanceComponent {
  public chartOptions: any;
  loading: boolean = false
  postData: any = {}
  constructor(private postService: MainServicesService, private route: ActivatedRoute) {
    // Sample data for 4 months
    const rawData = [10, 30, 40, 100];  // Original data
    const cappedData = rawData.map(value => (value > 60 ? 60 : value));  // Cap values at 60

    this.chartOptions = {
      series: [
        {
          name: "Veiws",
          data: cappedData  // Use capped data to ensure Y-axis does not exceed 60
        }
      ],
      chart: {
        type: "area",
        height: 350,
        with:"100%",
        zoom: {
          enabled: false
        },
        toolbar: { show: false }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth" // Smooth curve for better visualization
      },
      subtitle: {
        text: "Price Movements",
        align: "left"
      },
      xaxis: {
        type: "category",  // Use category type for months
        categories: ['Jan', 'Feb', 'Mar', 'Apr']  // Static months for 4 months
      },
      yaxis: {
        min: 10,  // Minimum Y-axis value
        max: 60,  // Maximum Y-axis value
        tickAmount: 6,  // Ensure ticks are 10, 20, 30, 40, 50, 60
        labels: {
          formatter: function (value: number) {
            return value.toFixed(0);  // Show integer values only
          }
        }
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (value: number) {
            return value > 60 ? '60+' : value;  // Show '60+' if value exceeds 60
          }
        }
      },
      legend: {
        horizontalAlign: "left"
      },
      fill: {
        opacity: 0.8
      },
      colors: ['#77B6EA']
    };
  }


  buttonData: any = [
    {
      text: "View <br/> Post",
      href: "/view-post/",
      img: "/assets/images/icons/eye.png",
    },
    {
      text: "Edit <br/> Post",
      href: "/",
      img: "/assets/images/icons/edit.png",
    },
    {
      text: "Mark as<br/> Sold",
      href: "/",
      img: "/assets/images/icons/bookmark.png",
    },
    {
      text: "Sell <br/>Faster",
      href: "/",
      img: "/assets/images/icons/trend-up.png",
    },
  ]
  ngOnInit(): void {
    this.loading = true
    this.route.params.subscribe(params => {
      this.postService.getPostById({ product_id: params['id'] }).subscribe({
        next: (data: any) => {
          console.log(data, "post perfomance data");
          this.postData = data?.data
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
