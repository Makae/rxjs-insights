import { Observable, of } from "rxjs";

var oneToTen = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

var onlyBelow5 = new Observable<number>((subscriber) => {

    const subscription = oneToTen.subscribe({
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


    const unsubscribeCallback = () => {
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