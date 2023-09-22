import { createAction, props } from '@ngrx/store'
import { Users } from '../models/app.models';

export const retrieveUser = createAction('[post API]API success');
export const retrieveUserSuccess = createAction('[post API]API SuccessSuccess',
    props<{ allUsers: Users[] }>()
);

export const retrieveUserProfile = createAction('[User Profile] userProfile')
export const retrieveUserProfileSuccess = createAction('[User Profile] userProfileSuccess', props<{ userProfile: Users }>())