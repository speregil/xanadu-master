import { Component, EventEmitter, Output} from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'registro-participantes',
  templateUrl: './registro.participantes.html',
  styleUrls: ['./participantes.css']
})

/**
 * Componente que controla el registro de nuevos participantes en la sección de Participantes
 */
export class RegistroParticipantesComponent {

    //----------------------------------------------------------------------------------------------------------
    // Campos y Atributos
    //----------------------------------------------------------------------------------------------------------

    username = "";      // Campo para el nuevo nombre de usuario
    password = "";      // Campo para la clave del usuario
    confirm = "";       // Campo para la la confirmación de la clave
    shownName = "";     // Campo para el nombre a mostrar del nuevo usuario

    msn = "";           // Atributo para guardar los mensajes de estado de las operaciones

    @Output() emitter = new EventEmitter<string>();     // Emisor para comunicar el registro de un nuevo usuario al menu de participantes

    //----------------------------------------------------------------------------------------------------------
    // Constructor
    //----------------------------------------------------------------------------------------------------------

    constructor(private service: UserService){}

    //----------------------------------------------------------------------------------------------------------
    // Funciones
    //----------------------------------------------------------------------------------------------------------

    /**
     * Procedimiento para registrar un nuevo participante en el sistema
     * Comunica el estado final de la operación en el msn
     */
    register(){
        this.msn = "";
        if(this.checkFields()){
            this.service.registerParticipant(this.username, this.password, this.shownName).subscribe(data => {
                if(data['status'] > 0 )
                    this.msn = data['mensaje'];
                else
                    this.msn = "Registro Exitoso";

                this.clean();
                this.emitter.emit("registro");
            });
        }
        else
            this.msn = 'Hay campos vacios o no coinciden las claves, verifica por favor';
    }

    /**
     * Verifica que los campos no sean vacios y que la clave y la confirmación coincidan
     * return True si todos los campos son usables, False de lo contrario
     */
    checkFields(){
        return this.username != "" && this.password != "" && this.confirm != "" && this.shownName != "" && this.password == this.confirm;
    }

    /**
     * Limpia los campos del formulario
     */
    clean() {
        this.username = "";
        this.password = "";
        this.shownName = "";
        this.confirm = ""; 
    }
} 