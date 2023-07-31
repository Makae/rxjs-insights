import { Observable, delay, exhaustMap, interval, map, mergeMap, of, switchMap, take, zip } from "rxjs";


const obsInput200MsValues = () => {
    return zip(of("Ber", "Berge", "Bregenz"), interval(200))
    .pipe(
        map((values) => values[0])
    );
}


const requestWhichTakes220Ms = (value: string): Observable<String> => {
    return of(value).pipe(delay(220));
}

const inputTriggerSM = obsInput200MsValues();
const subscriptionSM = inputTriggerSM.pipe(
    switchMap((value) => requestWhichTakes220Ms(value))
).subscribe({
    next: (value) => console.log(`switchMap Next: ` + value)
});

const inputTriggerEM = obsInput200MsValues();
const subscriptionEM = inputTriggerEM.pipe(
    exhaustMap((value) => requestWhichTakes220Ms(value))
).subscribe({
    next: (value) => console.log(`exhaustMap Next: ` + value)
});

const inputTriggerMM = obsInput200MsValues();
const subscriptionMM = inputTriggerMM.pipe(
    mergeMap((value) => requestWhichTakes220Ms(value))
).subscribe({
    next: (value) => console.log(`mergeMap Next: ` + value)
});

setTimeout(() => {
    subscriptionSM.unsubscribe();
    subscriptionEM.unsubscribe();
    subscriptionMM.unsubscribe();
}, 1000);

