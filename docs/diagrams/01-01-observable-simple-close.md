```mermaid
    sequenceDiagram
    participant p as Observable
    participant s1 as Observer1
    s1->>p: subscribe
    p->>p: next(1)
    p-->>s1: (1)
    p->>p: next(2)
    p->>s1: (1)
    p->>p: close()
    p->>s1: close()
```