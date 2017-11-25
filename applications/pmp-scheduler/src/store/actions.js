import * as types from './mutation-types'

export const signIn = ({commit}, user_payload) => {
  commit(types.SIGN_IN, user_payload)
}

export const signOut = ({commit}) => {
  commit(types.SIGN_OUT)
}

export const setWorkPeriods = ({commit}, work_periods_payload) => {
  commit(types.SET_WORK_PERIODS, work_periods_payload)
}

export const pullIndividual = ({commit}, index) => {
  commit(types.PULL_INDIVIDUAL, index)
}

export const setRequestedTime = ({commit}) => {
  commit(types.SET_REQUESTED_TIME)
}

export const setCurrentDayType = ({commit}, payload) => {
  commit(types.SET_CURRENT_DAY_TYPE, payload)
  console.log("I ran though, payload: " + payload);
}
