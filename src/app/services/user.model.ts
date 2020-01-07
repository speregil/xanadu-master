/**
 * Modelo local de un usuario del sistema
 */
export class User {
    
    //----------------------------------------------------------------------
    // Atributos
    //----------------------------------------------------------------------

    username: string;       // Identificador del usuario
    shownName: string;      // Nombre a mostrar del usuario
    
    //----------------------------------------------------------------------
    // Constructor
    //----------------------------------------------------------------------

    constructor ( username : string, show : string) {
        this.username = username;
        this.shownName = show;
    }
}