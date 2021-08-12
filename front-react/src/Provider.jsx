import { useState } from 'react';
import { createContainer } from 'react-tracked';

const initialState = {
  auth: false,
}

export const {
    Provider,
    useTrackedState,
    useUpdate: useSetState,
} = createContainer(() => useState(initialState));