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

  participantes = new Array();    // Lista actual de participantes en el sistema
  mensaje = "Cargando la lista";  // Mensaje del estado actual del componente

  //-------------------------------------------------------------------------
  // Constructor
  //-------------------------------------------------------------------------

  constructor(private service: ParticipantsService){
    this.getParticipantes();
  }

  //-------------------------------------------------------------------------
  // Funciones
  //-------------------------------------------------------------------------

  /**
   * Obtiene la lista completa de participantes registrados en el sistema
   */
  getParticipantes() {
    this.service.getParticipants().subscribe(data => {
      this.participantes = data["list"];
      this.mensaje = data['mensaje'];
    });
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