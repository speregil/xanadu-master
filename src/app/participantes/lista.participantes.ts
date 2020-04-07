import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ParticipantsService } from '../services/participants.service';
import { User } from '../services/user.model';
import { UserService } from '../services/user.service';

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
    change:string = "";
    nPassword:string = "";

  //------------------------------------------------------------------------------------------
  // Constructor
  //------------------------------------------------------------------------------------------

    constructor(private service: ParticipantsService, private user: UserService){}

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

  /**
   * Muestra los campos de cambio de contraseña del usuario seleccionado
   * @param userID Nmbre del usuario del que se desea activar los campos
   */
  activePassword(userID){
    this.change = userID;
    this.nPassword = "";
  }

  changePassword(user){
    if(confirm('¿Desea cambiar la contraseña de este usuario?')){
      if(this.nPassword){
        this.user.changePassword(user, this.nPassword).subscribe(data => {
        this.nPassword = ""
        if(data["mensaje"])
          alert(data["mensaje"]);
        else
          alert("Cambio de clave exitoso");
        });
      }
      else
        alert("Introduzca una clave válida");
    }
  }
} 