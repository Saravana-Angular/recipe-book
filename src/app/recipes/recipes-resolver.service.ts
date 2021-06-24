import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { DataStorageSerice } from "../shared/data-storage.service";

@Injectable({
    providedIn: 'root'
})
export class RecipesResolverService {
    
    constructor(private dataStorageService: DataStorageSerice) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.dataStorageService.fetchRecipes();
    }

}