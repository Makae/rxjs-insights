# Introduction
Within the last few years Reactive Programming bacame a core tool which is used by a lot of programmers in their day-to-day work. Reactive Programming is specified in the ReactiveX API (Reactive Extensions) which provide a solution for "asynchronous programming with observable streams".  

One of the most notable frameworks which uses Reactive Programming is Angular which includes the RxJS library. This library  implements the ReactiveX API. Angular depends on it for implementing a reactive and standardized solution for working with data streams and data manipulation.  
Altough it is bundled within Angular and so widely used, it is often hard for new developers to understand and to not fall into the many common pitfalls.

I remember having  a hard time getting to understand RxJS. This article tries to ease new developers into ReactiveX and RxJS and also tries to give some tips for handling the more complex topics.

Within the article I will show examples with TypeScript and the RxJS Library as I am most comfortable with those implementations. Nevertheless the concept here will apply to all implementations of ReactiveX.

## Why Reactive Programming?
Reactive Programming tries to streamline the handling of data which change (asynchronousely) over time. 
ReactiveX is moste helpful for data events which are generated interactively or is provided by an external data source to your Application.  

For Example:
* User-Input (Touch, Mouse, Keyboard)
* Data beeing pushed to the App (WebSockets)
* State which changes over time (Similar to "Redux")

### But there are Promises, EventListeners!
Yes, there are. But, both have their own drawbacks. Additionally, together a non-uniform interface for handling data, because you often mix both within your (frontend-) application. Both technologies have their own advantages though:   
* Promises:  
  when you only use one single data event with error and completion event handling, Promises are the way to go  
  E.g: REST-Requests
* EventListeners:  
  When you want to have indefinite number of data events but error-handling is not relevant,  EventListeners are sutiable for that  
  E.g.: Key-Up events on Input Field

ReactiveX uses **Observables** which provide a generic solution with a lot more flexibilities for handling the type and number events which are occuring by your source.

As you can see in this table the use of Observables provide a solution for all possible combinations.
| Technology | Synchronous | Asynchronous | Multiple events | Complete event | Error event |
|-------- | -------- | -------- | -------- | -------- | -------- |
| Promise | ❌ | ✅ | ❌ | ✅ | ✅ |
| EventListener | ✅ | ❌ | ✅ | ❌ | ❌ |
| Observables | ✅ | ✅ | ✅ | ✅ | ✅ |


## Core concepts of ReactiveX
The core idea of ReactiveX can be explained in a few simple terms:  
* You *subscribe* to *Observables* and react to *multiple values* which are returned over time.  
* After all values are returned, your *Observer* gets informed in a *complete* event
* If an Exception happend the *Observer* also get noticed and receives an *error* event

In the above descriptions we can see a few keywords which are part of the terminology used by Reactive Programming.
### Observable
  Defines a source of data which can be observed. 
  It emits 3 different event types to which you can listen:
  * next:  
    Is triggered when the next data point is returned in the stream
  * complete:  
    Is triggered when it completes (E.g. REST-Request done)
  * error:  
    Is triggered when an exception got thrown (E.g. 404 Response from REST-Request)

 #### Example of Events beeing triggered  

| Example | Next count | Complete  count | Error  count | 
|-------- | -------- | -------- | -------- |
| GET Request (success) | 1 | 1 | 0 |
| DELETE Request (success) | 0 | 1 | 0|
| POST Request (error) | 0 | 0 | 1 |
| WebSockets (still open) | n | 0 | 0 |
| User-Input in Textbox changes | n | 0 | 0 |

#### Example of Observables
```ts
// Creates an Observable which will trigger events when the keyup event is fired on an input element
const inputKeyupObservable = fromEvent(htmlInput, 'keyup');
```

### Observer / Subscriber
This is the part of the app which is interested in the events. Normally this is you as a programming receiving the data and then doing something with it.  
In the case of the forntend this could be the changes in an input-field which is triggered by the user typing. You then can take this data and trigger for Example Autocompletion.  
We subscribe to an *Observable* by providing an **Observer** / **Subscriber**. It has one, some or all types of the event callback types defined: next, error, complete  
After the subscribe() was called we get an **Subscription** back which is used to unsubscribe when we are no longer interested in the events.

#### Example of Observer
```ts
const myUserInputObserver = {
  next: (myValue: string) => {doAutocomplete(myValue)},
  error: (error) => { console.log(error); },
  complete: (complETE) => { console.log(complete); }
};
const mySubscription = inputKeyupObservable.subscribe(myUserInputObserver);
```

### Subscription
The subscription is used to unsubscribe after we are no longer interested in the events emitted by the Observable. This is the case, when a component is unloaded.

####Exapmle of Subscription
```ts
class MyComponent {
  private mySubscription?: Subscription;

  public onInit(): void {
    // {...}
    this.mySubscription = inputKeyupObservable.subscribe(myUserInputObserver);
  }
  // {...}
  public onDestroy(): void {
    mySubscription?.unsubscribe();
  }
}
```

### Pipes
Pipes are used to connect 2 or more observables together. In RxJS there are a lot of functions which help you by defining useful *operator* functions or 


## Marble diagrams
When working with RxJS the use of marble diagrams help you design your observables in the right way.  
They show the Observable and the data returned by it over time.  
Here you can see an Observable which returnes the values "A", "B", "C" over time and then completes. (Denoted by the pipe "|")  
```
--A--B--C-|
```

When an error occurs it is denoted by "X":  
```
--A--X
```


In on itself this is not very helpful, but if you combine observables by filtering and and mapping it gets a lot clearer of what is happening.  
```
--1--2--3--4--5-->        # An Observeble which returns a stream of integers
  [filter: x => x < 3]    # Filter-Operator
--1--2----------->        # New Observable
  [map: x => x * 2]       # Map-Operator
--2--4----------->        # Final Observable
```

# Overview

## Subscriptions

# Pipes

#  