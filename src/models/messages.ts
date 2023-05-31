export interface UserMessages {
    id: string;
    messages: Message[];
}

export interface Message {
    from: string;
    to: string;
    content: string;
}
