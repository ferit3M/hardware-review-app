import { Component } from '@angular/core';
import { UserLogin } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html'
})
export class ModalLoginComponent {

  email: string;
  password: string;

  isVisible = false;

  constructor(
    private _user: UserService,
  ) {}

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    const user: UserLogin = {
      email: this.email,
      password: this.password
    }
    console.log(user);

    this._user.login(user).then((res:boolean) => {
      if (res)
        this.isVisible = false;
    });
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
