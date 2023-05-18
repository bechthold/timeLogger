<template>
  <div>
    <div v-if="finishedTimers.length > 0">
      <div class="row">
        <div
          class="col-lg-12 mb-1"
          v-for="(timer, index) in finishedTimers"
          :key="index"
        >
          <div class="timer-card">
            <div class="timer-info">
              <img
                :src="timer.Category.icon"
                alt="Category Icon"
                class="category-icon"
              />
              <div class="timer-details">
                <div class="category-name">
                  {{ timer.Category.name }} -
                  {{ formatDiffTime(timer.start_time, timer.finish_time) }}
                </div>
                <div class="elapsed-time">
                  {{ formatFullDate(timer.start_time) }} -
                  {{ formatFullDate(timer.finish_time) }}
                </div>
                <div class="category-comment">
                  {{ timer.comment }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No finished timers found.</p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { actionTypes } from "@/store/modules/timer";
import EventBus from "@/events/EventBus";
import { formatFullDate, formatDiffTime } from "@/helpers/time";

export default {
  name: "FinishedTimerList",
  computed: {
    ...mapState({
      isLoading: (state) => state.timer.isLoading,
      timers: (state) => state.timer.timers,
      error: (state) => state.timer.error,
    }),
    finishedTimers() {
      return this.timers
        .filter((timer) => timer.status === "finished")
        .reverse();
    },
  },

  mounted() {
    this.fetchTimers();
    EventBus.$on("timerStopped", this.fetchTimers);
  },
  destroyed() {
    EventBus.$off("timerStopped", this.fetchTimers);
  },

  methods: {
    formatFullDate,
    formatDiffTime,
    fetchTimers() {
      this.$store
        .dispatch(actionTypes.getAllTimers)
        .then(() => {
          console.log("Success");
        })
        .catch(() => {
          console.log("Failure");
        });
    },
  },
};
</script>

<style scoped>
.row {
  margin: -10px;
}

.timer-card {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100px;
  padding: 0 20px;
  border: 1px solid #ccc;
}

.timer-info {
  display: flex;
  align-items: center;
}

.category-icon {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.timer-details {
  display: flex;
  flex-direction: column;
}

.category-name {
  font-weight: bold;
}

.elapsed-time .category-name {
  font-style: italic;
}
</style>
