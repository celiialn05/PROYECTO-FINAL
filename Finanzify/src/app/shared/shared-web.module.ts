import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, RouterLink } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    RouterLink,
  ]
})
export class SharedWebModule { }
