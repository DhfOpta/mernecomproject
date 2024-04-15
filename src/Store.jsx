import React from 'react'
import { createStore } from 'redux'
import { rootReducer } from './Component/Reducers/rootReducer'

export const Store = createStore(rootReducer,{})
