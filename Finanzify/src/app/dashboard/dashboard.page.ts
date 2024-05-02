import { Component, Host, HostListener, OnInit } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonTitle, IonToolbar,IonFabButton, IonItemDivider,IonTextarea,IonFab,IonFabList, IonCard, IonCardHeader, IonCardTitle, IonGrid, IonCol, IonRow, Platform, IonicSlides } from '@ionic/angular/standalone';
import {  IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { VerticalBarChartComponent } from '../components/vertical-bar-chart/vertical-bar-chart.component';
import { PieGridComponent } from '../components/pie-grid/pie-grid.component';
import { LegendPosition } from '@swimlane/ngx-charts';
import {IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,VerticalBarChartComponent,NgClass,PieGridComponent]
  //imports: [IonicModule, CommonModule, FormsModule,VerticalBarChartComponent,NgClass,IonGrid,IonCol,IonRow,IonHeader, IonFooter, IonButtons, IonButton, IonFabButton,IonItemDivider,IonTextarea,IonFabButton,IonFab,IonFabList,IonToolbar,IonTitle,IonContent,IonCard,IonCardHeader,IonCardTitle,IonRefresher,IonRefresherContent,PieGridComponent]
})
export class DashboardPage implements OnInit {
 
  pruebas : any = [];
  nombre: string = '';
  email: string = '';
  view: any; 
  legendPosition!: LegendPosition;
  below:boolean = false;
data: any[] = [
  {
    "name": "Alimentacion",
    "value": Math.floor(Math.random() * (10000000 - 1000000 + 1)) + 1000000
  },
  {
    "name": "veterinario",
    "value": Math.floor(Math.random() * (10000000 - 1000000 + 1)) + 1000000
  },
  {
    "name": "Casa",
    "value": Math.floor(Math.random() * (10000000 - 1000000 + 1)) + 1000000
  }
];

constructor(private http:HttpClient, private platform: Platform ) { }

ngOnInit() {
  this.changeLegendPosition(false);
  this.handleScreenSizeChange();
 
}
handleRefresh(event: any) {
  // Lógica para actualizar los datos aquí
  this.generateRandomData();

  // Simular una demora de 1 segundo para el efecto visual
  setTimeout(() => {
    // Finalizar el refresco
    event.target.complete();
  }, 1000);
}

generateRandomData() {
  // Generar los números aleatorios para actualizar los datos
  this.data = [
    {
      "name": "Alimentacion",
      "value": Math.floor(Math.random() * (10000000 - 1000000 + 1)) + 1000000
    },
    {
      "name": "veterinario",
      "value": Math.floor(Math.random() * (10000000 - 1000000 + 1)) + 1000000
    },
    {
      "name": "Casa",
      "value": Math.floor(Math.random() * (10000000 - 1000000 + 1)) + 1000000
    }
  ];
}


@HostListener('window:resize', ['$event'])
onResize(event: any) {
 this.handleScreenSizeChange();
}
handleScreenSizeChange() {
  const width = this.platform.width();
  const height = this.platform.height();
  console.log('Width:', width, 'Height:', height);
  if(width>height){
      this.view = [0.679 * width,0.379 *  height];
  }
  else{
      this.view = [0.6795 * width,0.3795 *  height];
  }
}
changeLegendPosition(defaultValue = true) {
  this.legendPosition = defaultValue ? LegendPosition.Right : LegendPosition.Below;
  this.below = !defaultValue;
  
}

insertarDatos() {
  // Datos para insertar
  const datos = {
    nombre: this.nombre,
    email: this.email
    
  };
  if (!this.nombre || !this.email) {
    console.error('Error: Datos de nombre y/o correo no especificados.');
    return;
  }

  const url = 'http://localhost/prueba.php';

    // Realizar la solicitud POST para insertar datos
    this.http.post(url, datos)
      .subscribe((respuesta) => {
        console.log('Inserción exitosa:', respuesta);
        // Aquí puedes agregar cualquier otra lógica que desees después de la inserción exitosa
      }, (error) => {
        console.error('Error al insertar datos:', error);
        // Aquí puedes manejar el error de manera adecuada
      });
  }


}
