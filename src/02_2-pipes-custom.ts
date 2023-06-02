import { Observable, of } from "rxjs";


/** 
 * Note: This normally is not necessary, as you can do everything provided by the default operators from RXJS
 * like: map, reduce, filter and so on
 */ 
function modulo(divisor: number) {
    return (source: Observable<number>) => {

        return new Observable<number>((subscriber) => {
            source.subscribe({
                next: (n) => subscriber.next(n % divisor),
                error: (e) => subscriber.error(e),
                complete: () => subscriber.complete()
            });

            return () => subscriber.unsubscribe();
        });
    };
}

of(1, 2, 3, 4)
    .pipe(
        modulo(2)
    ).subscribe({
        next: (n) => console.log("Subscriber.next() called, got: " + n),
        error: (e) => console.log("Subscriber.error() called, got: " + e),
        complete: () => console.log("Subscriber.complete() called")
    });