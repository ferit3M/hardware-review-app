import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HardwareDetailComponent } from './modules/hardware-detail/hardware-detail.component';
import { HomeComponent } from './modules/home/home.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { ComponentCardComponent } from './modules/component-card/component-card.component';
import { ModalLoginComponent } from './modules/modal-login/modal-login.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ModalRegistrationComponent } from './modules/modal-registration/modal-registration.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HardwareDetailComponent,
    HomeComponent,
    ComponentCardComponent,
    ModalLoginComponent,
    ModalRegistrationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzLayoutModule,
    NzButtonModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzModalModule,
    NzInputModule,
    NzFormModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
