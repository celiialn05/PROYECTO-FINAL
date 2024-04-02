import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonTitle, IonToolbar,IonFabButton, IonItemDivider,IonTextarea,IonFab,IonFabList, IonCard, IonCardHeader, IonCardTitle, IonGrid, IonCol, IonRow } from '@ionic/angular/standalone';
import {  IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
 // imports: [IonicModule, CommonModule, FormsModule,IonGrid,IonCol,IonRow,IonHeader, IonFooter, IonButtons, IonButton, IonFabButton,IonItemDivider,IonTextarea,IonFabButton,IonFab,IonFabList,IonToolbar,IonTitle,IonContent,IonCard,IonCardHeader,IonCardTitle]
})
export class DashboardPage implements OnInit {
pruebas : any = [];
nombre: string = '';
email: string = '';

constructor(private http:HttpClient ) { }

ngOnInit() {
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

  const url = 'http://192.168.1.68:80/prueba.php';

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
