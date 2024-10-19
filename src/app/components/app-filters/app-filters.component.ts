import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainServicesService } from '../../shared/services/main-services.service';
import { GlobalStateService } from '../../shared/services/state/global-state.service';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [],
  templateUrl: './app-filters.component.html',
  styleUrl: './app-filters.component.scss'
})
export class AppFiltersComponent {
  constructor(private route: ActivatedRoute, private mainServicesService: MainServicesService, private globalStateService: GlobalStateService) { }
  slug: any = ""
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
    "Brasilia, Brazil"
  ]

  filterCriteria: any = {
    location: []
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

    this.mainServicesService.getFilteredProducts().subscribe({
      next: (res: any) => {
        this.globalStateService.setFilteredProducts(res.data)
        console.log(res, "getFilteredProducts");
      },
      error: (err) => {
        console.log(err);
      }
    })

    console.log(this.filterCriteria, "Updated Filters");
  }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.globalStateService.currentState.subscribe((state) => {
      console.log(state, "prodTab");
      filterCriteria[state.prodTab.key]=state.prodTab.value
    })
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
