import { Component } from '@angular/core';
import { ParticipantsService } from '../services/participants.service';

@Component({
  selector: 'principal-participantes',
  templateUrl: './principal.participantes.html',
  styleUrls: ['./participantes.css']
})

/**
 * Componente que coordina el registro y la lista de participantes
 */
export class PrincipalParticipantesComponent {

  //-------------------------------------------------------------------------
  // Campos y Atributos
  //-------------------------------------------------------------------------

  participantes = new Array();       // Lista actual de participantes en el sistema
  mensaje = "";                      // Mensaje del estado actual del componente
  mostrando = false;                 // Determina si se está mostrando la lista de participantes o no

  //-------------------------------------------------------------------------
  // Constructor
  //-------------------------------------------------------------------------

  constructor(private service: ParticipantsService){}

  //-------------------------------------------------------------------------
  // Funciones
  //-------------------------------------------------------------------------

  /**
   * Obtiene la lista completa de participantes registrados en el sistema
   */
  getParticipantes() {
    this.service.getParticipants().subscribe(data => {
      this.mensaje = data['mensaje'];
      this.participantes = data["list"];
      this.mostrando = true;
    });
  }

  /**
   * Limpia la lista actual de participantes que se está mostrando
   */
  hideParticipantes() {
    this.participantes = [];
    this.mostrando = false;
  }

  /**
   * Si recibe una emision del componente de registro, vuelve a pedir la lista de participantes
   * @param mensaje Mensaje de emision recibido
   */
  emision(mensaje){
    if(mensaje) {
      this.getParticipantes();
    }
  }
} 