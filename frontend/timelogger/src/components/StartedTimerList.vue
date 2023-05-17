<template>
  <div>
    <div v-if="startedTimers.length > 0">
      <div class="row">
        <div
          class="col-lg-12 mb-4"
          v-for="(timer, index) in startedTimers"
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
                <div class="category-name">{{ timer.Category.name }}</div>
                <div class="elapsed-time">
                  <computed-time :start-time="timer.start_time"></computed-time>
                </div>
                <div class="comment">{{ timer.comment }}</div>
              </div>
            </div>
            <div class="timer-actions">
              <button @click="handlePauseClick(timer)" class="btn btn-primary">
                Pause
              </button>
              <button @click="handleStopClick(timer)" class="btn btn-danger">
                Stop
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No started timers found.</p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { actionTypes } from "@/store/modules/timer";
import ComputedTime from "@/components/ComputedTime";
import EventBus from "@/events/EventBus";

export default {
  name: "TimerList",
  components: {
    ComputedTime,
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.timer.isLoading,
      timers: (state) => state.timer.timers,
      error: (state) => state.timer.error,
    }),
    startedTimers() {
      return this.timers.filter((timer) => timer.status === "started");
    },
  },
  mounted() {
    this.fetchTimers();
    EventBus.$on("timerCreated", this.fetchTimers);
  },
  destroyed() {
    EventBus.$off("timerCreated", this.fetchTimers);
  },
  methods: {
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
    handlePauseClick(timer) {
      console.log("Pause", timer.Category.name);
    },
    handleStopClick(timer) {
      console.log("Stop", timer.Category.name);
    },
  },
};
</script>

<style scoped>
.row {
  margin: -10px;
}

.col-lg-12 {
  padding: 10px;
}

.timer-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100px;
  padding: 10px;
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

.start-time,
.comment {
  margin-bottom: 5px;
}

.timer-actions button {
  margin-left: 10px;
}
</style>
