import { Album } from "./Album"

export interface User {
    id: string,
    username: string,
    email: string,
    collection: Album[]
}
