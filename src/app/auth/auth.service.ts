import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { throwError, BehaviorSubject } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AuthResponse {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}

@Injectable({providedIn: 'root'})
export class AuthService {

    user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient, private router: Router) {}

    signup(email: string, password: string) {
        return this.http.post<AuthResponse>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDl_KQczWqWehdtFZf16-glHM3NfM4bm2s',
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .pipe(catchError(this.handleError), tap(resData => {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            }))
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponse>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDl_KQczWqWehdtFZf16-glHM3NfM4bm2s',
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .pipe(catchError(this.handleError), tap((resData) => {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)           
            }))
    }

    autoLogin() {
        const userData: {
            email: string,
            id: string,
            token: string,
            tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if(!userData) {
            return;
        }

        const loadedUser = new User(userData.email, userData.id, userData.token, new Date(userData.tokenExpirationDate));
        if(!loadedUser.token) {
            this.user.next(loadedUser);
        }
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
    }


    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = "An unknown error has occurred!";
        if(errorRes.error && errorRes.error.error) {
            switch (errorRes.error.error.message) {
                case 'EMAIL_EXISTS':
                    errorMessage = "This email already exists!"
                    break;
                case 'EMAIL_NOT_FOUND':
                    errorMessage = "This email does not exist!"
                    break;
                case 'INVALID_PASSWORD':
                    errorMessage = "The password is not correct!"
                    break;
            }
        }
        return throwError(errorMessage);
    }

}