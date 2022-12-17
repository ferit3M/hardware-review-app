import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
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

  public allHardware: BehaviorSubject<HardwareCategory[]> = new BehaviorSubject<HardwareCategory[]>([]);

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

  private async getComponents() {
    let tempAllHardware: HardwareCategory[] = [];
    for (let i = 0; i < this.endpoints.length; i++) {
      await this.getComponentsByCategory(this.endpoints[i], 5, 0).then((hardwareComponents: HardwareComponent[]) => {
        const tempHardwareCategory = {
          endpoint: this.endpoints[i],
          category: this.hardwareCategories[i],
          components: hardwareComponents
        }
        tempAllHardware.push(tempHardwareCategory)
      }, err => console.log(err) );
    }
    this.allHardware.next(tempAllHardware);
  }

  private async getComponentsByCategory(endpoint: string, limit: number, offset: number): Promise<HardwareComponent[]> {
    return await this.http.get<HardwareComponent[]>(`${environment.RAPID_API_URL}/${endpoint}?limit=${limit}&offset=${offset}`, this.options)
    .toPromise();
  }

  public getComponentById(id: string): Observable<HardwareComponent> {
    return this.allHardware.pipe(
      map((res: HardwareCategory[]) => {
        for (let i = 0; i < res.length; i++) {
          for (let j = 0; j < res[i].components.length; j++) {
            if (res[i].components[j].id === id)
              return res[i].components[j];
          }
        }
        return null;
      })
    )
  }
}
