# Abstract
Within the last few years Reactive Programming bacame a core tool which is used by a lot of programmers.  
One of the most notable frameworks which uses Reactive Programming is Angular which includes the RxJS library.  
It depends on it for implementing a reactive and standard solution for working with data manipulation.  
Altough it is bundled within Angular and so widely used, it is often hard to understand when having the first touch points with it.  

I also had a hard time when I tried the first time to understand how to use RxJS. So this article tries to ease a new programmer into RxJS and also tries to give some tipps for handling more complex topics.

Within the article I will show examples with TypeScript and the RxJS Library as I am most comfortable with those implementations. Also I will use RxJS and Reactive Programming somewhat interchangeable terms, but all the concept here will apply to all implementations of Reactive Extensions.

## Why Reactive Programming?
Reactive Programming tries to streamline the handling of data which change (asynchronousely) over time. 
I think most advantages can be taken for data which is generated interactively or is provided by an external data source to your App.   
For Example:
* UI-Input (Touch, Mouse, Keyboard)
* Data beeing pushed to the App (WebSockets)
* State which changes over time (Similar to "Redux")

## Core terminology of Reactive Programming
The core idea of Reactive Programming can be explained in a few simple terms:  
* You *subscribe* to *Observables* and react to *multiple values* which are returned over time.  
* After all values are returned, your *Observer* gets informed in a *complete* event
* If an Exception happend the *Observer* also get noticed and receives an *error* event

In the above term we can see a few keywords which are part of the terminology used by Reactive Programming.
### Observable
  Defines a source of data which can be observed. 
  It emit 3 different events to which you can listen:
  * next:  
    contains the next data point in the "stream"
  * complete:  
    Is triggered after it completes (E.g. REST-Request done)
  * error:  
    Is triggered after an exception got thrown (E.g. 404 Response from REST-Request)

 #### Example of Events beeing triggered  

| Example | No. next | No. complete | No. error | 
|-------- | -------- | -------- | -------- |
| GET Request (success) | 1 | 1 | 0 |
| DELETE Request (success) | 0 | 1 | 0|
| POST Request (error) | 0 | 0 | 1 |
| WebSockets (still open) | n | 0 | 0 |
| User-Input in Textbox changes | n | 0 | 0 |

### Observer / Subscriber
This is you, you are interested in the data returned by the final observable. An Observer can also be generated programmatically.

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