import { Component, Host, HostListener, OnInit } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonTitle, IonToolbar,IonFabButton, IonItemDivider,IonTextarea,IonFab,IonFabList, IonCard, IonCardHeader, IonCardTitle, IonGrid, IonCol, IonRow, Platform, IonicSlides } from '@ionic/angular/standalone';
import {  IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { VerticalBarChartComponent } from '../components/vertical-bar-chart/vertical-bar-chart.component';
import { PieGridComponent } from '../components/pie-grid/pie-grid.component';
import { LegendPosition } from '@swimlane/ngx-charts';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PieChartComponent } from '../components/pie-chart/pie-chart.component';
import { TreeMapChartComponent } from '../components/treemap-chart/treemap-chart.component';
import { NumberCardChartComponent } from '../components/number-card-chart/number-card-chart.component';
import { GaugeChartComponent } from '../components/gauge-chart/gauge-chart.component';
import { GroupedVerticalChartComponent } from '../components/grouped-vertical-chart/grouped-vertical-chart.component';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
 // imports: [IonicModule, CommonModule, FormsModule,VerticalBarChartComponent,NgClass,PieGridComponent,PieChartComponent,TreeMapChartComponent,NumberCardChartComponent,GaugeChartComponent,GroupedVerticalChartComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
 imports: [IonicModule, CommonModule, FormsModule,VerticalBarChartComponent,NgClass,IonGrid,IonCol,IonRow,IonHeader, IonFooter, IonButtons, IonButton, IonFabButton,IonItemDivider,IonTextarea,IonFabButton,IonFab,IonFabList,IonToolbar,IonTitle,IonContent,IonCard,IonCardHeader,IonCardTitle,PieGridComponent,PieChartComponent,TreeMapChartComponent,NumberCardChartComponent,GaugeChartComponent,GroupedVerticalChartComponent]
})
export class DashboardPage implements OnInit {
 
  pruebas : any = [];
  nombre: string = '';
  email: string = '';
  view: any; 
  legendPosition!: LegendPosition;
  below:boolean = false;
  data2: any[] = 
    [
      {
        "name": "Germany",
        "series": [
          {
            "name": "2010",
            "value": 40632,
            "extra": {
              "code": "de"
            }
          },
          {
            "name": "2000",
            "value": 36953,
            "extra": {
              "code": "de"
            }
          },
          {
            "name": "1990",
            "value": 31476,
            "extra": {
              "code": "de"
            }
          }
        ]
      },
      {
        "name": "United States",
        "series": [
          {
            "name": "2010",
            "value": 0,
            "extra": {
              "code": "us"
            }
          },
          {
            "name": "2000",
            "value": 45986,
            "extra": {
              "code": "us"
            }
          },
          {
            "name": "1990",
            "value": 37060,
            "extra": {
              "code": "us"
            }
          }
        ]
      },
      {
        "name": "France",
        "series": [
          {
            "name": "2010",
            "value": 36745,
            "extra": {
              "code": "fr"
            }
          },
          {
            "name": "2000",
            "value": 34774,
            "extra": {
              "code": "fr"
            }
          },
          {
            "name": "1990",
            "value": 29476,
            "extra": {
              "code": "fr"
            }
          }
        ]
      },
      {
        "name": "United Kingdom",
        "series": [
          {
            "name": "2010",
            "value": 36240,
            "extra": {
              "code": "uk"
            }
          },
          {
            "name": "2000",
            "value": 32543,
            "extra": {
              "code": "uk"
            }
          },
          {
            "name": "1990",
            "value": 26424,
            "extra": {
              "code": "uk"
            }
          }
        ]
      }
    ]
  ;
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
  },
  {
    "name": "Transporte",
    "value": Math.floor(Math.random() * (10000000 - 1000000 + 1)) + 1000000
},
{
  "name": "Entretenimiento",
  "value": Math.floor(Math.random() * (10000000 - 1000000 + 1)) + 1000000
},
{
  "name": "Salud",
  "value": Math.floor(Math.random() * (10000000 - 1000000 + 1)) + 1000000
},
{
  "name": "Educación",
  "value": Math.floor(Math.random() * (10000000 - 1000000 + 1)) + 1000000
},
{
  "name": "Ropa",
  "value": Math.floor(Math.random() * (10000000 - 1000000 + 1)) + 1000000
},
{
  "name": "Tecnología",
  "value": Math.floor(Math.random() * (10000000 - 1000000 + 1)) + 1000000
},
{
  "name": "Viajes",
  "value": Math.floor(Math.random() * (10000000 - 1000000 + 1)) + 1000000
},
{
  "name": "Seguros",
  "value": Math.floor(Math.random() * (10000000 - 1000000 + 1)) + 1000000
},
{
  "name": "Impuestos",
  "value": Math.floor(Math.random() * (10000000 - 1000000 + 1)) + 1000000
},
{
  "name": "Regalos",
  "value": Math.floor(Math.random() * (10000000 - 1000000 + 1)) + 1000000
},
{
  "name": "Deudas",
  "value": Math.floor(Math.random() * (10000000 - 1000000 + 1)) + 1000000
},
{
  "name": "Inversiones",
  "value": Math.floor(Math.random() * (10000000 - 1000000 + 1)) + 1000000
},
{
  "name": "Otros",
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

  const url = 'https://finanzify.sytes.net/prueba.php';

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

  meses: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  anios: number[] = [2022, 2023, 2024]; // Puedes generar dinámicamente esta lista si es necesario
  
  mesSeleccionado: string = this.meses[new Date().getMonth()];
  anioSeleccionado: number = new Date().getFullYear();

  actualizarGrafico() {
    console.log('Mes seleccionado:', this.mesSeleccionado);
    console.log('Año seleccionado:', this.anioSeleccionado);
  }
  

}
