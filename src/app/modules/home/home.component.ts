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

  public selectedHardwareCategoryIndex: number = -1; // -1

  public allHardware: HardwareCategory[];

  public dataArrived: boolean = false;

  loggedin: boolean;

  searchTerm: string;

  public selectedHardwareCategory: HardwareCategory = {
    category: 'All',
    endpoint: '',
    components: []
  };

  visible: boolean = false;

  constructor(
    private _hardwareComponents: HardwareComponentsService,
    private _user: UserService,
    ) {
  }

  ngOnInit(): void {
    this._user.loggedin.subscribe((res: boolean) => {
      this.loggedin = res;
    });

    this._hardwareComponents.allHardware.subscribe((res: HardwareCategory[]) => {
      console.log(res);

      this.allHardware = res;
      this.addComponentsToCategoryAll();
      if (this.allHardware.length > 0) {
        this.dataArrived = true;
      }
    });
  }

  public selectHardwareCategory(index: number) {
    this.selectedHardwareCategoryIndex = index;

    if (index === -1) {
      this.addComponentsToCategoryAll();
    } else {
      let temp = this.allHardware[this.selectedHardwareCategoryIndex];
      this.selectedHardwareCategory = temp;
    }
  }

  private addComponentsToCategoryAll() {
    let tempHardware: HardwareCategory = {
      category: 'All',
      endpoint: '',
      components: []
    };
    const tempComponents: HardwareComponent[] = [];

    for (let i = 0; i < this.allHardware.length; i++) {
      this.allHardware[i].components.forEach((c: HardwareComponent) => {
        tempComponents.push(c);
      });

    }
    tempHardware.components = tempComponents;
    this.selectedHardwareCategory = tempHardware;
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
    let components: HardwareComponent[];
    if (this.selectedHardwareCategoryIndex === -1) {
      components = [];
      for (let i = 0; i < this.allHardware.length; i++)
        components = components.concat(this.allHardware[i].components)
    }
    else
      components = this.allHardware[this.selectedHardwareCategoryIndex].components;

    return components;
  }

  search() {
    this.selectedHardwareCategory.components = this.filter(this.searchTerm, this.componentsForSearchOnCurrentlySelectedCategory());
  }
}
