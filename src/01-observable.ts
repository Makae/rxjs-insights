import { Observable } from "rxjs";

var oneToTen = new Observable<number>((subscriber) => {
    var unsubscribeCallback = () => {
        console.log("Cleanup resources")
    }

    for (var i = 0; i <= 10; i++) {
        subscriber.next(i);

    }
    subscriber.complete();

    // ignored, as already completed
    subscriber.next(3000);
    // ignored, as already completed
    subscriber.error();

    return unsubscribeCallback;
});

oneToTen.subscribe({
    next: (n) => console.log("Subscriber.next() called, got: " + n),
    error: (e) => console.log("Subscriber.error() called, got: " + e),
    complete: () => console.log("Subscriber.complete() called")
});