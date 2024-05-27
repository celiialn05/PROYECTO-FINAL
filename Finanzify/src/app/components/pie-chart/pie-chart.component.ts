import { Component, Input, OnInit } from '@angular/core';
import {  NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LegendPosition } from '@swimlane/ngx-charts';



@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
  standalone: true,
  imports: [NgxChartsModule]
})

export class PieChartComponent implements OnInit {
  showLegend: boolean = true;
  showLabels: boolean = false;
  @Input() view: any;
  @Input() legendPosition: any = LegendPosition.Below;
  single: any[] = [];
  @Input('data') set setData(data: any[]) {
    this.single = data;
  }
  animations: boolean = true;
  @Input() gradient: boolean = true;  // Add this line
  @Input() isDoughnut: boolean = false;  // Add this line

  colorScheme: any = {
    domain: ['#FF5733', '#FF8C00', '#FFA500', '#FFD700', '#FF6347', '#FF4500']
  };

  constructor() { }

  ngOnInit() {
    console.log('View:', this.view);
  }

  onSelect(event: any) {
    console.log(event);
  }

  onActivate(event: any) {
    console.log('Activate:', event);
  }

  onDeactivate(event: any) {
    console.log('Deactivate:', event);
  }
}
