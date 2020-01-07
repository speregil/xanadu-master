import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from './configuration.service';

/**
 * Servicio para el acceso a los servicios asociados con manejar la información de participantes
 */
@Injectable()
export class ParticipantsService {
    
    //-----------------------------------------------------------------------------------------
    // Atributos
    //-----------------------------------------------------------------------------------------

    host = null;    // Copia local del host donde se encunetra el servidor del API

    //-----------------------------------------------------------------------------------------
    // Constructor
    //-----------------------------------------------------------------------------------------

    constructor ( private http: HttpClient, private config: ConfigurationService) {
        this.host = config.serverhost;
    }

    //-----------------------------------------------------------------------------------------
    // Servicios
    //-----------------------------------------------------------------------------------------

    /**
     * Retorna una lista con todos los participantes registrados en el sistema
     * @return {mensaje: Posible error de la operación, list: Lista de participantes, vacia si hubo un error}
     */
    getParticipants() {
        return this.http.get<{}>('http://' + this.host + '/participantes');
    }

    /**
     * Retorna una lista con todos los participantes en el sistema que no han sido asignados a ningún grupo
     * @return {mensaje: Posible error de la operación, list: Lista de participantes, vacia si hubo un error}
     */
    listUnasigned() {
        return this.http.get('http://' + this.host + '/unasigned');
    }

    /**
     * Elimina un usuario del sistema, siempre y cuando no tenga ningún progreso
     * @param username Nombre del usuario a eliminar
     * @return {status : 0 si la operación tubo éxito, 1 de lo contrario, mensaje : mensaje reportado por la operación}
     */
    unregisterParticipant(username) {
        return this.http.post('http://' + this.host + '/unregister', {user: username});
    }

    /**
     * Retorna una lista con todos los retos asignados al participante que entra por parámetro
     * @param username Nombre del usario
     * @return {mensaje : Posible error de la operación, list : Lista de retos, vacia si hubo un error}
     */
    getParticipantChallenges(username) {
        return this.http.get('http://' + this.host + '/challenges/list/' + username);
    }

    /**
     * Califica el reto que entra por parámetro
     * @param challenge Reto a calificar
     * @param grade Nota a registrar
     * @return {mensaje : Posible error de la operación}
     */
    gradeChallenge(challenge, grade){
        return this.http.post('http://' + this.host + '/challenges/grade', {id: challenge, points: grade});
    }

    /**
     * Agrega una nueva notificación a la lista de usuario que entra por parámetro
     * @param user Nombre del usuario
     * @param text Texto de la notificación a guardar
     * @return {mensaje : Posible error de la operación}
     */
    addNotification(user, text){
        return this.http.post('http://' + this.host + '/notifications/new', {username: user, mensaje: text});
    }
}