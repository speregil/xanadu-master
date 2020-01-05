export class User {
    
    username: string;
    shownName: string;
    
    constructor ( username : string, show : string) {
        this.username = username;
        this.shownName = show;
    }
}