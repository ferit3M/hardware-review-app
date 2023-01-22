import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HardwareComponent } from 'src/app/interfaces/hardware-component';
import { HardwareComponentsService } from 'src/app/services/hardware-components/hardware-components.service';
import { UserService } from 'src/app/services/user/user.service';
import { ReviewService } from 'src/app/services/review/review.service';
import { getReview, Review } from 'src/app/interfaces/review';

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
  public userReview: string
  public isAddReview: boolean = false

  public category: string;
  private componentId: string;
  public componentReviews: getReview[] = [];

  public loggedIn: boolean;

  constructor(
    @Inject(ActivatedRoute) private route: ActivatedRoute,
    private _hardwareComponents: HardwareComponentsService,
    private userService: UserService,
    private reviewService: ReviewService
  ) {
    userService.loggedin.subscribe((result: boolean) => (this.loggedIn = result));
  }

  ngOnDestroy(): void {
    localStorage.removeItem(this.HARDWARE_CATEGORY_KEY);
    localStorage.removeItem(this.HARDWARE_COMPONENT_KEY);
  }

  ngOnInit(): void {
    this.componentId = this.route.snapshot.paramMap.get('id');
    this.category = localStorage.getItem(this.HARDWARE_CATEGORY_KEY);
    this.getReviews();

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
    const review: Review = {
      userId: 1,
      componentId: this.componentId,
      review: this.userReview,
      star: this.componentRate
    }
    console.log(review)
    this.reviewService.addReview(review)
    this.isAddReview = false
  }

  getReviews(){
      this.reviewService.getComponentReview(this.componentId).subscribe((result: getReview[]) => (this.componentReviews = result));
  }

  private loadSelectedComponentFromLocalStorage() {
    const temp: HardwareComponent = JSON.parse(localStorage.getItem(this.HARDWARE_COMPONENT_KEY)) as HardwareComponent;
    console.log(temp);

    if (temp != null)
      this.selectedHardware = temp;
    console.log(this.selectedHardware);

  }
}
