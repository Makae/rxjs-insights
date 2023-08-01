import { AsyncSubject, Subject } from "rxjs";


const dragAndDropValue = new AsyncSubject<string>();
dragAndDropValue.next("List item 1");
dragAndDropValue.next("List item 2");

dragAndDropValue.subscribe({
    next: (value: string) => console.log(`Latest value: ${value}`),
    complete: () => console.log("Complete"),
    error: () => console.log("Exit"),
});
console.log("After subscribe");
dragAndDropValue.next("List item 5");

dragAndDropValue.complete();
console.log("After complete");