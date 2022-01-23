export interface AuthResponse{
    user:{
        email:string,
        username: string
    }
    token: string
}