import { Component, Input } from '@angular/core';
import { HardwareComponent } from 'src/app/interfaces/hardware-component';

@Component({
  selector: 'app-component-card',
  templateUrl: './component-card.component.html',
  styleUrls: ['./component-card.component.scss']
})
export class ComponentCardComponent {

  @Input() public component: HardwareComponent;


}
