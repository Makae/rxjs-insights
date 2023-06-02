import { BehaviorSubject, Observable } from "rxjs";

export interface UserSession {
    loggedIn: boolean;
    id?: string;
    userName?: string;
}

const loggedOut: UserSession = { loggedIn: false };

export class AuthService {
    private readonly userSessionSubject: BehaviorSubject<UserSession>;

    constructor() {
        this.userSessionSubject = new BehaviorSubject<UserSession>(loggedOut);
    }

    public userLoginStatusChanges(): Observable<UserSession> {
        return this.userSessionSubject.asObservable();
    }

    public loginUser(username: string) {
        this.userSessionSubject.next({ id: "" + Math.random(), loggedIn: true, userName: username });
    }

    public logoutUser() {
        this.userSessionSubject.next(loggedOut);
    }

}