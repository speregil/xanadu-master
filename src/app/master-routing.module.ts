import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrincipalComponent } from './principal.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './registro/login.component';
import { PrincipalParticipantesComponent } from './participantes/principal.participantes';
import { GroupComponent } from './grupos/grupos.component';
import { RetosComponent } from './retos/retos.component';
import { ExpansionesComponent } from './expansiones/expansiones.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'principal', component: PrincipalComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'participantes', component: PrincipalParticipantesComponent },
  { path: 'grupos', component: GroupComponent },
  { path: 'expansiones', component: ExpansionesComponent },
  { path: 'retos', component: RetosComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class MasterRoutingModule {}
