<template>
  <div class="decision">
    <p class="question">
      {{ decision.question }}
    </p>
    <div
      class="card"
      @mousedown="dragDown"
      @mouseup="dragUp"
      @mousemove="dragMove"
    >
      <p class="card-text">{{ turnedL ? decision.option1.text }}</p>
      <img src="~assets/img/florka.jpg" alt="florka" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Decide',
  data() {
    return {
      clicked: false,
      mouseStart: 0,
      turnedL: false,
      turnedR: false
    };
  },
  computed: mapGetters(['getDecisions']),
  created() {
    this.decision = this.getDecisions[
      Math.floor(Math.random() * this.getDecisions.length)
    ];
  },
  methods: {
    dragDown(e) {
      this.clicked = true;
      this.mouseStart = e.clientX;
    },
    dragUp(e) {
      this.clicked = false;
    },
    dragMove(e) {
      if (
        this.clicked &&
        e.clientX - this.mouseStart > window.innerWidth / 15
      ) {
        this.clicked = false;
        this.turned = true;
      }
    }
  }
};
</script>
