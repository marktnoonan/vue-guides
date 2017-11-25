import * as types from './mutation-types'

export const mutations = {
  [types.SIGN_IN] (state, user_payload) {
    state.user = user_payload
  },

  [types.SIGN_OUT] (state) {
    state.user = {}
  },

  [types.SET_WORK_PERIODS] (state, work_periods_payload) {
    state.workPeriods = work_periods_payload
  },

  [types.PULL_INDIVIDUAL] (state, index){
    state.individuals.slice(index,1);
  },

  [types.SET_REQUESTED_TIME] (state, time){
    state.requestedTimepoint = time;
  },

  [types.SET_CURRENT_DAY_TYPE] (state, payload){
    state.currentDayType = payload;
    console.log("I ran too, payload was " + payload);
  }

}
