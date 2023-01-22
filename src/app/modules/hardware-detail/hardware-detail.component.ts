import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HardwareComponent } from 'src/app/interfaces/hardware-component';
import { HardwareComponentsService } from 'src/app/services/hardware-components/hardware-components.service';

@Component({
  selector: 'app-hardware-detail',
  templateUrl: './hardware-detail.component.html',
  styleUrls: ['./hardware-detail.component.scss']
})
export class HardwareDetailComponent implements OnInit, OnDestroy {

  private HARDWARE_CATEGORY_KEY = 'category';
  private HARDWARE_COMPONENT_KEY = 'component';

  public selectedHardware: HardwareComponent;
  public componentRate: number = 2.5
  public userReview: String
  public isAddReview: boolean = false

  public category: string;
  private componentId: string;

  constructor(
    @Inject(ActivatedRoute) private route: ActivatedRoute,
    private _hardwareComponents: HardwareComponentsService
  ) {
  }

  ngOnDestroy(): void {
    localStorage.removeItem(this.HARDWARE_CATEGORY_KEY);
    localStorage.removeItem(this.HARDWARE_COMPONENT_KEY);
  }

  ngOnInit(): void {
    this.componentId = this.route.snapshot.paramMap.get('id');
    this.category = localStorage.getItem(this.HARDWARE_CATEGORY_KEY);

    if (this.category == null)
      this._hardwareComponents.getComponentById(this.componentId).subscribe((res: HardwareComponent)=> {
        this.selectedHardware = res;
        this.saveToLocalStorage();
      });
    else
    {
      this.loadSelectedComponentFromLocalStorage();
    }
  }

  private saveToLocalStorage() {
    localStorage.setItem(this.HARDWARE_CATEGORY_KEY, this.category);
    localStorage.setItem(this.HARDWARE_COMPONENT_KEY, JSON.stringify(this.selectedHardware));
  }

  rateChange(){
    console.log(this.componentRate)
  }

  addReview(){
    this.isAddReview = true
    console.log(this.isAddReview)
  }

  submitReview(){
    this.isAddReview = false
    console.log(this.userReview)
  }

  private loadSelectedComponentFromLocalStorage() {
    const temp: HardwareComponent = JSON.parse(localStorage.getItem(this.HARDWARE_COMPONENT_KEY)) as HardwareComponent;
    console.log(temp);

    if (temp != null)
      this.selectedHardware = temp;
    console.log(this.selectedHardware);

  }
}
