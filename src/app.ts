import { Message } from "./models/messages";
import { restService } from "./services/rest-service";

async function run() {
    return new Promise<void>((resolve, reject) => {
        let count = 0;
        let interval: number;
        const onNewMessages = (messages: Message[]) => {
            console.log(messages);
            count++;
            if (count >= 3) {
                clearInterval(interval);
                resolve();
            }
        }

        interval = setInterval(() => onNewMessages(restService.getMessagesOfUser('tony')), 1000);


    });
}

(async () => {
    try {
        await run();
    } catch (error) {
    }
})();