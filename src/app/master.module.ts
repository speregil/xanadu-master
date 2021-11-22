import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MasterRoutingModule } from './master-routing.module';

import { UserService } from './services/user.service';
import { ParticipantsService } from './services/participants.service';
import { GroupService } from './services/groups.service';
import { ChallengesService } from './services/challenges.service';
import { ConfigurationService } from './services/configuration.service';

import { MasterComponent } from './master.component';
import { PrincipalComponent } from './principal.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './registro/login.component';
import { PrincipalParticipantesComponent } from './participantes/principal.participantes';
import { RegistroParticipantesComponent } from './participantes/registro.participantes';
import { ListaParticipantesComponent } from './participantes/lista.participantes';
import { GroupComponent } from './grupos/grupos.component';
import { ExpansionesComponent } from './expansiones/expansiones.component';
import { RetosComponent } from './retos/retos.component';

@NgModule({
  declarations: [
    MasterComponent,
    PrincipalComponent,
    RegistroComponent,
    LoginComponent,
    PrincipalParticipantesComponent,
    RegistroParticipantesComponent,
    ListaParticipantesComponent,
    GroupComponent,
    ExpansionesComponent,
    RetosComponent 
  ],
  imports: [
    BrowserModule,
    MasterRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    UserService,
    ParticipantsService,
    GroupService,
    ChallengesService,
    ConfigurationService
  ],
  bootstrap: [ MasterComponent ]
})

export class MasterModule { }
