import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from './configuration.service';

/**
 * Servicio para el acceso al API del servidor
 */
@Injectable()
export class GroupService {

    host = '';

    constructor ( private http: HttpClient, private config: ConfigurationService) {
        this.host = config.serverhost;
    }

    addGroup(group, master){
        return this.http.post('http://' + this.host + '/groups/new', {group: group, master: master});
    }

    removeGroup(group, master){
        return this.http.post('http://' + this.host + '/groups/remove', {group: group, master: master});
    }

    asign(group, user){
        return this.http.post('http://' + this.host + '/groups/asign', {groupName: group, userName: user});
    }

    unasign(group, user){
        return this.http.post('http://' + this.host + '/groups/unasign', {groupName: group, userName: user});
    }

    listGroups(masterName){
        return this.http.get('http://' + this.host + '/groups/list/' + masterName);
    }

    listParticipants(group, masterName){
        return this.http.post('http://' + this.host + '/groups/participants/', {groupname: group, master: masterName });
    }
}