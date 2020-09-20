import { Component } from '@angular/core';
import { ChallengesService } from '../services/challenges.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'retos',
  templateUrl: './retos.component.html',
  styleUrls: ['./retos.component.css']
})

/**
 * Componente para manejar la creación de retos del master
 */
export class RetosComponent {

    //--------------------------------------------------------------------------------------------
    // Campos y Atributos
    //--------------------------------------------------------------------------------------------

    listaRetos = [];
    tipoSeleccionado = "";
    descripcion = "";
    msn = "";
    msn2 = "";
    

    //--------------------------------------------------------------------------------------------
    // Constructor
    //--------------------------------------------------------------------------------------------

    constructor(private service: ChallengesService, private user: UserService){
      this.getRetos();
    }

    //--------------------------------------------------------------------------------------------
    // Funciones
    //--------------------------------------------------------------------------------------------

    getRetos(){
      var master = this.user.getUserLoggedIn();
      this.service.getUserChallenges(master.username).subscribe(response => {
        this.listaRetos = response["list"]
      });
    }

    crear(){
      if(this.tipoSeleccionado && this.descripcion){
        this.msn = "Creando..."
        var master = this.user.getUserLoggedIn();
        this.service.createChallenge(master.username,this.tipoSeleccionado,this.descripcion).subscribe(response => {
          this.msn = response["mensaje"];
          this.getRetos()
        });
      }
      else
        this.msn = "Los campos no deben estar vacíos"
    }

    borrar(id){
      this.msn2 = "Borrando..."
      this.service.deleteChallenge(id).subscribe(response => {
        this.msn2 = response["mensaje"];
        this.getRetos()
      });
    }

    limpiar(){
      this.tipoSeleccionado = "";
      this.descripcion = "";
      this.msn = "";
    }
}