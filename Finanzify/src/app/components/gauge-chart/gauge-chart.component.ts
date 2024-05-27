import { Component, OnInit,Input } from '@angular/core';
import { LegendPosition, NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-gauge-chart',
  templateUrl: './gauge-chart.component.html',
  styleUrls: ['./gauge-chart.component.scss'],
  standalone: true,
  imports: [NgxChartsModule]
})
export class GaugeChartComponent  implements OnInit {
  @Input() view: any;
  single: any[] = [];
  @Input('data') set setData(data: any[]) {
    this.single = data;
  }
 
  legendPosition: any = LegendPosition.Below;
  showLegend: boolean = true;
  showLabels: boolean = true;

  colorScheme: any = {
    domain: ['#FF5733', '#FF8C00', '#FFA500', '#FFD700', '#FF6347', '#FF4500']
  };

  constructor() {}

  ngOnInit() {}

  onSelect(event: any ) {
    console.log(event);
  }
  onActivate(event: any) {
    // Tu lógica para el evento activate
  }

  onDeactivate(event: any) {
    // Tu lógica para el evento deactivate
  }
}
