import { Component, OnInit } from '@angular/core';
import { HardwareComponent } from 'src/app/interfaces/hardware-component';
import { HARDWARE } from 'src/app/mock-data/hardware';
import { HardwareComponentsService } from 'src/app/services/hardware-components.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public hardware: Array<HardwareComponent[]>;

  constructor(private _hardwareComponents: HardwareComponentsService) {
  }

  ngOnInit(): void {

    this._hardwareComponents.hardware.subscribe((res: Array<HardwareComponent[]>) => {
      this.hardware = res;
    });

  }

}
