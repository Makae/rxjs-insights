import { Observable, of } from "rxjs";

var errorsOnThree = new Observable<number>((subscriber) => {
    /**
     * NOTE: Altough it works if we do not wrap this code in a try-catch block, its much cleaner. 
     * This is, because it allows the returned "Cleanup resources" callback to be called 
     * after the error occured.
     */
    try {
        for (var i = 0; i <= 3; i++) {
            if (i === 3) {
                throw new Error("Some Error");
            }
            subscriber.next(i);
        }
    } catch (e) {
        subscriber.error(e);
    }

    return () => {
        console.log("Cleanup resources")
    };
});

errorsOnThree.subscribe({
    next: (n) => console.log("Subscriber.next() called, got: " + n),
    error: (e) => console.log("Subscriber.error() called, got: " + e),
    complete: () => console.log("Never gets called!")
});

