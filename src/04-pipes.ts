import { Observable, filter, of } from "rxjs";

const oneToTen = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

const onlyBelow5 = filter<number>((n) => n < 5);

oneToTen.pipe(
    onlyBelow5
).subscribe({
    next: (n) => console.log("Subscriber.next() called, got: " + n),
    error: (e) => console.log("Subscriber.error() called, got: " + e),
    complete: () => console.log("Subscriber.complete() called")
});