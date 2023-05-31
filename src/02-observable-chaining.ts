import { Observable } from "rxjs";

var oneToTen = new Observable<number>((subscriber) => {
    var unsubscribeCallback = () => {
        console.log("Cleanup resources - oneToTen")
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

var onlyBelow5 = new Observable<number>((subscriber) => {

    var subscription = oneToTen.subscribe({
        next: (n) => {
            if (n < 5) {
                subscriber.next(n);
            } else {
                console.log("Filtered out:" + n);
            }

        },
        error: (e) => { subscriber.error(e) },
        complete: () => { subscriber.complete() },
    })


    var unsubscribeCallback = () => {
        subscription.unsubscribe();
        console.log("Cleanup resources - onlyBelow5");
    }

    return unsubscribeCallback;
});

onlyBelow5.subscribe({
    next: (n) => console.log("Subscriber.next() called, got: " + n),
    error: (e) => console.log("Subscriber.error() called, got: " + e),
    complete: () => console.log("Subscriber.complete() called")
});