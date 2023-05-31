import { Message } from "../models/messages";

export const userMessages = new Map<string, Message>(
    [
        ['tony', { from: "Peter Parker", to: "Tony Stark", content: "Hello Mr. Stark" }],
        ['tony', { from: "Peter Parker", to: "Tony Stark", content: "Can I join the Avengers?" }],
        ['tony', { from: "Tony Stark", to: "Thor", content: "The kid wants to join again..." }],
        ['tony', { from: "Thor", to: "Tony Stark", content: "Don't do it..." }],
        ['tony', { from: "Tony Stark", to: "Peter Parker", content: "Hey Peter, we are currently a bit occupied. See you soon..." }],
    ]
)