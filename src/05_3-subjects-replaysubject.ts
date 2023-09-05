import { BehaviorSubject, ReplaySubject, Subject, distinctUntilChanged, reduce, scan } from "rxjs";

interface State {
    name: string;
    firstName: string;
    email: string;
}

const myEventSourcingDB = new ReplaySubject<Partial<State>>();
console.log("Before myStateStore was subscribed to");
myEventSourcingDB.next({name: "Peter"});
myEventSourcingDB.next({firstName: "Parker"});
myEventSourcingDB.next({email: "tony-stark@example.com"});

myEventSourcingDB.pipe(
    scan((state, partialState) => { return {...state, ...partialState}})
).subscribe({
    next: (state: Partial<State>) => console.log(`Accumulated state: ${JSON.stringify(state)}`),
});
// As you will see it will aready have logged all changes.
console.log("After myEventSourcingDB did subscribe");