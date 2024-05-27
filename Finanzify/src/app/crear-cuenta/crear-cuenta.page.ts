import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonTitle, IonToolbar, IonFabButton, IonItemDivider, IonTextarea, IonFab, IonFabList, IonCard, IonCardHeader, IonCardTitle, IonThumbnail, IonCol, IonGrid, IonRow, IonItem, IonLabel, IonInput } from '@ionic/angular/standalone';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.page.html',
  styleUrls: ['./crear-cuenta.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule,RouterLink]
  //imports: [IonicModule, CommonModule, FormsModule, IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonTitle, IonToolbar, IonFabButton, IonItemDivider, IonTextarea, IonFab, IonFabList, IonCard, IonCardHeader, IonCardTitle, IonThumbnail, IonCol, IonGrid, IonRow, IonItem, IonLabel, IonInput]
})
export class CrearCuentaPage implements OnInit {
  
  selectedFile: File | undefined;

  constructor(private http: HttpClient, private alertController: AlertController) {}

  ngOnInit() {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onImageSelect() {
    const fileInput = document.getElementById('imageInput') as HTMLInputElement;
    fileInput.click();
  }

  async onRegister() {
    const nombre = (document.getElementById('nombre') as HTMLInputElement).value;
    const apellidos = (document.getElementById('apellidos') as HTMLInputElement).value;
    const edad = (document.getElementById('edad') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const dni = (document.getElementById('dni') as HTMLInputElement).value;
    const contrasena = (document.getElementById('contrasena') as HTMLInputElement).value;
    const repetirContrasena = (document.getElementById('repetirContrasena') as HTMLInputElement).value;

    if (contrasena !== repetirContrasena) {
      this.presentAlert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('apellidos', apellidos);
    formData.append('edad', edad);
    formData.append('email', email);
    formData.append('dni', dni);
    formData.append('contrasena', contrasena);
    if (this.selectedFile) {
      formData.append('imagen', this.selectedFile, this.selectedFile.name);
    }

    this.http.post('http://192.168.1.247/crearcuentas.php', formData)
      .subscribe(response => {
        console.log(response);
        this.presentAlert('Éxito', 'Cuenta creada exitosamente.');
      }, error => {
        console.error(error);
        this.presentAlert('Error', 'No se pudo crear la cuenta.');
      });
  }
  crearCuenta() {
    const nombre = (document.getElementById('nombre') as HTMLInputElement).value;
    const apellidos = (document.getElementById('apellidos') as HTMLInputElement).value;
    const edad = (document.getElementById('edad') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const dni = (document.getElementById('dni') as HTMLInputElement).value;
    const contrasena = (document.getElementById('contrasena') as HTMLInputElement).value;
    const repetirContrasena = (document.getElementById('repetirContrasena') as HTMLInputElement).value;

    if (contrasena !== repetirContrasena) {
      console.log('Las contraseñas no coinciden');
      return;
    }

    const formData = new FormData();
    formData.append('dni', dni);
    formData.append('contrasena', contrasena);
    formData.append('nombre', nombre);
    formData.append('apellido', apellidos);
    formData.append('edad', edad);
    formData.append('email', email);

    this.http.post('http://192.168.1.247/crearcuentas.php', formData)
      .subscribe((response) => {
        console.log(response);
        // Manejar la respuesta del servidor aquí
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
