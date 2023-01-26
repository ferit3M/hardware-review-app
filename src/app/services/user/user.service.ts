import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  private ACCESS_USER_ID_KEY = 'user_id';
  private ACCESS_USER_NAME_KEY = 'user_name';
  private ACCESS_USER_EMAIL_KEY = 'user_email';

  readonly loggedin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private access_token: string = null;
  private id: number;
  name: BehaviorSubject<string> = new BehaviorSubject('');
  private email: string;

  constructor(
    private http: HttpClient,
  ) {
    this.access_token = localStorage.getItem(this.ACCESS_TOKEN_STORAGE_KEY);
    this.id = Number(localStorage.getItem(this.ACCESS_USER_ID_KEY));
    this.name.next(localStorage.getItem(this.ACCESS_USER_NAME_KEY));
    this.email = localStorage.getItem(this.ACCESS_USER_EMAIL_KEY);

    if (this.access_token && this.id !== 0 && this.name.getValue() && this.email)
      this.loggedin.next(true);
  }

  private loginSuccesful(access_token: string, id: number, name: string, email: string) {
    localStorage.setItem(this.ACCESS_TOKEN_STORAGE_KEY, access_token);
    localStorage.setItem(this.ACCESS_USER_ID_KEY, id.toString());
    localStorage.setItem(this.ACCESS_USER_NAME_KEY, name);
    localStorage.setItem(this.ACCESS_USER_EMAIL_KEY, email);
    this.loggedin.next(true);
    this.id = id;
    this.name.next(name);
    this.email = email;
  }

  login(body: UserLogin): Promise<boolean> {
    return this.http.post(`${this.API_URL}/api/auth/signin`, body).toPromise().then((res: Auth) => {
      console.log(res);

      if (res.access_token) {
        this.loginSuccesful(res.access_token, res.user.id, res.user.name, res.user.email);
        return true;
      }
    }).catch(err => {return false});
  }

  register(body: UserLogin): Promise<boolean> {
    return this.http.post(`${this.API_URL}/api/auth/signup`, body).toPromise().then((res: Auth) => {
      console.log(res);

      if (res.access_token) {
        this.loginSuccesful(res.access_token, res.user.id, res.user.name, res.user.email);
        return true;
      }
    }).catch(err => { return false; });
  }

  logout() {
    this.loggedin.next(false);
    localStorage.removeItem(this.ACCESS_TOKEN_STORAGE_KEY);
  }

  getAuthorizedOptions() {
    const options = {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.access_token}`
      })
    };
    return options;
  }

  getUserId(): number {
    return this.id;
  }

  getEmail(): string {
    return this.email;
  }
}
