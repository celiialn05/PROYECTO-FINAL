import { Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  // Método público para activar el modo oscuro
  enableDarkMode() {
    this.document.body.classList.add('dark-theme'); // Agrega una clase CSS para activar el modo oscuro
    this.document.body.classList.remove('white-theme');  // Agrega una clase CSS para activar el modo oscuro
  }

  // Método público para desactivar el modo oscuro
  disableDarkMode() {
    this.document.body.classList.add('white-theme'); // Agrega una clase CSS para activar el tema claro
    this.document.body.classList.remove('dark-theme');
  }
}
