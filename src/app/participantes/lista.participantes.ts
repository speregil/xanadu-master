import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ParticipantsService } from '../services/participants.service';
import { User } from '../services/user.model';

@Component({
  selector: 'lista-participantes',
  templateUrl: './lista.participantes.html',
  styleUrls: ['./participantes.css']
})

/**
 * Componente para manejar la lista de participantes actuales y para eliminarlos
 */
export class ListaParticipantesComponent {

  //------------------------------------------------------------------------------------------
  // Campos y Atributos
  //------------------------------------------------------------------------------------------

    @Input() participantes : Array<User>;             // Atributo injectado de la lista de participantes actual en el sistema
    @Input() msn: String;                             // Atributo injectado del mensaje del resultado de la operación actual
    @Output() emitter = new EventEmitter<string>();   // Atributo para emitir el resultado de la operación actual

  //------------------------------------------------------------------------------------------
  // Constructor
  //------------------------------------------------------------------------------------------

    constructor(private service: ParticipantsService){}

  //------------------------------------------------------------------------------------------
  // Funciones
  //------------------------------------------------------------------------------------------

  /**
   * Elimina del sistema al usuario cuyo username entra por parámetro, si no ha iniciado ninguna experiencia aún
   * @param username Nombre de usuario a eliminar. Se recupera de la lista de usuarios
   * Alerta el resultado de la operación, fallida o exitosa
   */
  unregister(username){
    if(confirm('Desea eliminar este usuario')){
      this.service.unregisterParticipant(username).subscribe(data => {
      if(data["mensaje"])
        alert(data["mensaje"]);
        this.emitter.emit("delete");
      });
    }
  }
} 