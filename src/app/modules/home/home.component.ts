import { Component, OnInit } from '@angular/core';
import { HardwareCategory } from 'src/app/interfaces/hardware-category';
import { HardwareComponent } from 'src/app/interfaces/hardware-component';
import { HardwareComponentsService } from 'src/app/services/hardware-components.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public selectedHardwareCategoryIndex: number = -1;

  public allHardware: HardwareCategory[];

  public dataArrived: boolean = false;

  public selectedHardwareCategory: HardwareCategory = {
    category: 'All',
    endpoint: '',
    components: []
  };

  constructor(
    private _hardwareComponents: HardwareComponentsService,
    ) {
  }

  ngOnInit(): void {
    this._hardwareComponents.allHardware.subscribe((res: HardwareCategory[]) => {
      this.allHardware = res;
      this.addComponentsToCategoryAll();
      if (this.allHardware.length > 0)
        this.dataArrived = true;
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
}
