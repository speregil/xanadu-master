import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../services/user.service';
import { User } from '../services/user.model';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

/**
 * Componente para manejar la ventana de login de la aplicación master
 */
export class LoginComponent { 
  
  //------------------------------------------------------------------------------------
  // Campos y Atributos
  //------------------------------------------------------------------------------------

  username = "";      // Campo del nombre del usuario que desea ingresar
  password = "";      // Campo del password del usuario que desea ingresar

  //------------------------------------------------------------------------------------
  // Constructor
  //------------------------------------------------------------------------------------

  constructor(private service: UserService, private router: Router){ }

  //------------------------------------------------------------------------------------
  // Funciones
  //------------------------------------------------------------------------------------

  /**
   * Procedimiento para intentar el login del usuario en base a la informacion en los campos.
   * Navega al menu principal en caso de exito, alerta del fallo en caso contrario
   */
  login(){
    this.service.login(this.username, this.password).subscribe(data => {
      if(data['status'] > 0 )
        alert(data['mensaje']);
      else{
        var userModel = data["data"];
        var user : User = new User(this.username, userModel["shownName"]);        
        this.service.setUserLoggedIn(user);
        this.username = "";
        this.password = "";
        this.router.navigate(['principal']);
      }     
    });
  }
}