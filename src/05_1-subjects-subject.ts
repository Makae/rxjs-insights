import { Subject } from "rxjs";


interface ApiStatus {
    type: "ApiStatus"
    status: string;
}

const websocketEventSubject = new Subject<ApiStatus>();

websocketEventSubject.subscribe({
    next: (event: ApiStatus) => console.log(`Next ${event.type}`),
    complete: () => console.log("Complete"),
    error: () => console.log("Exit"),
});

websocketEventSubject.next({type: "ApiStatus", status: "OK"});
websocketEventSubject.complete();