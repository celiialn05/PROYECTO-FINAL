import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonTitle, IonToolbar, IonFabButton, IonItemDivider, IonTextarea, IonFab, IonFabList, IonCard, IonCardHeader, IonCardTitle, IonThumbnail, IonCol, IonGrid, IonRow, IonItem, IonLabel, IonInput } from '@ionic/angular/standalone';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.page.html',
  styleUrls: ['./crear-cuenta.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, RouterLink]
  //imports: [IonicModule, CommonModule, FormsModule, IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonTitle, IonToolbar, IonFabButton, IonItemDivider, IonTextarea, IonFab, IonFabList, IonCard, IonCardHeader, IonCardTitle, IonThumbnail, IonCol, IonGrid, IonRow, IonItem, IonLabel, IonInput]
})
export class CrearCuentaPage implements OnInit {

  selectedFile: File | undefined;
  imagenSeleccionada: string = '';
  constructor(private http: HttpClient, private alertController: AlertController, private router: Router) { }

  ngOnInit() { }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.imagenSeleccionada = reader.result as string;
    };

    reader.readAsDataURL(file);
  }
  onImageSelect() {
    const fileInput = document.getElementById('imageInput') as HTMLInputElement;
    fileInput.click();
  }

  validarContrasena(contrasena: string): boolean {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return regex.test(contrasena);
  }

  // Método para validar el formato del DNI
  validarDNI(dni: string): boolean {
    const regex = /^\d{8}[a-zA-Z]$/;
    return regex.test(dni);
  }

  // Método para validar el formato del email
  validarEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
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

    // Obtener el archivo seleccionado
    const fileInput = document.getElementById('imageInput') as HTMLInputElement;
    const imagen = fileInput.files ? fileInput.files[0] : null;

    if (imagen) {
      formData.append('imagen', imagen);
    }

    this.http.post('http://192.168.1.247/crearcuentas.php', formData)
      .subscribe((response) => {
        console.log(response);
        this.presentAlert('Éxito', 'Cuenta creada exitosamente.');
        // Redireccionar al usuario a la página de inicio de sesión
        this.router.navigate(['/login']);
      }, (error) => {
        console.error(error);
        this.presentAlert('Error', 'No se pudo crear la cuenta.');
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
