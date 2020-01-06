import { Component } from '@angular/core';
import { GroupService } from '../services/groups.service';
import { UserService } from '../services/user.service';
import { ParticipantsService } from '../services/participants.service';

@Component({
  selector: 'grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})

/**
 * Componente para manejar la creación de grupos y el registro de participantes en ellos
 */
export class GroupComponent {

    //--------------------------------------------------------------------------------------------
    // Campos y Atributos
    //--------------------------------------------------------------------------------------------

    groupName = "";                     // Campo para el nombre del nuevo grupo

    groupList = [];                     // Atributo que guarda la lista de todos los grupos en el sistema que le pertenecen al master en sesion
    participantsList = [];              // Atributo que guarda la lista de participantes del grupo actualmente seleccionado
    unasignedList = [];                 // Atributo que guarda la lista de todos los participantes sin asignar en el sistema

    selectedGroup = "";                 // Campo para el ID del grupo actualmente seleccionado
    selectedParticipant = "";           // Campo para el username del participante actualmente seleccionado

    msn = "";                           // Atributo para los mensajes de estado del registro de grupos
    msn2 = "Cargando Información";                          // Atributo para los mensajes de estado de los procesos de administracion de grupos
    msn3 = "Selecciona un grupo";       // Atributo para indicar al usuario que las listas se han cargado

    //--------------------------------------------------------------------------------------------
    // Constructor
    //--------------------------------------------------------------------------------------------

    constructor(private service: GroupService, private user: UserService, private participants: ParticipantsService){
        this.getGroups();
        this.getUnasigned();
    }

    //--------------------------------------------------------------------------------------------
    // Funciones
    //--------------------------------------------------------------------------------------------

    /**
     * Crea un nuevo grupo en base al nombre provisto en el campo correspondiente
     * Comunica el estado de la operacion en msn y actualiza los mensajes correspondientes
     */
    createGroup(){
        var master = this.user.getUserLoggedIn();
        this.msn = "";
        this.msn2 = "";
        this.msn3 = "";
        if(this.groupName != ""){
            this.service.addGroup(this.groupName, master.username).subscribe(response => {
                if(response["mensaje"])
                    this.msn = response["mensaje"];
                else
                this.msn = "Registro Exitoso";
                this.msn3 = "Selecciona un grupo";
                this.groupName = "";
                this.getGroups();
            });
        }
        else
            this.msn = "Debe darle un nombre el nuevo grupo";
    }

    /**
     * Recupera la lista de todos los grupos asociados al master en sesion actualmente
     */
    getGroups(){
        var master = this.user.getUserLoggedIn();
        this.service.listGroups(master.username).subscribe(response => {
            this.groupList = response["list"]
            if(this.selectedGroup)
                this.getParticipants();
            this.msn2 = "";
        });
    }

    /**
     * Detecta el cambio de selección de la lista de grupos para buscar de nuevo la lista de participantes
     */
    onSelectChange(){
        this.msn3 = "Cargando Lista de participantes";
        this.participantsList = [];
        this.getParticipants();
    }

    /**
     * Recupera la lista de participantes del grupo seleccionado
     * selectedGroup Campo con el ID del grupo seleccionado actualmente
     */
    getParticipants(){
        var master = this.user.getUserLoggedIn();
        this.service.listParticipants(this.selectedGroup, master.username).subscribe(response => {
            this.participantsList = response["list"]
            this.msn3 = response["mensaje"];
        });
    }

    /**
     * Recupera la lista de todos los participantes sin grupo asignado en el sistema
     */
    getUnasigned(){
        this.participants.listUnasigned().subscribe(response =>{
            this.unasignedList = response["list"]
        });
    }

    /**
     * Procedimiento para asignar el participante sin asignar seleccionado al grupo actual
     * selectedParticipant Username del participante seleccionado actual
     * selectedGroup ID del grupo seleccionado actual
     * Reporta el estado del proceso en el atributo msn2
     */
    asign(){
        if(confirm("¿Desea asignar el participante al grupo?")){
            this.msn2 = "Asignando";
            if(this.selectedGroup && this.selectedParticipant){
                this.service.asign(this.selectedGroup, this.selectedParticipant).subscribe(response =>{
                    if(response["mensaje"])
                        this.msn2 = response["mensaje"];
                    else{
                        this.msn2 = "";
                        this.onSelectChange();
                        this.getUnasigned();
                    }
                });
            }
            else {
                this.msn2 = "Selecciona un grupo y un participante sin asignar";
            }
        }
    }

    /**
     * Desasigna de su grupo actual al participante cuyo username entra por parametro
     * @param username nombre de usuario del participante a desasignar
     * Reporta el estado de la operación en el atributo msn2
     */
    unasign( username ){
        if(confirm("¿Desea eliminar al participante del grupo?")){
            this.msn2 = "Eliminando";
            if(this.selectedGroup){
                this.service.unasign(this.selectedGroup, username).subscribe(response =>{
                    if(response["mensaje"])
                        this.msn2 = response["mensaje"];
                    else{
                        this.msn2 = "";
                        this.onSelectChange();
                        this.getUnasigned();
                    }
                });
            }
            else {
                this.msn2 = "Selecciona un grupo";
            }
        }
    }

    /**
     * Elimina el grupo seleccionado actual si no tiene ningun participante asignado
     * selectedGroup ID del grupo seleccionado actual
     * Reporta el estado del proceso en msn2
     */
    removeGroup(){
        if(this.selectedGroup && confirm("¿Desea eliminar este grupo?")){
            if(this.participantsList.length > 0){
                this.msn2 = "No es posible eliminar el grupo, tiene participantes asignados";
            }
            else{
                this.msn2 = "Eliminando";
                var master = this.user.getUserLoggedIn();
                this.service.removeGroup(this.selectedGroup, master.username).subscribe(response =>{
                    if(response["mensaje"])
                        this.msn2 = response["mensaje"];
                    else{
                        this.msn2 = "";
                        this.getGroups();
                    }
                });
            }
        }
    }
} 