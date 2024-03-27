import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCol, IonContent, IonFab, IonFabButton, IonFabList, IonFooter, IonGrid, IonHeader, IonItemDivider, IonRow, IonTextarea, IonTitle, IonToolbar, } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-contabilidad',
  templateUrl: './contabilidad.page.html',
  styleUrls: ['./contabilidad.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
 // imports: [IonicModule, CommonModule, FormsModule,IonGrid,IonCol,IonRow,IonHeader, IonFooter, IonButtons, IonButton, IonFabButton,IonItemDivider,IonTextarea,IonFabButton,IonFab,IonFabList,IonToolbar,IonTitle,IonContent,IonCard,IonCardHeader,IonCardTitle]
})
export class ContabilidadPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
