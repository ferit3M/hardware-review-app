import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-modal-registration',
  templateUrl: './modal-registration.component.html'
})
export class ModalRegistrationComponent implements OnInit {

  validateForm!: FormGroup;

  isVisible = false;

  constructor(
    private fb: UntypedFormBuilder,
    private _user: UserService,
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    if (this.validateForm.valid) {
      this._user.register(this.validateForm.value).then((res: boolean) => {
        if (true)
          this.isVisible = false;
      });
    }
  }

  handleCancel(): void {
    this.isVisible = false;
    this.validateForm.controls.name.setValue('');
    this.validateForm.controls.email.setValue('');
    this.validateForm.controls.password.setValue('');
  }
}
