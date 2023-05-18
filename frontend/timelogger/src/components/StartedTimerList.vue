<template>
  <div>
    <div v-if="startedTimers">
      <div class="row">
        <div
          class="col-lg-12 mb-1"
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

              <ModalUpdateObject
                v-model="showModal"
                :title="'Comment'"
                @ok="handleOkClick"
                @cancel="handleCancelClick"
              >
                <input
                  class="form-control"
                  v-model="tempComment"
                  @keydown.enter="handleOkClick"
                  @keydown.esc="handleCancelClick"
                />
              </ModalUpdateObject>
            </div>

            <div class="timer-actions">
              <button
                @click="handleCommentClick(timer)"
                class="btn btn-primary"
              >
                Comment
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
import { actionTypes as timerActionTypes } from "@/store/modules/timer";
import ComputedTime from "@/components/ComputedTime";
import EventBus from "@/events/EventBus";
import ModalUpdateObject from "@/components/ModalUpdateObject.vue";

export function handleStopClick(timer) {
  const updateData = {
    status: "finished",
    finish_time: new Date().toISOString(),
  };
  const timerId = timer.id;
  this.$store
    .dispatch(timerActionTypes.updateTimer, { timerId, updateData })
    .then((stoppedTimer) => {
      console.log("Timer stopped:", stoppedTimer);
      EventBus.$emit("timerStopped");
    })
    .catch((error) => {
      console.log("Failed to stop timer:", error);
    });
}

export default {
  name: "TimerList",
  components: {
    ComputedTime,
    ModalUpdateObject,
  },
  data() {
    return {
      showModal: false,
      tempComment: "",
      timerId: null,
    };
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.timer.isLoading,
      timers: (state) => state.timer.timers,
      error: (state) => state.timer.error,
    }),
    startedTimers() {
      return this.timers
        .filter((timer) => timer.status === "started")
        .reverse();
    },
  },
  mounted() {
    this.fetchTimers();
    EventBus.$on("timerCreated", this.fetchTimers);
    EventBus.$on("timerUpdated", this.fetchTimers);
    EventBus.$on("timerStopped", this.fetchTimers);
  },
  destroyed() {
    EventBus.$off("timerCreated", this.fetchTimers);
    EventBus.$off("timerUpdated", this.fetchTimers);
    EventBus.$off("timerStopped", this.fetchTimers);
  },
  methods: {
    fetchTimers() {
      this.$store
        .dispatch(timerActionTypes.getAllTimers)
        .then(() => {
          console.log("Success");
        })
        .catch(() => {
          console.log("Failure");
        });
    },
    handleCommentClick(timer) {
      this.showModal = true;
      this.tempComment = timer.comment;
      this.timerId = timer.id;
    },

    handleOkClick() {
      this.showModal = false;
      const updateData = {
        comment: this.tempComment,
      };

      this.$store
        .dispatch(timerActionTypes.updateTimer, {
          timerId: this.timerId,
          updateData,
        })
        .then((updatedTimer) => {
          console.log("Timer updated:", updatedTimer);
          EventBus.$emit("timerUpdated");
        })
        .catch((error) => {
          console.log("Failed to update timer:", error);
        });
    },

    handleCancelClick() {
      this.showModal = false;
    },

    handleStopClick,
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
  justify-content: space-between;
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

.timer-actions button {
  margin-left: 10px;
}

.modal-dialog {
  width: 900px;
}

.comment {
  margin-top: -12px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-content {
  background-color: #fff;
  padding: 0 30px;
  border-radius: 4px;
}

.modal-content textarea {
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
}

.modal-content button {
  margin-right: 10px;
}
</style>
