import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HardwareComponent } from '../interfaces/hardware-component';

@Injectable({
  providedIn: 'root'
})
export class HardwareComponentsService {

  private endpoints: string[] = [
    'powerSupply', 'case_fan', 'ram', 'mouse', 'keyboard', 'cpu_fan', 'case', 'storage', 'processor', 'gpu', 'motherboard'
  ];

  public hardware: BehaviorSubject<Array<HardwareComponent[]>> = new BehaviorSubject([]);

  private options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': environment.X_RAPID_API_KEY,
      'X-RapidAPI-Host': environment.X_RAPID_API_HOST
    }
  };

  constructor(
    private http: HttpClient
  ) {
    console.log('HardwareComponentsService CREATED');
    for (let i = 0; i < 1; i++) {
      this.getComponents(this.endpoints[i], 5, 0);
    }
  }

  private getComponents(endpoint: string, limit: number, offset: number) {
    this.http.get(`${environment.RAPID_API_URL}/${endpoint}?limit=${limit}&offset=${offset}`, this.options)
    .subscribe((res: HardwareComponent[]) => {
      console.log(res);
      this.hardware.next([...this.hardware.value, res]);
    },
      err => console.log(err)
    );
  }

  public getComponentById(id: string): HardwareComponent {
    for (let i = 0; i < this.hardware.getValue().length; i++) {
      for (let j = 0; j < this.hardware.getValue()[i].length; j++) {
        if (this.hardware.getValue()[i][j].id === id)
          return this.hardware.value[i][j];
      }
    }
    return null;
  }
}
