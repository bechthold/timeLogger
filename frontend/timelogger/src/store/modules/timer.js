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

  updateTimerStart: "[timer] Update timer start",
  updateTimerSuccess: "[timer] Update timer success",
  updateTimerFailure: "[timer] Update timer failure",
};

export const actionTypes = {
  getAllTimers: "[timer] Get all timers",
  createTimer: "[timer] Create timer",
  updateTimer: "[timer] Update timer",
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
  [mutationTypes.updateTimerStart](state) {
    state.isLoading = true;
    state.error = null;
  },
  [mutationTypes.updateTimerSuccess](state, stoppedTimer) {
    state.isLoading = false;
    // Update the timer in the timers array with the stoppedTimer data
    const index = state.timers.findIndex(
      (timer) => timer.id === stoppedTimer.id
    );
    if (index !== -1) {
      state.timers[index] = stoppedTimer;
    }
  },
  [mutationTypes.updateTimerFailure](state, error) {
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
  [actionTypes.updateTimer](context, { timerId, updateData }) {
    context.commit(mutationTypes.updateTimerStart);
    return new Promise((resolve, reject) => {
      timerApi
        .updateTimer(timerId, updateData)
        .then((response) => {
          context.commit(mutationTypes.updateTimerSuccess, response.data.timer);
          resolve(response.data.timer);
        })
        .catch((error) => {
          context.commit(mutationTypes.updateTimerFailure, error);
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
