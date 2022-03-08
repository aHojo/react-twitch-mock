import {CREATE_STREAM, EDIT_STREAM, DELETE_STREAM, FETCH_STREAM, FETCH_STREAMS } from "../actions/types";
import _ from 'lodash';
export default (state = {}, action ) => {
    switch (action.type) {
        case FETCH_STREAMS:
            return {...state, ..._.mapKeys(action.payload, 'id')};
        case FETCH_STREAM:
            return {...state, [action.payload.id]: action.payload};
        case CREATE_STREAM:
            return {...state, [action.payload.id]: action.payload};
        case EDIT_STREAM:
            return {...state, [action.payload.id]: action.payload};
        case DELETE_STREAM:
            // return _.omit(state, action.payload) // payload is just the id for this one. need lodash for this.
            const {[action.payload]: payloadIdRemoved, ...newState} = state // id's are the key so we can remove it this way.
            return newState;
        default:
            return state;
    }
}