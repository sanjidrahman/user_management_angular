import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs";
import { UserServicesService } from "src/app/service/user-services.service";
import { Users } from "../models/app.models";
import { retrieveUser, retrieveUserProfile, retrieveUserProfileSuccess, retrieveUserSuccess } from "./app.actions";

@Injectable()
export class appEffects {

    constructor(
        private actions$: Actions,
        private service: UserServicesService
    ) { }

    loadAllUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(retrieveUser),
            switchMap(() => {
                return this.service.getAllUser()
                    .pipe(map((data) => retrieveUserSuccess({ allUsers: data as Users[] })))
            })
        )
    )

    loadProfile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(retrieveUserProfile),
            switchMap(() => {
                return this.service.loadProfile()
                    .pipe(map((data) => retrieveUserProfileSuccess({ userProfile: data as Users })))
            })
        )
    )

}