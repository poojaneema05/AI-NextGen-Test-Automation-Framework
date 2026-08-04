export interface LoginUser {

    username: string;

    password: string;

}

export interface LoginData {

    validUser: LoginUser;

    invalidUser: LoginUser;

}