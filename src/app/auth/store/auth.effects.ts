import { HttpClient } from "@angular/common/http";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, exhaustMap, map, switchMap, tap } from "rxjs/operators";
import * as AuthActions from "./auth.actions";
import { environment } from "../../../environments/environment";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../user.model";

export interface AuthResponse {
    idToken: string,
    email: string,
    refresToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}

const handleAuthentication = (email: string, userId: string, token: string, expiresIn: number) => {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
    const user = new User(email, userId, token, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));
                        
    return (new AuthActions.AuthenticateSuccess({
            email: email,
            userId: userId,
            token: token,
            expirationDate: expirationDate
        }));
}

const handleError = (errorRes) => {
    let errorMessage = "An unknown error has occurred!";
    if(!errorRes.error || !errorRes.error.error) {
        return of (new AuthActions.AuthenticateFail(errorMessage));
    }
    
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
    
    return of(new AuthActions.AuthenticateFail(errorMessage));
}

@Injectable()
export class AuthEffects {
    
    constructor(private actions$: Actions, private http: HttpClient, private router: Router) {}

    @Effect()
    authSignup = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((signupAction: AuthActions.SignupStart) => {
            return this.http.post<AuthResponse>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
                {
                    email: signupAction.payload.email,
                    password: signupAction.payload.password,
                    returnSecureToken: true
                }).pipe(
                    map(resData => {
                        return handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
                    }), catchError(errorRes => {
                            return handleError(errorRes)
                    }
                    ))
        }
    ))

    @Effect()
    authLogin = this.actions$.pipe(
            ofType(AuthActions.LOGIN_START),
            switchMap((authData: AuthActions.LoginStart) => {
                return this.http.post<AuthResponse>(
                    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
                    {
                        email: authData.payload.email,
                        password: authData.payload.password,
                        returnSecureToken: true
                    }).pipe(
                        map(resData => {
                            return handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
                        }), catchError(errorRes => {
                                return handleError(errorRes)
                        }
                        ))
                
            }))
 
    @Effect({dispatch: false})      
    authRedirect = this.actions$.pipe(ofType(AuthActions.AUTHENTICATE_SUCCESS, AuthActions.LOGOUT), tap(() => {
        this.router.navigate(['/'])
    }))

    @Effect()
    autoLogin = this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(() => {
            const userData: {
                email: string,
                id: string,
                _token: string,
                _tokenExpirationDate: string
            } = JSON.parse(localStorage.getItem('userData'));
         
    
            if(!userData) {
                return;
            }
    
            const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
            if(loadedUser.token) {
                // this.user.next(loadedUser);
                return (new AuthActions.AuthenticateSuccess({ 
                    email: loadedUser.email,
                    userId: loadedUser.id,
                    token: loadedUser.token,
                    expirationDate: new Date(userData._tokenExpirationDate)
                }))    
                // const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
                // this.autoLogout(expirationDuration);
        }})
    )

    @Effect({dispatch: false})
    authLogout = this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
            localStorage.removeItem('userData');
        })
    )
}