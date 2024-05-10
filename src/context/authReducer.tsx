import { Usuario } from "../interfaces/Usuario";


export interface AuthState{
    status:'checking' |'authenticated' |'no-authenticated';
    token:string | null,
    errorMessage:string | null;
    errorTitle:string | null;
    user: Usuario | null;  
    isLoading:boolean
}

 type AuthAction=
    |{type:'signUp',payload:{token:string,user:Usuario}}
    |{type:'addError',payload:{errorMessage:string,errorTitle:string}}
    |{type:'removeError'}    
    |{type:'notAuthenticated'}    
    |{type:'logout'}
    |{type:'signUpBiometric',payload:{huella:any}}


export const authReducer=(state:AuthState,action:AuthAction):AuthState=>{

    switch (action.type) {
        case 'addError':
           return {
            ...state,
            user:null,
            status:'no-authenticated',
            token:null,
            errorMessage: action.payload.errorMessage,
            errorTitle: action.payload.errorTitle,
           }
        case 'removeError':
            return {
                    ...state,
                    errorMessage:''
                }
        case 'signUp':
            return {
                ...state,
                errorMessage:'',
                status:'authenticated',
                token:action.payload.token,
                user:action.payload.user
            }
        case 'signUpBiometric':
            return {
                ...state,
                errorMessage:'',
                status:'authenticated',
                token:action.payload.huella,
                user:null
            }
        case 'logout':
        case 'notAuthenticated':
            return{
                ...state,
                status:'no-authenticated',
                token:null,
                user: null
            }
        default:
            return state;
    }
}