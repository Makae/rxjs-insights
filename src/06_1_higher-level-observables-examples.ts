import { Observable, filter, of, switchMap } from "rxjs";
import { AuthService } from "./services/auth-service";
import { UserData, UserDataService } from "./services/userdata-service";

/**
 * NOTE:
 * When working with streams of data we often want to automatically fetch additional data
 * This is often done by subscribing to another observable when the next() is triggered.
 */
const authService = new AuthService();
const userDataService = new UserDataService();

const setUserNameAndAvatar = (userData: UserData) => {
    console.log(`User name: ${userData.userName}`);
    console.log(`Avatar: ${userData.avatar}`);
}

/**
 * NOTE: BAD EXAMPLE
 * This is a bad approach because:
 * * It does not automatically unsubscribe to open connections
 * * It uses more code than the example below
 * * Error handling is more of a hassle
 */
console.log("BAD Exmple:");

const sub = authService.userLoginStatusChanges()
    .pipe(
        filter((loginStatus) => loginStatus.loggedIn)
    )
    .subscribe({
        next: (loginStatus) => {
            userDataService.fetchUserData(loginStatus.id!)
                .subscribe((userData) => {
                    setUserNameAndAvatar(userData);
                });
        }
    });
authService.loginUser("Tony Stark");


sub.unsubscribe();
authService.logoutUser();
console.log("");


/**
 * NOTE: GOOD EXAMPLE
*/
console.log("Good Exmple:");


const sub2 = authService.userLoginStatusChanges()
    .pipe(
        filter((loginStatus) => loginStatus.loggedIn),
        // NOTE: Here we map from a Type <LoginStatus> to an Observable-Type called Observable<UserData>
        switchMap((loginStatus) => userDataService.fetchUserData(loginStatus.id!))
    )
    .subscribe((userData) => {
        setUserNameAndAvatar(userData);
    });
authService.loginUser("Tony Stark");



sub2.unsubscribe();
console.log("");