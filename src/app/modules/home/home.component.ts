import { Component, OnInit } from '@angular/core';
import { HardwareCategory } from 'src/app/interfaces/hardware-category';
import { HardwareComponent } from 'src/app/interfaces/hardware-component';
import { HardwareComponentsService } from 'src/app/services/hardware-components/hardware-components.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  spinnerSpinning = true;

  hardwareCategoriesNames: string[];

  public selectedHardwareCategoryIndex: number = 0;

  public allHardware: HardwareCategory[] = new Array(this._hardwareComponents.endpoints.length);

  loggedin: boolean;

  searchTerm: string;

  public selectedHardwareCategory: HardwareCategory;

  visible: boolean = false;

  constructor(
    private _hardwareComponents: HardwareComponentsService,
    private _user: UserService,
    ) {
  }

  async ngOnInit(): Promise<void> {
    this._user.loggedin.subscribe((res: boolean) => {
      this.loggedin = res;
    });

    this.hardwareCategoriesNames = this._hardwareComponents.hardwareCategories;

    for (let i = 0; i < this.hardwareCategoriesNames.length; i++) {

      this._hardwareComponents.getComponentsByCategory(this._hardwareComponents.endpoints[i], 6, 0)
      .then((res: HardwareComponent[]) => {
        let tempHardware: HardwareCategory = {
          category: this.hardwareCategoriesNames[i],
          endpoint: this._hardwareComponents.endpoints[i],
          components: res,
          offsetsIncluded: 0
        };
        this.allHardware[i] = tempHardware;

        if (i === this.selectedHardwareCategoryIndex){
          this.selectedHardwareCategory = JSON.parse(JSON.stringify(this.allHardware[i])) as HardwareCategory;
          this.spinnerSpinning = false;
        }
      });
    }
  }

  getMoreComponentsForCategory(categoryIndex: number) {
    console.log(this.allHardware[categoryIndex]);

    const offset = this.allHardware[categoryIndex].offsetsIncluded + 1;
    this._hardwareComponents.getComponentsByCategory(this._hardwareComponents.endpoints[categoryIndex], 6, offset)
    .then((res: HardwareComponent[]) => {
      this.allHardware[categoryIndex].components = this.allHardware[categoryIndex].components.concat(res);
      this.allHardware[categoryIndex].offsetsIncluded = offset;
      this.selectedHardwareCategory.components = [...this.allHardware[categoryIndex].components];
      this.spinnerSpinning = false;
    });
  }

  public selectHardwareCategory(index: number) {
    this.selectedHardwareCategoryIndex = index;
    let temp: HardwareCategory = Object.assign({}, this.allHardware[this.selectedHardwareCategoryIndex]);
    this.selectedHardwareCategory = temp;

    this.searchTerm = '';
  }

  logout() {
    this._user.logout();
  }

  private filter(query: string, items: HardwareComponent[]): HardwareComponent[] {
    query = query.toLowerCase();

    return items
      .filter(item => item.title.toLowerCase().includes(query))
      .sort((a, b) => {
        if (a.title.toLowerCase().startsWith(query) && !b.title.toLowerCase().startsWith(query)) {
          return -1;
        } else if (!a.title.toLowerCase().startsWith(query) && b.title.toLowerCase().startsWith(query)) {
            return 1;
        } else {
            return 0;
        }
      });
  }

  private componentsForSearchOnCurrentlySelectedCategory(): HardwareComponent[] {
    let components: HardwareComponent[] = [];
    components = JSON.parse(JSON.stringify(this.allHardware[this.selectedHardwareCategoryIndex].components)) as HardwareComponent[];
    return components;
  }

  search(query: string) {
    if (query === '')
      this.selectedHardwareCategory.components = this.componentsForSearchOnCurrentlySelectedCategory();
    else
      this.selectedHardwareCategory.components = this.filter(query, this.componentsForSearchOnCurrentlySelectedCategory());
  }

  loadMore() {
    this.spinnerSpinning = true;
    this.getMoreComponentsForCategory(this.selectedHardwareCategoryIndex);
  }
}
