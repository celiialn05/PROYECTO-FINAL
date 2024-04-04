import { Component, Input, OnInit } from '@angular/core';
import { LegendPosition, NgxChartsModule } from '@swimlane/ngx-charts';

@Component({ // para hacer mas componentes ionic g c components/vertical-bar-chart 
  selector: 'app-vertical-bar-chart',
  templateUrl: './vertical-bar-chart.component.html',
  styleUrls: ['./vertical-bar-chart.component.scss'],
  standalone: true,
  imports: [NgxChartsModule]
})
export class VerticalBarChartComponent  implements OnInit {
// options
showXAxis = true;
showYAxis = true;
gradient = true;
showLegend = true;
showXAxisLabel = true;
xAxisLabel = 'Ejemplo barras verticales';
showYAxisLabel = true;
yAxisLabel = 'Euros';
@Input() view: any;
@Input() legendPosition: any = LegendPosition.Below;
colorScheme: any = {
  domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
};
single: any[] = [];
  constructor() { }

  ngOnInit() {
    this.single = [
      {
        "name": "Germany",
        "value": 8940000
      },
      {
        "name": "USA",
        "value": 5000000
      },
      {
        "name": "France",
        "value": 7200000
      }
    ];
  }
  onSelect(event: any ) {
    console.log(event);
  }
}
