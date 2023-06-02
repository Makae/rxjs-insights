import { Observable, concatMap, delay, filter, map, of, switchMap, tap, timeout, timer } from "rxjs";
import { AuthService } from "./services/auth-service";
import { UserData, UserDataService } from "./services/userdata-service";

/**
 * NOTE:
 * When working with streams of data we often want automatically fetch additional data
 * This is often done by subscribing to another observable when the next() is triggered.
 */

const words = [
    "Hel",
    "Hello",
    "Helsinki",
    "Hell",
    "Helten",
    "Helstadt",
    "Helsfels"
]

const filterWords = (search: string) => words.filter((word) => word.indexOf(search) === 0);

const fastRequest = function (search: string) {
    return timer(45).pipe(
        map(() => filterWords(search))
    );
};

const slowRequest = function (search: string) {
    return timer(500).pipe(
        map(() => filterWords(search))
    );
};

const textInputChanges = (delayMs: number = 0) => of(
    "H", "He", "Hel", "Hels"
).pipe(
    delay(delayMs),
    concatMap((value) => of(value).pipe(delay(110)))
);

/**
 * NOTE: When the request is fast enough we get all responses
 */
const sub = textInputChanges().pipe(
    switchMap((value) => {
        console.log(`FAST: Switching to other request, aborting old one. searchValue:${value}`)
        return fastRequest(value)
            .pipe(
                tap((value) => console.log(`FAST: Got following from fast request: ${value}`)));
    })
).subscribe({
    next: (suggestions) => {
        console.log("FAST: ", suggestions);
    }
});
console.log("")

/**
 * NOTE: When the request is very slow we abort the old ones and only return it, if it completed
 */
const sub2 = textInputChanges(2000).pipe(
    switchMap((value) => {
        console.log(`SLOW: Switching to other request, aborting old one. searchValue:${value}`)
        return slowRequest(value)
            .pipe(
                tap((value) => console.log(`SLOW: Got following from slow request: ${value}`)));
    })
).subscribe({
    next: (suggestions) => {
        console.log("SLOW:", suggestions);
    }
});


setTimeout(() => {
    sub.unsubscribe();
    sub2.unsubscribe();
}, 4000);