import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HardwareComponent } from 'src/app/interfaces/hardware-component';
import { HardwareComponentsService } from 'src/app/services/hardware-components/hardware-components.service';
import { UserService } from 'src/app/services/user/user.service';
import { ReviewService } from 'src/app/services/review/review.service';
import { getReview, Review } from 'src/app/interfaces/review';
import { DatePipe, formatDate } from '@angular/common';

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
  public format = 'dd/MM/yyyy hh:mm';
  visible: boolean = false;
  userLeftReview: boolean = false;
  private userLoggedIn: string;

  constructor(
    @Inject(ActivatedRoute) private route: ActivatedRoute,
    private _hardwareComponents: HardwareComponentsService,
    private userService: UserService,
    private reviewService: ReviewService,
    private datePipe: DatePipe
  ) {
  }

  ngOnDestroy(): void {
    localStorage.removeItem(this.HARDWARE_CATEGORY_KEY);
    localStorage.removeItem(this.HARDWARE_COMPONENT_KEY);
  }

  ngOnInit(): void {
    this.userService.loggedin.subscribe((result: boolean) => (this.loggedIn = result));

    this.componentId = this.route.snapshot.paramMap.get('id');
    this.category = localStorage.getItem(this.HARDWARE_CATEGORY_KEY);
    this.getReviews();

    if(this.loggedIn == true){
      this.userLoggedIn = this.userService.name.getValue()
    }

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
      userId: this.userService.getUserId(),
      componentId: this.componentId,
      review: this.userReview,
      star: this.componentRate
    }
    this.componentReviews.forEach(review => {
      if(review.user){

      }
    })
    console.log(review)
    this.reviewService.addReview(review).then(() => {
      this.getReviews();
    })
    this.isAddReview = false
    
  }

  getReviews(){
      this.reviewService.getComponentReview(this.componentId).subscribe((result: getReview[]) => {
        this.componentReviews = result
        this.componentReviews.forEach(_review => {
          let newDate = new Date(_review.createdAt);
          _review.createdAt = this.datePipe.transform(newDate, "d/M/yyy H:mm")

          for(const prop in _review){
            if(this.loggedIn == true){
              if( _review[prop].name == this.userLoggedIn){
                this.userLeftReview = true;
              }
              console.log("in logged in if " + this.userLeftReview);
            }
          }
        });
      });
  }

  private loadSelectedComponentFromLocalStorage() {
    const temp: HardwareComponent = JSON.parse(localStorage.getItem(this.HARDWARE_COMPONENT_KEY)) as HardwareComponent;
    console.log(temp);

    if (temp != null)
      this.selectedHardware = temp;
    console.log(this.selectedHardware);

  }

  goToHomePage() {
  }

  logout() {
    this.userService.logout();
    this.userLeftReview = false;
    location.reload();
  }
}
