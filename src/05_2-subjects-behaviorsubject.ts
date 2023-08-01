import { BehaviorSubject, Subject, distinctUntilChanged } from "rxjs";


// NOTE: You need an initial value, but you could also define <boolean | undefined> as type if you do not know at instantiation time.
const userLoggedInSubject = new BehaviorSubject<boolean>(false);

userLoggedInSubject.pipe(
    // Ensure we only emit values, when they changed
    distinctUntilChanged()
).subscribe({
    next: (event: boolean) => console.log(`Is Logged In: ${event}`),
});
// As you will see it will log the initial  / current value immediately, the first subscription
console.log("userLoggedInSubject did subscribe");


// Gets filtered out by distinctUntilChanged
userLoggedInSubject.next(false);
userLoggedInSubject.next(true);

console.log("Outside state: " + userLoggedInSubject.getValue());