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
    const user: UserLogin = {
      email: this.email,
      password: this.password
    }
    this._user.login(user).then((res:boolean) => {
      if (res)
        this.isVisible = false;
        location.reload();
    });
  }

  handleCancel(): void {
    this.isVisible = false;
    this.email = '';
    this.password = '';
  }
}
