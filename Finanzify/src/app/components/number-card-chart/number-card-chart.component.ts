import { Component, OnInit, Input } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-number-card-chart',
  templateUrl: './number-card-chart.component.html',
  styleUrls: ['./number-card-chart.component.scss'],
  standalone: true,
  imports: [NgxChartsModule]
})
export class NumberCardChartComponent  implements OnInit {
  @Input() view: any;
  single: any[] = [];
  @Input('data') set setData(data: any[]) {
    this.single = data;
  }
 

  showLegend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;

  colorScheme: any = {
    domain: ['#FF5733', '#FF8C00', '#FFA500', '#FFD700', '#FF6347', '#FF4500']
  };

  constructor() {}

  ngOnInit() {}

  onSelect(event: any ) {
    console.log(event);
  }
}
