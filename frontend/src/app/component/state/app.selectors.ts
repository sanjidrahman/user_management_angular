import { Profile, Users } from "../models/app.models";
import { AppUserProfile, allUsers } from "./app.state";
import { createSelector } from '@ngrx/store'

export const userRootSelector = (state: allUsers) => state.allUsers;
export const uniquedata = createSelector(
    userRootSelector,
    (allUsers: Users[]) => {
        return [...allUsers]
    }
)

export const profileRootSelector = (state: AppUserProfile) => state.userProfile
export const userProfile = createSelector(profileRootSelector,
    (userProfile: Profile) => {
        return userProfile
    })