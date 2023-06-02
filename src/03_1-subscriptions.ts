import { interval } from "rxjs";
const intervalSize = 100;
const afterTwoEvents = intervalSize * 2 + 50;

// NOTE: Emit the index of the event (0,1,2,3) after 100ms each 
var intervalObservable = interval(intervalSize);

var subscription = intervalObservable.subscribe({
    next: (n) => console.log("Subscriber.next() called, got: " + n),
    error: (e) => console.log("Subscriber.error() called, got: " + e),
    complete: () => console.log("Never gets called, we unsubscribe before a complete")
});

setTimeout(() => {
    /**  
     * NOTE: Within our frontend frameworks we need to be sure to unsubscribe when our components are destructed, 
     * otherwise we might react to emitted values alltough we are not interested in them right now.
     * This could result in some nasty side-effects like redirecting the user to another page or showing popups when
     * they are not relevant right now.
     * When we are using pipe() we do not need to unsubscribe to the inner observables, this is done automatically
     * */
    subscription.unsubscribe();

    console.log("No other events after");
    setTimeout(() => {
        console.log("No other events before");
    }, afterTwoEvents);

}, afterTwoEvents);