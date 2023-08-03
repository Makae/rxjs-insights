import { Observable, Subscription, map, of } from "rxjs";

const inputEvents: Observable<string> = of('Bern', 'Bergen', 'Bregenz');
const highLevelObservable: Observable<Observable<string[]>> = inputEvents
    .pipe(
        map((value: string) => of(["Place1", "Place2"]))
    );

let ongoingRequestSubscription: Subscription;
highLevelObservable.subscribe({
    next: (fetchObs: Observable<string[]>) => {
        // Cancel open request
        ongoingRequestSubscription?.unsubscribe();

        ongoingRequestSubscription = fetchObs.subscribe({
            next: (places: string[]) => {
                showSuggestions(places):
            }
        });
    });