import timerApi from "@/api/timer";

const state = {
  timers: [],
  isLoading: false,
  error: null,
};

export const mutationTypes = {
  getAllTimersStart: "[timer] Get all timers start",
  getAllTimersSuccess: "[timer] Get all timers success",
  getAllTimersFailure: "[timer] Get all timers failure",

  createTimerStart: "[timer] Create timer start",
  createTimerSuccess: "[timer] Create timer success",
  createTimerFailure: "[timer] Create timer failure",

  stopTimerStart: "[timer] Stop timer start",
  stopTimerSuccess: "[timer] Stop timer success",
  stopTimerFailure: "[timer] Stop timer failure",
};

export const actionTypes = {
  getAllTimers: "[timer] Get all timers",
  createTimer: "[timer] Create timer",
  stopTimer: "[timer] Stop timer",
};

const mutations = {
  [mutationTypes.getAllTimersStart](state) {
    state.isLoading = true;
  },
  [mutationTypes.getAllTimersSuccess](state, payload) {
    state.isLoading = false;
    state.timers = payload;
  },
  [mutationTypes.getAllTimersFailure](state) {
    state.isLoading = false;
    state.timers = [];
  },
  [mutationTypes.createTimerStart](state) {
    state.isLoading = true;
    state.error = null;
  },
  [mutationTypes.createTimerSuccess](state, newTimer) {
    state.isLoading = false;
    state.timers.push(newTimer);
  },
  [mutationTypes.createTimerFailure](state, error) {
    state.isLoading = false;
    state.error = error;
  },
  [mutationTypes.stopTimerStart](state) {
    state.isLoading = true;
    state.error = null;
  },
  [mutationTypes.stopTimerSuccess](state, stoppedTimer) {
    state.isLoading = false;
    // Update the timer in the timers array with the stoppedTimer data
    const index = state.timers.findIndex(
      (timer) => timer.id === stoppedTimer.id
    );
    if (index !== -1) {
      state.timers[index] = stoppedTimer;
    }
  },
  [mutationTypes.stopTimerFailure](state, error) {
    state.isLoading = false;
    state.error = error;
  },
};

const actions = {
  [actionTypes.getAllTimers](context) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getAllTimersStart);
      timerApi
        .getTimers()
        .then((response) => {
          context.commit(
            mutationTypes.getAllTimersSuccess,
            response.data.timers
          );
          resolve(response.data.timers);
        })
        .catch(() => {
          context.commit(mutationTypes.getAllTimersFailure);
        });
    });
  },
  [actionTypes.createTimer](context, timerData) {
    context.commit(mutationTypes.createTimerStart);
    return new Promise((resolve, reject) => {
      timerApi
        .createTimer(timerData)
        .then((response) => {
          context.commit(mutationTypes.createTimerSuccess, response.data.timer);
          resolve(response.data.timer);
        })
        .catch((error) => {
          context.commit(mutationTypes.createTimerFailure, error);
          reject(error);
        });
    });
  },
  [actionTypes.stopTimer](context, { timerId, updateData }) {
    context.commit(mutationTypes.stopTimerStart);
    return new Promise((resolve, reject) => {
      timerApi
        .stoppedTimer(timerId, updateData)
        .then((response) => {
          context.commit(mutationTypes.stopTimerSuccess, response.data.timer);
          resolve(response.data.timer);
        })
        .catch((error) => {
          context.commit(mutationTypes.stopTimerFailure, error);
          reject(error);
        });
    });
  },
};

export default {
  state,
  actions,
  mutations,
};
