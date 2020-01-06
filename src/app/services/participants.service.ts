import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from './configuration.service';

/**
 * Servicio para el acceso al API del servidor
 */
@Injectable()
export class ParticipantsService {

    host = null;

    constructor ( private http: HttpClient, private config: ConfigurationService) {
        this.host = config.serverhost;
    }

    getParticipants() {
        return this.http.get<{}>('http://' + this.host + '/participantes');
    }

    listUnasigned() {
        return this.http.get('http://' + this.host + '/unasigned');
    }

    unregisterParticipant(username) {
        return this.http.post('http://' + this.host + '/unregister', {user: username});
    }

    getParticipantChallenges(username) {
        return this.http.get('http://' + this.host + '/challenges/list/' + username);
    }

    gradeChallenge(challenge, grade){
        return this.http.post('http://' + this.host + '/challenges/grade', {id: challenge, points: grade});
    }

    addNotification(user, text){
        return this.http.post('http://' + this.host + '/notifications/new', {username: user, mensaje: text});
    }
}