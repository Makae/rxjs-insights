import { Observable } from "rxjs";

/**
 * NOTE: We can specify our own observable
 */
var oneToThree = new Observable<number>((subscriber) => {
    for (var i = 1; i <= 3; i++) {
        subscriber.next(i);

    }
    subscriber.complete();

    // ignored, as already completed
    subscriber.next(3000);
    // ignored, as already completed
    subscriber.error();

    return () => {
        console.log("Cleanup resources")
    };
});

oneToThree.subscribe({
    next: (n) => console.log("Subscriber.next() called, got: " + n),
    error: (e) => console.log("Subscriber.error() called, got: " + e),
    complete: () => console.log("Subscriber.complete() called")
});

