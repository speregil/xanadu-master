import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from './configuration.service';

/**
 * Servicio para el acceso a los servicios asociados con manejar la información de participantes
 */
@Injectable()
export class ChallengesService {
    
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
     * Obtiene la lista de todos los master challenges creados por el usuario
     * @param username Nombre del usuario
     * @return {mensaje: si hubo un error en la aplicación, list: lista de todos los retos}
     */
    getUserChallenges(username){
        return this.http.get<{}>('http://' + this.host + '/challenges/master/created/' + username);
    }

    /**
     * Crea un nuevo reto asociado al usuario
     * @param username Nombre del usuario
     * @param nType Tipo del nuevo reto
     * @param nText Descripción del nuevo texto
     */
    createChallenge(username, nType, nText){
        return this.http.post('http://' + this.host + '/challenges/create', {master: username, type: nType, text: nText});
    }

    /**
     * Elimina el reto identificado
     * @param id Identificación única del reto
     */
    deleteChallenge(id){
        return this.http.post('http://' + this.host + '/challenges/delete', {challengeID: id});
    }
}