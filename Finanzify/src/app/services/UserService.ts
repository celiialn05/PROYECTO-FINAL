import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private usuario: Usuario = {
     dni: ''
    };
  constructor() { }

  // Método para establecer el usuario
  setUsuario(usuario: Usuario) {
    this.usuario = usuario;
  }

  // Método para obtener el usuario
  getUsuario(): Usuario {
    return this.usuario;
  }
}

interface Usuario {
  dni: string;

}
