import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HardwareCategory } from '../../interfaces/hardware-category';
import { HardwareComponent } from '../../interfaces/hardware-component';

@Injectable({
  providedIn: 'root'
})
export class HardwareComponentsService {

  public endpoints: string[] = [
    'case_fan', 'ram', 'mouse', 'keyboard', 'cpu_fan', 'case', 'storage', 'processor', 'gpu', 'motherboard'
  ];

  public hardwareCategories: string[] = [
    'Case Fan', 'RAM', 'Mouse', 'Keyboard', 'Cpu Fan', 'Case', 'Storage', 'Processor', 'GPU', 'Motherboard'
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
  }

  public getComponentsByCategory(endpoint: string, limit: number, offset: number): Promise<HardwareComponent[]> {
    return this.http.get<HardwareComponent[]>(`${environment.RAPID_API_URL}/${endpoint}?limit=${limit}&offset=${offset}`, this.options)
    .toPromise();
  }

  transferComponent: HardwareComponent;

  getComponentById(id: string): Observable<HardwareComponent> {
    return of(this.transferComponent);
  }
}
