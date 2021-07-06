import { HttpClient } from "@angular/common/http";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, exhaustMap, map, switchMap } from "rxjs/operators";
import * as AuthActions from "./auth.actions";
import { environment } from "../../../environments/environment";
import { Injectable } from "@angular/core";

export interface AuthResponse {
    idToken: string,
    email: string,
    refresToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}

@Injectable()
export class AuthEffects {
    
    constructor(private actions$: Actions, private http: HttpClient) {}

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
                            const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000)
                            
                            return of(new AuthActions.Login({
                                    email: resData.email,
                                    userId: resData.localId,
                                    token: resData.idToken,
                                    expirationDate: expirationDate
                                }));
                        }), catchError(error => {
                        //...
                        return of();
                    }))
                
            }))
}