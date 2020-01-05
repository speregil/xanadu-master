import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * Servicio para el acceso al API del servidor
 */
@Injectable()
export class ParticipantsService {

    host = '34.95.158.164:3100';

    constructor ( private http: HttpClient) {}

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