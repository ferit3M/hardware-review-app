import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { HardwareComponent } from 'src/app/interfaces/hardware-component';

@Component({
  selector: 'app-component-card',
  templateUrl: './component-card.component.html',
  styleUrls: ['./component-card.component.scss']
})
export class ComponentCardComponent implements OnInit, AfterViewInit {

  private HARDWARE_CATEGORY_KEY = 'category';
  private HARDWARE_COMPONENT_KEY = 'component';

  @Input() public component: HardwareComponent;
  @Input() public category: string = 'a';

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.saveSelectedComponentDataToLocalStorage();
  }

  private saveSelectedComponentDataToLocalStorage() {
    localStorage.setItem(this.HARDWARE_CATEGORY_KEY, this.category);
    localStorage.setItem(this.HARDWARE_COMPONENT_KEY, JSON.stringify(this.component));
  }
}
