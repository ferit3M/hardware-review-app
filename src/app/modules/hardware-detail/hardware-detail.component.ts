import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HardwareComponent } from 'src/app/interfaces/hardware-component';
import { HARDWARE } from 'src/app/mock-data/hardware';
import { HardwareComponentsService } from 'src/app/services/hardware-components.service';

@Component({
  selector: 'app-hardware-detail',
  templateUrl: './hardware-detail.component.html',
  styleUrls: ['./hardware-detail.component.scss']
})
export class HardwareDetailComponent implements OnInit {

  public selectedHardware: HardwareComponent;
  public componentRate: number = 2.5
  public userReview: String
  public isAddReview: boolean = false

  constructor(
    private route: ActivatedRoute,
    private _hardwareComponents: HardwareComponentsService
  ) {
  }

  ngOnInit(): void {
    const id: string = this.route.snapshot.paramMap.get('id');
    this.selectedHardware = this._hardwareComponents.getComponentById(id);
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

}
