import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonTitle, IonToolbar,IonFabButton, IonItemDivider,IonTextarea,IonFab,IonFabList, IonCard, IonCardHeader, IonCardTitle, IonThumbnail, IonCol, IonGrid, IonRow, IonItem, IonLabel, IonInput } from '@ionic/angular/standalone';





@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.page.html',
  styleUrls: ['./crear-cuenta.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
  //imports: [IonicModule, CommonModule, FormsModule,IonItem,IonLabel,IonInput,IonGrid,IonCol,IonRow,IonThumbnail,IonHeader, IonFooter, IonButtons, IonButton, IonFabButton,IonItemDivider,IonTextarea,IonFabButton,IonFab,IonFabList,IonToolbar,IonTitle,IonContent,IonCard,IonCardHeader,IonCardTitle]

})
export class CrearCuentaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
