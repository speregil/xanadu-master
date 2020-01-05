import { Component } from '@angular/core';
import { GroupService } from '../services/groups.service';
import { UserService } from '../services/user.service';
import { ParticipantsService } from '../services/participants.service';

@Component({
  selector: 'expansiones',
  templateUrl: './expansiones.component.html',
  styleUrls: ['./expansiones.component.css']
})

export class ExpansionesComponent {

  groupList = [];
  participantsList = [];
  challengesList = [];

  selectedGroup = "";
  selectedParticipant = "";
  selectedGrade = 10;

  msn = 'Selecciona un grupo y un participante para ver sus desafios';
  msn2 = '';
  challengeText = '';
  challengeID = '';
  challengeType = '';
  isSelected = false;
  
  constructor(private service: GroupService, private user: UserService, private participants: ParticipantsService){
    this.getGroups();
  }

  getGroups(){
    var master = this.user.getUserLoggedIn();
    this.service.listGroups(master.username).subscribe(response => {
      this.groupList = response["list"]
      if(this.selectedGroup)
        this.getParticipants();
    });
  }

  getParticipants(){
    this.service.listParticipants(this.selectedGroup).subscribe(response => {
        this.participantsList = response["list"]
        this.msn = "";
    });
  }

  getChallenges(){
    this.msn = 'Cargando desafios...';
    this.participants.getParticipantChallenges(this.selectedParticipant).subscribe(response => {
      this.msn = '';
      if(response['mensaje'])
        this.msn = 'No hay desafios';
      else
        this.challengesList = response['list'];
    });
  }

  onSelectChange(){
    this.msn = "Cargando Lista de participantes";
    this.getParticipants();
  }

  onParticipantChange(){
    this.msn = "Cargando Lista de desafios";
    this.getChallenges();
  }

  onChallengeClick(text, id, type, points){
    this.challengeText = text;
    this.challengeID = id;
    this.challengeType = type;
    if(points <= 0 ) {
      this.selectedGrade = 10;
      this.msn2 = 'Sin Calificar';
    }
    else{
      this.selectedGrade = points;
      this.msn2 = 'Calificado';
    }
    this.isSelected = true;
  }

  onGrade(){
    this.msn = "Guardando Puntaje..";
    if(this.msn2 == 'Sin Calificar') {
      this.notifyNotGraded();
    }
    else{
      this.notifyGraded();
    }
  }

  notifyNotGraded(){
    this.participants.gradeChallenge(this.challengeID, this.selectedGrade).subscribe(response => {
      if(response['mensaje'])
        this.msn = response['mensaje'];
      else {
        this.msn = 'Notificando.';
        this.user.setAchivement(this.selectedParticipant, "Has realizado la misión del " + this.challengeType, this.selectedGrade).subscribe(response => {
          this.msn = 'Notificando...';
          if(response['status'] > 0) {
            this.msn = response['mensaje'];
          }
          else {
            this.user.saveProgress(this.selectedParticipant, this.challengeType).subscribe(response => {
              if(response["status"] == 0){
                this.msn = 'Notificando.....'; 
                this.participants.addNotification(this.selectedParticipant, "Nuevo logro obtenido").subscribe(response => {
                  this.msn = '';
                  this.msn2 = 'Calificado';
                });
              }
              else{
                this.msn = 'Cuidado, el usuario no se ha actualizado, vuelva a intentar'; 
              }
            });
          }
        });  
      }    
    });
  }

  notifyGraded(){
    this.participants.gradeChallenge(this.challengeID, this.selectedGrade).subscribe(response => {
      if(response['mensaje'])
        this.msn = response['mensaje'];
      else{
        this.participants.addNotification(this.selectedParticipant, "Un puntaje ha cambiado").subscribe(response => {
          this.msn = '';
          this.msn2 = 'Calificado';
        });
      }
    });
  }
}