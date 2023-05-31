import { Message } from "../models/messages";

export class RestService {

    public getMessagesOfUser(userId: string): Message[] {
        return [
            { from: "Peter Parker", to: "Tony Stark", content: "Hello Mr. Stark" },
            { from: "Peter Parker", to: "Tony Stark", content: "Can I join the Avengers?" },
            { from: "Tony Stark", to: "Thor", content: "The kid wants to join again..." },
            { from: "Thor", to: "Tony Stark", content: "Don't do it..." },
            { from: "Tony Stark", to: "Peter Parker", content: "Hey Peter, we are currently a bit occupied. See you soon..." },
        ]
    }
}

export const restService = new RestService();