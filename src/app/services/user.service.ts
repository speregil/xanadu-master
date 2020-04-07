import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { ConfigurationService } from './configuration.service';

/**
 * Servicio para el acceso a los servicios de manejo de usarios del sistema
 */
@Injectable()
export class UserService {
  
    //---------------------------------------------------------------------------------------------
    // Atributos
    //---------------------------------------------------------------------------------------------

    host = '';                          // Copia local del host del servidor del API
    private isUserLoggedIn = false;     // Determina si hay un usuario en sesión o no

    //---------------------------------------------------------------------------------------------
    // Constructor
    //---------------------------------------------------------------------------------------------

    constructor ( private http: HttpClient, private config: ConfigurationService) {
        this.host = config.serverhost;
    }

    //---------------------------------------------------------------------------------------------
    // Servicios
    //---------------------------------------------------------------------------------------------

    /**
     * Registra a un nuevo master en el sistema
     * @param pUser username del participante
     * @param pPassword clave de la cuenta
     * @param pName Nombre a mostrar del participante
     * @return {status : 0 si la operación tuvo exito, 1 de lo contrario, mensaje : Mensaje de la operación, data : Objeto del usuario creado, null si hubo un error}
     */
    register(pUser : string, pPassword : string, pName : String){
        return this.http.post<{}>('http://' + this.host + '/register/', {user : pUser, password : pPassword, shownName : pName, admin: true});
    }

    /**
     * Registra a un nuevo participante en el sistema
     * @param pUser username del participante
     * @param pPassword clave de la cuenta
     * @param pName Nombre a mostrar del participante
     * @return {status : 0 si la operación tuvo exito, 1 de lo contrario, mensaje : Mensaje de la operación, data : Objeto del usuario creado, null si hubo un error}
     */
    registerParticipant(pUser : string, pPassword : string, pName : String){
        return this.http.post<{}>('http://' + this.host + '/register/', {user : pUser, password : pPassword, shownName : pName, admin: false});
    }

    /**
     * Cambia la contraseña del usuario que entra por parámetro
     * @param pUser Nombre del usuario
     * @param pPassword Nueva clave del usuario
     */
    changePassword(pUser: string, pPassword){
        return this.http.post<{}>('http://' + this.host + '/changepass/',{username: pUser, password: pPassword});
    }

    /**
     * Verifica el inicio de sesión de un usuario
     * @param pUser Username
     * @param pPassword Clave
     * @return {status : 0 si la operación tuvo exito, 1 de lo contrario, mensaje : Mensaje de la operación, 
     * match : si el inicio de sesion fue exitoso, userOb : Objeto del usuario en sesion, null si hubo un error o fallo el inicio}
     */
    login(pUser : string, pPassword : string){
        return this.http.post<{}>('http://' + this.host + '/login/', {user : pUser, password : pPassword, admin: true});
    }

    /**
     * Determina si hay un usuario en sesión o no
     * @return true si hay alguien en sesion, false de lo contrario
     */
    isUserLogged() {
        return this.isUserLoggedIn;
    }

    /**
     * Registra al usuario que entra por parámetro como en sesión
     * @param user Usuario en sesión
     */
    setUserLoggedIn(user:User) {
        this.isUserLoggedIn = true;
        localStorage.setItem('masterUser', JSON.stringify(user));
    }

    /**
     * Cierra la sesión de usuario actual
     */
    setUserLoggedOut() {
        this.isUserLoggedIn = false;
        localStorage.removeItem('masterUser');
    }
    
    /**
     * Retorna el objeto usuario de la sesión actual
     * @return Usuario en sesión
     */
    getUserLoggedIn() {
        return JSON.parse(localStorage.getItem('masterUser'));
    }

    /**
     * Agrega un nuevo logro al usuario que entra por parámetro
     * @param pUser Nombre del usuario
     * @param pText Texto del logro
     * @param pPoints Puntos asociados al logro
     * @return {status : 0 si la operación tuvo exito, 1 de lo contrario, mensaje : Mensaje de la operación}
     */
    setAchivement(pUser, pText, pPoints) {
        return this.http.post<{}>('http://' + this.host + '/progress/achivement', {user : pUser, text : pText, points: pPoints});
    }

    /**
     * Salva el progreso de una bandera específica al usuario que entra por parámetro
     * @param pUser Nombre del usuario
     * @param pFlag Nombre de la bandera de progreso
     * @return {status : 0 si la operación tuvo exito, 1 de lo contrario, mensaje : Mensaje de la operación}
     */
    saveProgress(pUser, pFlag) {
        return this.http.post<{}>('http://' + this.host + '/progress/save', {user : pUser, flag : pFlag});
    }
}