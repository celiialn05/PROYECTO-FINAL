import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBadge, IonButton, IonButtons, IonCard, IonCardHeader, LoadingController, AlertController, IonCardTitle, IonCol, IonContent, IonFab, IonFabButton, IonFabList, IonFooter, IonGrid, IonHeader, IonInput, IonItem, IonItemDivider, IonList, IonRow, IonSelect, IonTextarea, IonTitle, IonToolbar, } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../services/UserService';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contabilidad',
  templateUrl: './contabilidad.page.html',
  styleUrls: ['./contabilidad.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
   //imports: [IonicModule, CommonModule, FormsModule,IonGrid,IonCol,IonRow,IonHeader, IonFooter, IonButtons, IonButton, IonFabButton,IonItemDivider,IonTextarea,IonFabButton,IonFab,IonFabList,IonToolbar,IonTitle,IonContent,IonCard,IonCardHeader,IonCardTitle,IonBadge,IonList,IonItem,IonInput,IonSelect]
})
export class ContabilidadPage implements OnInit {
  //Declaraciones necesarias

  usuario: any;
  categorias: any[] = [];
  montos: any[] = [];
  selectedCategoria: string = '';
  cantidad: number = 0;
  imagenUrl: SafeUrl | undefined;
  isToastOpen = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private loadingCtrl: LoadingController,
    private alertController: AlertController
  ) { }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
  ngOnInit() {
    this.usuario = this.userService.getUsuario();
    this.obtenerCategorias();
    this.obtenerMontos();
  }

  // Petición para devolver las categorías
  obtenerCategorias() {
    this.http.get<any[]>("http://192.168.1.247/categorias.php?query=categorias").subscribe(
      (response) => {
        this.categorias = response; // Asignar las categorías obtenidas al array
        console.log('Categorías:', this.categorias);
      },
      (error) => {
        console.error('Error al obtener las categorías:', error);
      }
    );
  }

  // Petición para devolver los montos
  async obtenerMontos() {
    await this.showLoading()
    this.http.get<any[]>(`http://192.168.1.247/categorias.php?query=montos&dni=${this.usuario.dni}`).subscribe(
      (response) => {
        this.montos = response; // Asignar los montos obtenidos al array
        console.log('Montos:', this.montos);
        this.loadingCtrl.dismiss();
      },
      (error) => {
        console.error('Error al obtener los montos:', error);
      }
    );
  }

  // Petición para insertar un registro
  async insertRegistro() {

    // Verificar si se ha seleccionado una categoría
    if (!this.selectedCategoria) {
      this.presentAlert('Error', 'Por favor, seleccione una categoría.');
      return;
    }

    // Verificar si la cantidad es un número válido
    if (isNaN(this.cantidad) || this.cantidad <= 0) {
      this.presentAlert('Error', 'Por favor, ingrese una cantidad válida.');
      return;
    }

    const body = { categoria: this.selectedCategoria, dni: this.usuario.dni, cantidad: this.cantidad };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get<any>('http://192.168.1.247/insertar.php', { params: body }).subscribe(
      async (response) => {
        console.log('Respuesta del servidor:', response);
        if (response && response.message === 'Registro insertado correctamente') {
          await this.obtenerMontos();
          this.presentAlert('Éxito', 'El registro se insertó correctamente.');

        } else {
          this.presentAlert('Error', 'Hubo un problema al insertar el registro.');
        }
      },
      (error) => {
        console.error('Error al insertar el registro:', error);
        this.presentAlert('Error', 'Hubo un problema al insertar el registro.');
      }
    );
  }
  async presentAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }


  getIconName(categoria: string): string {
    switch (categoria) {
      case 'Vivienda':
        return 'home-outline';
      case 'Transporte':
        return 'car-outline';
      case 'Alimentación':
        return 'restaurant-outline';
      case 'Salud y Bienestar':
        return 'medkit-outline';
      case 'Entretenimiento y Ocio':
        return 'game-controller-outline';
      case 'Imprevistos':
        return 'alert-circle-outline';
      case 'Ahorros e Inversiones':
        return 'wallet-outline';
      case 'Subscripciones y Servicios':
        return 'pricetag-outline';
      case 'Salario Mensual':
        return 'cash-outline';
      case 'Otros':
        return 'ellipsis-horizontal-outline';
      default:
        return 'pricetags-outline';
    }
  }

  // Función para obtener el color del badge basado en la categoría
  getBadgeColor(categoria: string): string {
    if (categoria === 'Ahorros e Inversiones' || categoria === 'Salario Mensual') {
      return 'success';
    } else {
      return 'danger';
    }
  }

  //Ventana de carga
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      spinner: 'bubbles',
      message: 'Cargando datos...',
      translucent: true,
    });

    await loading.present();
  }

}
