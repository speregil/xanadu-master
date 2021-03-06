import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})

/**
 * Componente para controlar el menu principal de la aplicación del master
 */
export class PrincipalComponent {

  //--------------------------------------------------------------------------------
  // Campos y Atributos
  //--------------------------------------------------------------------------------

  loggedUser = null;  // Atributo que guarda el usuario que se encuentra actualmente en sesión

  //--------------------------------------------------------------------------------
  // Constructor
  //--------------------------------------------------------------------------------

  constructor(private service: UserService, private router: Router, private http: HttpClient){
    this.loggedUser = this.service.getUserLoggedIn();
  }

  //--------------------------------------------------------------------------------
  // Funciones
  //--------------------------------------------------------------------------------

  /**
   * Saca de sesión al usuario actual y navega hacia la ventana de login
   */
  onExit(){
    this.service.setUserLoggedOut()
    this.router.navigate(['']);
  }

  onInstrucciones(){
    window.open("assets/static/instrucciones.pdf", "_blank");
  }
} 