import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { ConfigurationService } from './configuration.service';

/**
 * Servicio para el acceso al API del servidor
 */
@Injectable()
export class UserService {
  
    host = '';
    private isUserLoggedIn = false;

    constructor ( private http: HttpClient, private config: ConfigurationService) {
        this.host = config.serverhost;
    }

    register(pUser : string, pPassword : string, pName : String){
        return this.http.post<{}>('http://' + this.host + '/register/', {user : pUser, password : pPassword, shownName : pName, admin: true});
    }

    registerParticipant(pUser : string, pPassword : string, pName : String){
        return this.http.post<{}>('http://' + this.host + '/register/', {user : pUser, password : pPassword, shownName : pName, admin: false});
    }

    login(pUser : string, pPassword : string){
        return this.http.post<{}>('http://' + this.host + '/login/', {user : pUser, password : pPassword, admin: true});
    }

    isUserLogged() {
        return this.isUserLoggedIn;
    }

    setUserLoggedIn(user:User) {
        this.isUserLoggedIn = true;
        localStorage.setItem('masterUser', JSON.stringify(user));
    }

    setUserLoggedOut() {
        this.isUserLoggedIn = false;
        localStorage.removeItem('masterUser');
    }
    
    getUserLoggedIn() {
        return JSON.parse(localStorage.getItem('masterUser'));
    }

    setAchivement(pUser, pText, pPoints) {
        return this.http.post<{}>('http://' + this.host + '/progress/achivement', {user : pUser, text : pText, points: pPoints});
    }

    saveProgress(pUser, pFlag) {
        return this.http.post<{}>('http://' + this.host + '/progress/save', {user : pUser, flag : pFlag});
    }
}