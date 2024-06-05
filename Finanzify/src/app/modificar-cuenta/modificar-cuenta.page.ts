import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonTitle, IonToolbar, IonFabButton, IonItemDivider, IonTextarea, IonFab, IonFabList, IonCard, IonCardHeader, IonCardTitle, IonThumbnail, IonCol, IonGrid, IonRow, IonItem, IonLabel,IonList,IonSelect, IonBadge,IonInput } from '@ionic/angular/standalone';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { UserService } from '../services/UserService';
import { StorageService } from '../services/StorageService';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import '@angular/compiler';

@Component({
  selector: 'app-modificar-cuenta',
  templateUrl: './modificar-cuenta.page.html',
  styleUrls: ['./modificar-cuenta.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, RouterLink]
  //imports: [IonicModule, CommonModule, FormsModule,IonGrid,IonCol,IonRow,IonHeader, IonFooter, IonButtons, IonButton, IonFabButton,IonItemDivider,IonTextarea,IonFabButton,IonFab,IonFabList,IonToolbar,IonTitle,IonContent,IonCard,IonCardHeader,IonCardTitle,IonBadge,IonList,IonItem,IonInput,IonSelect]

})
export class ModificarCuentaPage implements OnInit {

  usuario: any = {};

  constructor(private http: HttpClient, private userService: UserService) { }

  ngOnInit(): void {
    this.usuario = this.userService.getUsuario();
    this.obtenerDatosUsuario();
  }

  obtenerDatosUsuario() {
    // Realizar una solicitud GET para obtener los datos del usuario
    this.http.get<any>('http://192.168.1.247/actualizar_usuario.php?query=recibir&dni=' +this.userService.getUsuario().dni).subscribe(
      data => {
        this.usuario = data;
      },
      error => {
        console.error('Error al obtener los datos del usuario:', error);
        // Manejar el error apropiadamente
      }
    );
  }

  modificarUsuario() { //lleva dentro el usu 
    // Realizar una solicitud POST para modificar los datos del usuario
    this.http.post('http://192.168.1.247/actualizar_usuario.php?query=modificar', this.userService.getUsuario())
      .subscribe(
        (response) => {
          console.log('Datos del usuario modificados correctamente:', response);

        },
        (error) => {
          console.error('Error al modificar los datos del usuario:', error);
          // Manejar el error apropiadamente
        }
      );
  }
}