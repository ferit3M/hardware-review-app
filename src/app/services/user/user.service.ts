import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Auth, UserLogin } from 'src/app/interfaces/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = environment.API_URL;

  private ACCESS_TOKEN_STORAGE_KEY = 'access_token';

  readonly loggedin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private access_token: string = null;

  constructor(
    private http: HttpClient,
  ) {
    this.access_token = localStorage.getItem(this.ACCESS_TOKEN_STORAGE_KEY);
    if (this.access_token)
      this.loginSuccesful(this.access_token);
  }

  private loginSuccesful(access_token: string) {
    localStorage.setItem(this.ACCESS_TOKEN_STORAGE_KEY, access_token);
    this.loggedin.next(true);
  }

  login(body: UserLogin): Promise<boolean> {
    return this.http.post(`${this.API_URL}/api/auth/signin`, body).toPromise().then((res: Auth) => {
      console.log(res);

      if (res.access_token) {
        this.loginSuccesful(res.access_token);
        return true;
      }
    }).catch(err => {return false});
  }

  register(body: UserLogin) {
    this.http.post(`${this.API_URL}/api/auth/signup`, body).toPromise().then((res: Auth) => {
      console.log(res);

      if (res.access_token) {
        this.loginSuccesful(res.access_token);
        return true;
      }
    }).catch(err => { return false; });
  }

  logout() {
    this.loggedin.next(false);
    localStorage.removeItem(this.ACCESS_TOKEN_STORAGE_KEY);
  }
}
