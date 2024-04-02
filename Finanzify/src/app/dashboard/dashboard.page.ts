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
  //imports: [IonicModule, CommonModule, FormsModule,IonGrid,IonCol,IonRow,IonHeader, IonFooter, IonButtons, IonButton, IonFabButton,IonItemDivider,IonTextarea,IonFabButton,IonFab,IonFabList,IonToolbar,IonTitle,IonContent,IonCard,IonCardHeader,IonCardTitle]
})
export class DashboardPage implements OnInit {
pruebas : any = [];
  constructor(private http:HttpClient ) { }

  ngOnInit() {
  }

  getPrueba(){
    this.http.get('http://localhost/prueba.php').subscribe((response) => {
    console.log(response);
    this.pruebas = response;
  });
}

}
