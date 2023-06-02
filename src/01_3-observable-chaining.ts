import { Observable, of } from "rxjs";

var oneToThree = of(1, 2, 3);

var onlyBelow3 = new Observable<number>((subscriber) => {

    const subscription = oneToThree.subscribe({
        next: (n) => {
            if (n < 3) {
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
        console.log("Cleanup resources - onlyBelow3");
    }

    return unsubscribeCallback;
});

onlyBelow3.subscribe({
    next: (n) => console.log("Subscriber.next() called, got: " + n),
    error: (e) => console.log("Subscriber.error() called, got: " + e),
    complete: () => console.log("Subscriber.complete() called")
});