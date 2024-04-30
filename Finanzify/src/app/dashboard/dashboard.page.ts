import { Component, Host, HostListener, OnInit } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonTitle, IonToolbar,IonFabButton, IonItemDivider,IonTextarea,IonFab,IonFabList, IonCard, IonCardHeader, IonCardTitle, IonGrid, IonCol, IonRow, Platform } from '@ionic/angular/standalone';
import {  IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { VerticalBarChartComponent } from '../components/vertical-bar-chart/vertical-bar-chart.component';
import { LegendPosition } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,VerticalBarChartComponent,NgClass]
  //imports: [IonicModule, CommonModule, FormsModule,VerticalBarChartComponent,NgClass,IonGrid,IonCol,IonRow,IonHeader, IonFooter, IonButtons, IonButton, IonFabButton,IonItemDivider,IonTextarea,IonFabButton,IonFab,IonFabList,IonToolbar,IonTitle,IonContent,IonCard,IonCardHeader,IonCardTitle]
})
export class DashboardPage implements OnInit {
pruebas : any = [];
nombre: string = '';
email: string = '';
view: any; 
legendPosition!: LegendPosition;
below:boolean = false;
constructor(private http:HttpClient, private platform: Platform ) { }

ngOnInit() {
  this.changeLegendPosition(false);
  this.handleScreenSizeChange();
}
data: any[] = [
  {
    "name": "Alimentacion",
    "value": 8940000
  },
  {
    "name": "veterinario",
    "value": 5000000
  },
  {
    "name": "Casa",
    "value": 7200000
  }
];


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
