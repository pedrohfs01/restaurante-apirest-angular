export class User {
    constructor(public email: string,
                public name: string,
                public password: string){}
                
    matches(another: User): boolean{
        return another !== undefined && 
        another.email === this.email && 
        another.password == this.password;
    }
}

export const users: {[key:string]: User} = {
    "pedro@gmail.com": new User('pedro@gmail.com', "pedro", "123"),
    "mario@gmail.com": new User('mario@gmail.com', "mario", "123")
}