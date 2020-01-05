import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../services/user.service';
import { User } from '../services/user.model';

@Component({
  selector: 'registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

/**
 * Componente para el registro de nuevos usuarios administrativos de la aplicación
 */
export class RegistroComponent {

  //-----------------------------------------------------------------------------------------------------
  // Campos y Atributos
  //-----------------------------------------------------------------------------------------------------

  username = "";    // Campo para el nombre de usuario
  password = "";    // Campo para la clave del usuario
  confirm = "";     // Campo para la confirmación de la clase
  shownName = "";   // Campo para el nombre a mostrar del nuevo usuario

  msn = "";         // Atributo para el mensaje de respuesta de las operaciones

  //-----------------------------------------------------------------------------------------------------
  // Constructor
  //-----------------------------------------------------------------------------------------------------

  constructor(private service: UserService, private router: Router){}

  //-----------------------------------------------------------------------------------------------------
  // Funciones
  //-----------------------------------------------------------------------------------------------------

  /**
   * Procedimiento para registrar un nuevo usuario en base a la información presente en los campos
   * Registra el resultado de la operación en msn
   */
  register(){
    this.msn = "";
    if(this.checkFields()) {
      this.service.register(this.username, this.password, this.shownName).subscribe(data => {
        if(data['status'] > 0 )
          this.msn = data['mensaje'];
        else{
          this.service.login(this.username, this.password).subscribe(d => {
            var userModel = d["data"];
            var user : User = new User(this.username, userModel["shownName"]);        
            this.service.setUserLoggedIn(user);
            this.username = "";
            this.password = "";
            this.shownName = "";
            this.router.navigate(['principal']);
          });
        }
      });
    }
    else
      this.msn = "Hay campos vacíos o las claves no coinciden, verifica por favor";;
  }

  /**
   * Verifica que los campos no sean vacios y que la clave y la confirmación coincidan
   * return True si todos los campos son usables, False de lo contrario
   */
  checkFields(){
    return this.username != "" && this.password != "" && this.confirm != "" && this.shownName != "" && this.password == this.confirm;
  }

  /**
   * Navega desde el componente actual a la ventana de login principal, sin realizar ninguna acción de registro
   */
  goBack(){
    this.router.navigate(['']);
  }
 }