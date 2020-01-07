import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from './configuration.service';

/**
 * Servicio para el acceso a los servicios asociados con el moanejo de los grupos de participantes
 */
@Injectable()
export class GroupService {

    //----------------------------------------------------------------------------------------
    // Atributos
    //----------------------------------------------------------------------------------------

    host = '';      // Guarda localmente la dirección configurada del host del API

    //----------------------------------------------------------------------------------------
    // Constructor
    //----------------------------------------------------------------------------------------

    constructor ( private http: HttpClient, private config: ConfigurationService) {
        this.host = config.serverhost;
    }

    //-----------------------------------------------------------------------------------------
    // Servicios
    //-----------------------------------------------------------------------------------------

    /**
     * Agrega un nuevo grupo a la lista del master que entra por parámetro
     * @param group Nombre del nuevo grupo
     * @param master Nombre de usuario del master
     * @return { mensaje: Posible error de la operación, group: Objeto grupo que fue creado, null si hubo un error }
     */
    addGroup(group, master){
        return this.http.post('http://' + this.host + '/groups/new', {group: group, master: master});
    }

    /**
     * Elimina un grupo asociado al master que entra por parametro si no tiene ningún participante asignado
     * @param group Nombre del grupo que se desea eliminar
     * @param master Nombre de usuario del master
     * @return { mensaje: Si hubo un error en la operación }
     */
    removeGroup(group, master){
        return this.http.post('http://' + this.host + '/groups/remove', {group: group, master: master});
    }

    /**
     * Asigna un participante al grupo del master que entra por parámetro
     * @param group Nombre del grupo
     * @param masterName Nombre de usuario del master
     * @param user Nombre de usuario del participante a asignar
     * @return { mensaje: Si hubo un error en la operación }
     */
    asign(group, masterName, user){
        return this.http.post('http://' + this.host + '/groups/asign', {groupName: group, master: masterName, userName: user});
    }

    /**
     * Retira un participante delgrupo que entra por parámetro
     * @param group Nombre del grupo
     * @param masterName Nombre de usuario del master
     * @param user Nombre de usuario del participante a retirar
     * @return { mensaje: Si hubo un error en la operación }
     */
    unasign(group, masterName, user){
        return this.http.post('http://' + this.host + '/groups/unasign', {groupName: group, master: masterName, userName: user});
    }

    /**
     * Retorna una lista con todos los grupos asociados al master que entra por parámetro
     * @param masterName Nombre de usuario del master
     * @return { mensaje : Posible error de la operacion, list: Lista de los grupos, vacia si hubo un error o si no habia ninguno }
     */
    listGroups(masterName){
        return this.http.get('http://' + this.host + '/groups/list/' + masterName);
    }

    /**
     * Retorna una lista con todos los participantes de un grupo en particular
     * @param group Nombre del grupo
     * @param masterName Nombre de usuario del master
     * @return { mensaje : Posible error de la operacion, list: Lista de participantes, vacia si hubo un error o si no habia ninguno }
     */
    listParticipants(group, masterName){
        return this.http.post('http://' + this.host + '/groups/participants/', {groupname: group, master: masterName });
    }
}