import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HardwareComponent } from 'src/app/interfaces/hardware-component';
import { HardwareComponentsService } from 'src/app/services/hardware-components.service';

@Component({
  selector: 'app-hardware-detail',
  templateUrl: './hardware-detail.component.html',
  styleUrls: ['./hardware-detail.component.scss']
})
export class HardwareDetailComponent implements OnInit {

  private HARDWARE_CATEGORY_KEY = 'category';
  private HARDWARE_COMPONENT_KEY = 'component';

  public selectedHardware: HardwareComponent;
  public componentRate: number = 2.5
  public userReview: String
  public isAddReview: boolean = false
  public category: string;

  constructor(
    private route: ActivatedRoute,
    private _hardwareComponents: HardwareComponentsService
  ) {
  }

  ngOnInit(): void {
    console.log("ngOnInit")
    this.category = localStorage.getItem(this.HARDWARE_CATEGORY_KEY);
    const id: string = this.route.snapshot.paramMap.get('id');
    console.log(id);

    //this.loadSelectedComponentFromLocalStorage();
    //this.selectedHardware = this._hardwareComponents.getComponentById(id);

    this._hardwareComponents.getComponentById(id).subscribe((res: HardwareComponent)=> {
      console.log('rez');
      console.log(res);


      this.selectedHardware = res;
    })
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

  private  loadSelectedComponentFromLocalStorage() {
    this.selectedHardware = JSON.parse(localStorage.getItem(this.HARDWARE_COMPONENT_KEY)) as HardwareComponent;
    console.log(this.selectedHardware);

  }
}
