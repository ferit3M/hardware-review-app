import { Component, OnInit } from '@angular/core';
import { HARDWARE } from 'src/app/mock-data/hardware';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public hardware: string[] = HARDWARE;

  ngOnInit(): void {
    console.log(HARDWARE);

    for (let i = 0; i < HARDWARE.length; i++) {
      console.log(HARDWARE[i]);

    }

  }

}
