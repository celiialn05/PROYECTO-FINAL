import { Component, Host, HostListener, OnInit } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonButtons, IonContent,IonThumbnail ,IonFooter, IonHeader,IonMenu,IonMenuButton,IonTabButton ,IonTabBar,IonTitle, IonToolbar,IonFabButton, IonItemDivider,IonTextarea,IonFab,IonFabList, IonCard, IonCardHeader, IonCardTitle, IonGrid, IonCol, IonRow, Platform, IonicSlides } from '@ionic/angular/standalone';
import {  IonicModule } from '@ionic/angular';
import { VerticalBarChartComponent } from '../components/vertical-bar-chart/vertical-bar-chart.component';
import { PieGridComponent } from '../components/pie-grid/pie-grid.component';
import { LegendPosition } from '@swimlane/ngx-charts';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PieChartComponent } from '../components/pie-chart/pie-chart.component';
import { TreeMapChartComponent } from '../components/treemap-chart/treemap-chart.component';
import { NumberCardChartComponent } from '../components/number-card-chart/number-card-chart.component';
import { GaugeChartComponent } from '../components/gauge-chart/gauge-chart.component';
import { GroupedVerticalChartComponent } from '../components/grouped-vertical-chart/grouped-vertical-chart.component';
import { UserService } from '../services/UserService';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeUrl } from '@angular/platform-browser';
import { ThemeService } from '../services/theme.service';
import { RouterLink, RouterModule } from '@angular/router';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
  standalone: true,
  //imports: [IonicModule, CommonModule, FormsModule, RouterModule]
  imports: [IonicModule, CommonModule, FormsModule, RouterModule,IonMenu,IonMenuButton, IonTabBar,IonTabButton,IonGrid,IonCol,IonRow,RouterLink,IonHeader,IonThumbnail, IonFooter, IonButtons, IonButton, IonFabButton,IonItemDivider,IonTextarea,IonFabButton,IonFab,IonFabList] //IonHeader, IonFooter, IonButtons, IonButton, IonFabButton,IonItemDivider,IonTextarea,IonFabButton,IonFab,IonFabList]
})
export class PrincipalPage implements OnInit {
  usuario: any;
  imagenUrl: SafeUrl | undefined;

  constructor(private themeService: ThemeService,private userService: UserService, private http: HttpClient, private sanitizer: DomSanitizer ,) {}

  ngOnInit() {
    this.usuario = this.userService.getUsuario();
    if (this.usuario) {
      this.loadUserImage(this.usuario.dni);
    }
  }
  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }
  loadUserImage(dni: string) {
    this.http
      .get('https://finanzify.sytes.net/principal.php', {
        params: { dni: dni },
        responseType: 'blob', // Indicamos que esperamos una respuesta de tipo blob
      })
      .subscribe(
        (blob: Blob) => {
          // Convertimos el blob a una URL de objeto y luego la convertimos en una URL segura
          const blobUrl = URL.createObjectURL(blob);
          this.imagenUrl = this.sanitizer.bypassSecurityTrustUrl(blobUrl);
        },
        (error) => {
          console.error('Error al cargar la imagen:', error);
        }
      );
  }
}
