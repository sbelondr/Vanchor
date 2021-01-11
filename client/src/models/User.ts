export class User {
    private id: string;
    private lastname: string;
    private firstname: string;
    private mail: string;
    private accessToken: string;
    private refreshToken: string;

    constructor(id: string, lastname: string, firstname: string, mail: string, accessToken: string, refreshToken: string) {
        this.id = id;
        this.lastname = lastname;
        this.firstname = firstname;
        this.mail = mail;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

    /* id */
    getId() {
        return this.id;
    }

    setId(newId: string) {
        this.id = newId;
    }
    
    /* lastname */
    getLastname() {
        return this.lastname;
    }

    setLastname(newLastname: string) {
        this.lastname = newLastname;
    }

    /* firstname */
    getFirstname() {
        return this.firstname;
    }

    setFirstname(newFirstname: string) {
        this.firstname = newFirstname;
    }

    /* mail */
    getMail() {
        return this.mail;
    }

    setMail(newMail: string) {
        this.mail = newMail;
    }

    /* accessToken */
    getAccessToken() {
        return this.accessToken;
    }

    setAccessToken(newToken: string) {
        this.accessToken = newToken;
    }

    /* accessToken */
    getRefreshToken() {
        return this.refreshToken;
    }

    setRefreshToken(newToken: string) {
        this.refreshToken = newToken;
    }
}