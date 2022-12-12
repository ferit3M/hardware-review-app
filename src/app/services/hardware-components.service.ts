import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HardwareCategory } from '../interfaces/hardware-category';
import { HardwareComponent } from '../interfaces/hardware-component';

@Injectable({
  providedIn: 'root'
})
export class HardwareComponentsService {

  private endpoints: string[] = [
    'powerSupply', 'case_fan', 'ram', 'mouse', 'keyboard', 'cpu_fan', 'case', 'storage', 'processor', 'gpu', 'motherboard'
  ];

  private hardwareCategories: string[] = [
    'Power Supply', 'Case Fan', 'RAM', 'Mouse', 'Keyboard', 'Cpu Fan', 'Case', 'Storage', 'Processor', 'GPU', 'Motherboard'
  ];

  public allHardware: BehaviorSubject<HardwareCategory[]> = new BehaviorSubject([]);

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
    this.getComponents();
  }

  private getComponents() {
    for (let i = 0; i < this.endpoints.length; i++) {
      this.getComponentsByCategory(this.endpoints[i], 5, 0).subscribe((hardwareComponents: HardwareComponent[]) => {
        const hardwareCategory = {
          endpoint: this.endpoints[i],
          category: this.hardwareCategories[i],
          components: hardwareComponents
        }
        this.allHardware.value.push(hardwareCategory);
      });
    }
  }

  private getComponentsByCategory(endpoint: string, limit: number, offset: number): Observable<HardwareComponent[]> {
    return this.http.get<HardwareComponent[]>(`${environment.RAPID_API_URL}/${endpoint}?limit=${limit}&offset=${offset}`, this.options);
  }

  public getComponentById(id: string): HardwareComponent {
    for (let i = 0; i < this.allHardware.getValue().length; i++) {
      for (let j = 0; j < this.allHardware.getValue()[i].components.length; j++) {
        if (this.allHardware.getValue()[i].components[j].id === id)
          return this.allHardware.getValue()[i].components[j];
      }
    }
    return null;
  }
}
