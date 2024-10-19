import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainServicesService } from '../../shared/services/main-services.service';
import { GlobalStateService } from '../../shared/services/state/global-state.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app-filters.component.html',
  styleUrl: './app-filters.component.scss'
})
export class AppFiltersComponent {
  constructor(private route: ActivatedRoute, private mainServicesService: MainServicesService, public globalStateService: GlobalStateService) { }
  slug: any = ""
  minPrice: number = 0;
  maxPrice: number = 150;
  id: any = null
  subCategories: any = []
  locations: any = [
    "Dhaka, Bangladesh",
    "Minnesota, USA",
    "Wisconsin, USA",
    "Michigan, USA",
    "New York, USA",
    "New Mexico, USA",
    "Washington, USA",
    "Brasilia, Brazil",
    "Karachi, Pakistan"
  ]

  filterCriteria: any = {
    location: []
  }

fetchData(){
  const modifiedFilter={...this.filterCriteria,location:this.filterCriteria.location.join(',')}
  this.mainServicesService.getFilteredProducts(modifiedFilter).subscribe({
    next: (res: any) => {
      this.globalStateService.setFilteredProducts(res.data)
    },
    error: (err) => {
      console.log(err);
    }
  })
}
  handleFilter(filter: any) {
    if (filter.key === "location") {
      const locIndex = this.filterCriteria.location.indexOf(filter.value);
      if (locIndex > -1) {
        this.filterCriteria.location.splice(locIndex, 1);
      } else {
        this.filterCriteria.location.push(filter.value);
      }
    } else {
      this.filterCriteria[filter.key] = filter.value;
    }
    this.fetchData();
   

  }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.slug = params.get('slug') || '';
      this.getSubCategory(); // Call the API whenever 'id' changes
    });
    this.globalStateService.product.subscribe((state) => {
      this.filterCriteria[state.prodTab.key]=state.prodTab.value;
      this.fetchData();
    })
    this.getSubCategory()
  }
  getSubCategory(){
    this.mainServicesService.getSubCategories(this.id).subscribe({
      next: (res) => {
        this.subCategories = res
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
