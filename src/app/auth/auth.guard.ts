import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import * as fromApp from '../store/app.reducer';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

    constructor( 
        private router: Router,
        private store: Store<fromApp.AppState>) {}

    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
        return this.store.select('auth').pipe(
            map(AuthState => {
                return AuthState.user
            }),
            map(user => {
                const isAuth = !!user;
                if(isAuth) {
                    return true;
                }
            return this.router.createUrlTree(['/auth']);
        }))
    }
}