import { filter, of } from "rxjs";

of(1, 2, 3)
    .pipe(
        filter<number>((n) => n < 3) // onlyBelow3
    ).subscribe({
        next: (n) => console.log("Subscriber.next() called, got: " + n),
        error: (e) => console.log("Subscriber.error() called, got: " + e),
        complete: () => console.log("Subscriber.complete() called")
    });