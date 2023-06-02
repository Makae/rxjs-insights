import { BehaviorSubject, Observable, of } from "rxjs";

export interface UserData {
    userId: string;
    userName: string;
    avatar: string;
}

export class UserDataService {
    public fetchUserData(userId: string): Observable<UserData> {
        return of({ userId, userName: "Tony Stark", avatar: `https://my-blob.com/user/${userId}/avatar.jpg` });
    }

}