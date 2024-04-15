import React from 'react'
import { combineReducers } from 'redux'
import { reducer } from './index'
import { taskReducer } from './task'

export const rootReducer=combineReducers({
    reducer,taskReducer
})
