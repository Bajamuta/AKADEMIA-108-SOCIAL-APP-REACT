export interface Post {
    id: number,
    content: string,
    created_at: Date,
    updated_at: Date,
    likes: User[],
    user: User
}

export interface User {
    id: number,
    username: string,
    email: string,
    avatar_url: string,
    created_at: Date,
    updated_at: Date
}

export interface FormDataLogin {
    username: string,
    password: string
}

export interface ResponseLogin {
    error: boolean,
    id: number,
    jwt_token: string,
    ttl: number,
    username: string
}
