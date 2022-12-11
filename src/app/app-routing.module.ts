import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { HardwareDetailComponent } from './modules/hardware-detail/hardware-detail.component';

const routes: Routes = [
    { path: '*', redirectTo: '', pathMatch: 'full' },
    {
        path: '',
        component: HomeComponent
    },
    /* {
        path: '',
        component: HomeComponent,
        loadChildren: () =>
            import('./modules/home/home.module').then((m) => m.HomeModule),
    } */
    { path: 'hardware/:id', component: HardwareDetailComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
