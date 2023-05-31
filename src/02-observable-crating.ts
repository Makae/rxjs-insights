import {  of } from "rxjs";

var oneToTen = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

oneToTen.subscribe({
    next: (n) => console.log("Subscriber.next() called, got: " + n),
    error: (e) => console.log("Subscriber.error() called, got: " + e),
    complete: () => console.log("Subscriber.complete() called")
});