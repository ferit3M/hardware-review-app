import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HARDWARE } from 'src/app/mock-data/hardware';

@Component({
  selector: 'app-hardware-detail',
  templateUrl: './hardware-detail.component.html',
  styleUrls: ['./hardware-detail.component.scss']
})
export class HardwareDetailComponent implements OnInit {

  public selectedHardware: string = '';

  constructor(
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.selectedHardware = HARDWARE[id];
  }

}
