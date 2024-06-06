import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonTitle, IonToolbar, IonFabButton, IonItemDivider, IonTextarea, IonFab, IonFabList, IonCard, IonCardHeader, IonCardTitle, IonThumbnail, IonCol, IonGrid, IonRow, IonItem, IonLabel, IonList, IonSelect, IonBadge, IonInput } from '@ionic/angular/standalone';
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
  //imports: [IonicModule, CommonModule, FormsModule, RouterModule, RouterLink]
  imports: [IonicModule, CommonModule, FormsModule,IonGrid,IonCol,IonRow,IonHeader, IonFooter, IonButtons, IonButton, IonFabButton,IonItemDivider,IonTextarea,IonFabButton,IonFab,IonFabList,IonToolbar,IonTitle,IonContent,IonCard,IonCardHeader,IonCardTitle,IonBadge,IonList,IonItem,IonInput,IonSelect]

})
export class ModificarCuentaPage implements OnInit {
  usuario: any = {};

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerDatosUsuario();
  }

  /*Función para que la bbdd devuelva los datos del usuario*/
  obtenerDatosUsuario() {
    const dni = this.userService.getUsuario().dni;
    this.http.get<any>(`https://finanzify.sytes.net/actualizar_usuario.php?query=recibir&dni=${dni}`)
      .subscribe(
        data => {
          this.usuario = {
            nombre: data.NOMBRE,
            apellidos: data.APELLIDO,
            edad: data.EDAD,
            email: data.EMAIL,
            dni: data.DNI,
            contrasena: data.CONTRASENA
          };
        },
        error => {
          console.error('Error al obtener los datos del usuario:', error);
        }
      );
  }

  /* Función para modificar el usuario */
  async modificarUsuario() {
    // Verificar que los campos no estén vacíos
    if (!this.usuario.nombre || !this.usuario.nombre.trim() ||
        !this.usuario.apellidos || !this.usuario.apellidos.trim() ||
        !this.usuario.edad || !this.usuario.edad.toString().trim() ||
        !this.usuario.email || !this.usuario.email.trim() ||
        !this.usuario.dni || !this.usuario.dni.trim()) {
      this.presentarAlerta('Error', 'Todos los campos son obligatorios');
      return;
    }

    // Validar formato del email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.usuario.email)) {
      this.presentarAlerta('Error', 'El formato del email no es válido');
      return;
    }

    // Realizar la solicitud POST para modificar los datos del usuario
    try {
      const response = await this.http.post('https://finanzify.sytes.net/actualizar_usuario.php?query=modificar', {
        dni: this.usuario.dni,
        nombre: this.usuario.nombre,
        apellido: this.usuario.apellidos,
        edad: this.usuario.edad,
        email: this.usuario.email
      }).toPromise();
      this.presentarAlerta('Éxito', 'Los datos del usuario han sido modificados correctamente.');
      this.router.navigate(['/principal']);
    } catch (error) {
      console.error('Error al modificar los datos del usuario:', error);
      this.presentarAlerta('Error', 'Hubo un error al modificar los datos del usuario.');
    }
  }

  async presentarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}