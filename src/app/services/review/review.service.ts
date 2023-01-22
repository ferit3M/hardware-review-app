import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Auth, UserLogin } from 'src/app/interfaces/user';
import { environment } from 'src/environments/environment';
import { UserService } from '../user/user.service';
import { getReview, Review } from 'src/app/interfaces/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private API_URL = environment.API_URL;

  private loggedin: boolean;

  constructor(private http: HttpClient, private userService: UserService) {
      userService.loggedin.subscribe((result: boolean) => (this.loggedin = result));
   }

   addReview(body: Review){
    return this.http.post(`${this.API_URL}/api/user/review`, body).toPromise().then((res: any) => {
      console.log(res);

    }).catch(err => {console.log(err)});
   }

   getComponentReview(id: string): Observable<getReview[]>{
  //   return this.http.get(`${this.API_URL}/api/component/${id}`).toPromise().then((res: getReview) => {
  //     console.log(res);
  //     return res;

  //   }).catch(err => {console.log(err)});
  //  }
    return this.http.get<getReview[]>(`${this.API_URL}/api/component/${id}`);
   }
}
