
export interface NoteType {
    noteId?: string;
    content: string;
    createdAt?: string;
    attachment?: string;
    attachmentURL?: string;
}

export interface User {
    userName: string,
    isAdmin: boolean
}
