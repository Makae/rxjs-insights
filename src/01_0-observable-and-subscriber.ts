import {  Subscriber, of } from "rxjs";

const myObservable = of(1, 2, 3);
const mySubscriber = {
    next: (n) => console.log("Subscriber.next() called, got: " + n),
    error: (e) => console.log("Subscriber.error() called, got: " + e),
    complete: () => console.log("Subscriber.complete() called")
} as Subscriber<number>;



myObservable.subscribe(mySubscriber);


// NOTE: Or inlined
of(1, 2, 3).subscribe({
    next: (n) => console.log("Subscriber.next() called, got: " + n),
    error: (e) => console.log("Subscriber.error() called, got: " + e),
    complete: () => console.log("Subscriber.complete() called")
} as Subscriber<number>);