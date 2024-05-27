import { Component, Input, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-treemap-chart',
  templateUrl: './treemap-chart.component.html',
  styleUrls: ['./treemap-chart.component.scss'],
  standalone: true,
  imports: [NgxChartsModule]
})
export class TreeMapChartComponent  implements OnInit {
 // options
 gradient = true;
 animations = true;
 @Input() view: any;
 @Input() legendPosition: any = 'below';
 single: any[] = [];
 @Input('data') set setData(data: any[]) {
   this.single = data;
 }

 colorScheme: any = {
   domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
 };

 constructor() { }

 ngOnInit() { }

 onSelect(event: any) {
   console.log(event);
 }

 labelFormatting(c: any): string {
   return `${(c.label)}`;
 }
}