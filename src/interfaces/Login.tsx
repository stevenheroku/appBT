// Generated by https://quicktype.io

export interface User {
    usuario: Usuario;
    token:   string;
}

export interface Usuario {
    rol:    string;
    estado: boolean;
    google: boolean;
    nombre: string;
    correo: string;
    uid:    string;
}
// Generated by https://quicktype.io

export interface ResLogin {
    state:   number;
    data:    Datum[];
    message: string;
}

export interface Datum {
    token: string;
}