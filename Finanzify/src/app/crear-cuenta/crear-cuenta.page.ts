import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonTitle, IonToolbar, IonFabButton, IonItemDivider, IonTextarea, IonFab, IonFabList, IonCard, IonCardHeader, IonCardTitle, IonThumbnail, IonCol, IonGrid, IonRow, IonItem, IonLabel, IonInput } from '@ionic/angular/standalone';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { UserService } from '../services/UserService';


@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.page.html',
  styleUrls: ['./crear-cuenta.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, RouterLink]
  //imports: [IonicModule, CommonModule, FormsModule, IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonTitle, IonToolbar, IonFabButton, IonItemDivider, IonTextarea, IonFab, IonFabList, IonCard, IonCardHeader, IonCardTitle, IonThumbnail, IonCol, IonGrid, IonRow, IonItem, IonLabel, IonInput]
})

export class CrearCuentaPage implements OnInit {

  selectedFile: File | null = null;
  imagenSeleccionada: string = 'assets/logo-prototipo.png';  // Imagen por defecto

  constructor(
    private http: HttpClient,
    private UserService: UserService,
    private alertController: AlertController,
    private router: Router) { }

  ngOnInit() { }


  /* Métodos para subir una imagen de perfil del usuario simplemente quedaría tratarla desde el lado servidor */
  /*
  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file && file.type.match('image.*')) {
      this.selectedFile = file;
      const reader = new FileReader();

      reader.onload = () => {
        this.imagenSeleccionada = reader.result as string;
      };

      reader.readAsDataURL(file);
    } else {
      console.log('El archivo seleccionado no es una imagen.');
      this.presentAlert('ERROR', 'Por favor, selecciona un archivo de imagen.');
    }
  }

  onImageSelect() {
    const fileInput = document.getElementById('imageInput') as HTMLInputElement;
    fileInput.click();
  }
  */

  //Validaciones para que tengan un formato concreto 
  validarDNI(dni: string): boolean {
    const dniRegex = /^\d{8}[a-zA-Z]$/;
    return dniRegex.test(dni);
  }

  validarEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  async Registro() {
    const nombre = (document.getElementById('nombre') as HTMLInputElement).value;
    const apellidos = (document.getElementById('apellidos') as HTMLInputElement).value;
    const edad = (document.getElementById('edad') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const dni = (document.getElementById('dni') as HTMLInputElement).value;
    const contrasena = (document.getElementById('contrasena') as HTMLInputElement).value;
    const repetirContrasena = (document.getElementById('repetirContrasena') as HTMLInputElement).value;

    if (nombre === '' || apellidos === '' || edad === '' || email === '' || dni === '' || contrasena === '' || repetirContrasena === '') {
      this.presentAlert('Error', 'No puede haber campos vacíos.');
      return;
    }

    if (!this.validarEmail(email)) {
      this.presentAlert('Error', 'El correo electrónico no es válido.');
      (document.getElementById('email') as HTMLInputElement).value = '';
      return;
    }

    if (!this.validarDNI(dni)) {
      this.presentAlert('Error', 'El DNI no es válido.');
      (document.getElementById('dni') as HTMLInputElement).value = '';
      return;
    }

    if (contrasena !== repetirContrasena) {
      this.presentAlert('Error', 'Las contraseñas no coinciden.');
      (document.getElementById('contrasena') as HTMLInputElement).value = '';
      (document.getElementById('repetirContrasena') as HTMLInputElement).value = '';
      return;
    }

    const formData = new FormData();
    formData.append('dni', dni);
    formData.append('contrasena', contrasena);
    formData.append('nombre', nombre);
    formData.append('apellido', apellidos);
    formData.append('edad', edad);
    formData.append('email', email);

    /**
     *  La base de datos se queda preparada para que si en un futuro se desea subir una imagen de perfil del usuario, se pueda hacer.
     *  Por ahora, se subirá una imagen por defecto. 
     *  Dejo comentados los métodos para subir una imagen por si se desea implementar en un futuro.
     */
    const defaultImage = 'assets/logo-prototipo.png';
    const response = await fetch(defaultImage);
    const blob = await response.blob();
    const defaultImageFile = new File([blob], 'default_image.png', { type: 'image/png' });
    formData.append('imagen', defaultImageFile);

    this.http.post('http://192.168.1.247/crearcuentas.php', formData)
      .subscribe(response => {
        console.log(response);
        this.presentAlert('Éxito', 'Cuenta creada exitosamente.');
        const usuario = {
          dni: (document.getElementById('dni') as HTMLInputElement).value
        };
        this.UserService.setUsuario(usuario);
        this.router.navigate(['/preguntas-seguridad']);
      }, error => {
        console.error(error);
        this.presentAlert('Error', 'Ya existe ese DNI en la base de datos.');
      });
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
}