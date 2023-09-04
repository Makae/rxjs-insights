import { filter, map, of, tap } from "rxjs";

of(1, 2)
    .pipe(
        tap((n) => console.log("Root: " + n)),
        map((n) => n * 2),
        filter((n) => n <= 2)
    ).subscribe({
        next: (n) => console.log("next(), got: " + n),
        error: (e) => console.log("error(), got: " + e),
        complete: () => console.log("complete()")
    });