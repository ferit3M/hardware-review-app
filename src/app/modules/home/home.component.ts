import { Component, OnInit } from '@angular/core';
import { HardwareCategory } from 'src/app/interfaces/hardware-category';
import { HardwareComponentsService } from 'src/app/services/hardware-components.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public selectedHardwareCategoryIndex: number = -1;

  public allHardware: HardwareCategory[];

  constructor(private _hardwareComponents: HardwareComponentsService) {
  }

  ngOnInit(): void {
    this._hardwareComponents.allHardware.subscribe((res: HardwareCategory[]) => {
      this.allHardware = res;
    })
  }

  public selectHardwareCategory(index: number) {
    this.selectedHardwareCategoryIndex = index;
  }
}
