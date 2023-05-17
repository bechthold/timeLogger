<template>
  <div>
    <div v-if="finishedTimers.length > 0">
      <div class="row">
        <div
          class="col-lg-12 mb-4"
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
                <div class="category-name">{{ timer.Category.name }}</div>
                <div class="elapsed-time">
                  {{ formatTime(timer.start_time) }} -
                  {{ formatTime(timer.finish_time) }}
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

export default {
  name: "FinishedTimerList",
  computed: {
    ...mapState({
      isLoading: (state) => state.timer.isLoading,
      timers: (state) => state.timer.timers,
      error: (state) => state.timer.error,
    }),
    finishedTimers() {
      return this.timers.filter((timer) => timer.status === "finished");
    },
  },
  mounted() {
    this.fetchTimers();
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
    formatTime(dateTime) {
      const date = new Date(dateTime);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const seconds = date.getSeconds().toString().padStart(2, "0");

      return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
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

.elapsed-time .category-name {
  font-style: italic;
}
</style>
