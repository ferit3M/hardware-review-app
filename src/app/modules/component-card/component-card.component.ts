import { Component, Input } from '@angular/core';
import { HardwareComponent } from 'src/app/interfaces/hardware-component';
import { HardwareComponentsService } from 'src/app/services/hardware-components/hardware-components.service';

@Component({
  selector: 'app-component-card',
  templateUrl: './component-card.component.html',
  styleUrls: ['./component-card.component.scss']
})
export class ComponentCardComponent {

  @Input() public component: HardwareComponent;
  @Input() public category: string;

  constructor(
    private _hardwareComponent: HardwareComponentsService
  ) {

  }

  imageURL(): string {
    if (this.component.img)
      return `url(${this.component.img})`;
    else
      return '';
  }

  cardClicked() {
    this._hardwareComponent.transferComponent = this.component;
  }
}
