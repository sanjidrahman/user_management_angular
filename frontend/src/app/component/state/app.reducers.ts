import { createReducer, on } from '@ngrx/store'
import { Users } from '../models/app.models';
import { retrieveUserProfileSuccess, retrieveUserSuccess } from './app.actions';

export const initialState: Users[] = [];

const _userReducer = createReducer(
    initialState,
    on(retrieveUserSuccess, (state, { allUsers }) => {
        return [...allUsers];
    })
);
export function userReducer(state: any, action: any) {
    return _userReducer(state, action);
}

// -----------------------Profile--------------------------------

export const initialStateOfUser: Users = {
    _id: '',
    name: '',
    email: '',
    password: '',
    image: '',
    __v: ''
}
export const _profileReducer = createReducer(initialStateOfUser,
    on(retrieveUserProfileSuccess, (state, { userProfile }) => {
        return userProfile
    })
)
export function profileReducer(state: any, action: any) {
    return _profileReducer(state, action)
}


