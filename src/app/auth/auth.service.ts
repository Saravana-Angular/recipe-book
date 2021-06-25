import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

interface AuthResponse {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string
}

@Injectable({providedIn: 'root'})
export class AuthService {

    constructor(private http: HttpClient) {}

    signup(email: string, password: string) {
        return this.http.post<AuthResponse>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDl_KQczWqWehdtFZf16-glHM3NfM4bm2s',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
            ).pipe(
                catchError((errorRes) => {
                    let errorMessage = "An unknown error has occurred!";
                    if(errorRes.error && errorRes.error.error) {
                        switch (errorRes.error.error.message) {
                            case 'EMAIL_EXISTS':
                                errorMessage = "This email already exists!"
                        }
                    }
                    return throwError(errorMessage);
                }) 
            )
    }

}