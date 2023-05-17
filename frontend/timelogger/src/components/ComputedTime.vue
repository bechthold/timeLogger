<template>
  <div>
    <p>{{ formattedTime }}</p>
  </div>
</template>

<script>
export default {
  props: {
    startTime: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      elapsedTime: 0,
    };
  },
  created() {
    this.startTimer();
  },
  destroyed() {
    clearInterval(this.timer);
  },
  computed: {
    formattedTime() {
      const seconds = this.elapsedTime % 60;
      const minutes = Math.floor((this.elapsedTime / 60) % 60);
      const hours = Math.floor(this.elapsedTime / 3600);

      return `${this.padNumber(hours)}:${this.padNumber(
        minutes
      )}:${this.padNumber(seconds)}`;
    },
  },
  methods: {
    startTimer() {
      const startTimestamp = new Date(this.startTime).getTime() / 1000;

      this.elapsedTime = Math.floor(Date.now() / 1000 - startTimestamp);

      this.timer = setInterval(() => {
        this.elapsedTime++;
      }, 1000);
    },
    padNumber(number) {
      return number.toString().padStart(2, "0");
    },
  },
};
</script>
