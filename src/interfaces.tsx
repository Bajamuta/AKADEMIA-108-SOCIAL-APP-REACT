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
