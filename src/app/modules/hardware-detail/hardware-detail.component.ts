import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { HardwareComponent } from 'src/app/interfaces/hardware-component';
import { HardwareComponentsService } from 'src/app/services/hardware-components/hardware-components.service';
import { UserService } from 'src/app/services/user/user.service';
import { ReviewService } from 'src/app/services/review/review.service';
import { getReview, Review } from 'src/app/interfaces/review';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-hardware-detail',
  templateUrl: './hardware-detail.component.html',
  styleUrls: ['./hardware-detail.component.scss']
})
export class HardwareDetailComponent implements OnInit, OnDestroy {

  private HARDWARE_CATEGORY_KEY = 'category';
  private HARDWARE_COMPONENT_KEY = 'component';

  public selectedHardware: HardwareComponent;
  public componentRate: number = 0
  public userReview: string = ""
  public isAddReview: boolean = false

  public category: string;
  private componentId: string;
  public componentReviews: getReview[] = [];

  public loggedIn: boolean;
  public format = 'dd/MM/yyyy hh:mm';
  visible: boolean = false;
  userLeftReview: boolean = false;
  private userLoggedIn: string;
  public totalStar: number = 0;
  public count: number = 0;
  public reviewErrorMessage: boolean = false;
  public rateErrorMessage: boolean = false;

  constructor(
    @Inject(ActivatedRoute) private route: ActivatedRoute,
    private _hardwareComponents: HardwareComponentsService,
    private userService: UserService,
    private reviewService: ReviewService,
    private datePipe: DatePipe,
    private router: Router
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

  addReview(){
    this.isAddReview = true
  }

  submitReview(){
    const review: Review = {
      userId: this.userService.getUserId(),
      componentId: this.componentId,
      review: this.userReview,
      star: this.componentRate
    }
    if(this.componentRate < 1 || Number.isNaN(this.componentRate)){
      this.rateErrorMessage = true;
    }
    else if(this.userReview == ""){
      this.reviewErrorMessage = true;
      this.rateErrorMessage = false;
    }
    else{
      this.reviewErrorMessage = false;
      this.rateErrorMessage = false;
      this.reviewService.addReview(review).then(() => {
        this.getReviews()
        location.reload()
      })
      this.isAddReview = false
    }
  }

  getReviews(){
    var tempCount = 0;
      this.reviewService.getComponentReview(this.componentId).subscribe((result: getReview[]) => {
        this.componentReviews = result
        this.componentReviews.forEach(_review => {
          let newDate = new Date(_review.createdAt);
          _review.createdAt = this.datePipe.transform(newDate, "d/M/yyy H:mm")
          tempCount++;
          this.totalStar += _review.star;
          for(const prop in _review){
            if(this.loggedIn == true){
              if( _review[prop].name == this.userLoggedIn){
                this.userLeftReview = true;
              }
            }
          }
        });
        this.count = tempCount;
        this.totalStar = this.totalStar / this.count;
      });
  }

  private loadSelectedComponentFromLocalStorage() {
    const temp: HardwareComponent = JSON.parse(localStorage.getItem(this.HARDWARE_COMPONENT_KEY)) as HardwareComponent;

    if (temp != null)
      this.selectedHardware = temp;
  }

  goToHomePage() {
    this.router.navigate(["/"])
  }

  logout() {
    this.userService.logout();
    this.userLeftReview = false;
    location.reload();
  }
}
