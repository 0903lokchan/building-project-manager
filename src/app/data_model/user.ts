export interface User {
    LoginName: string;
    Password: string;
    UserType: string;
}

export interface UserResponse {
    users: User[]
}