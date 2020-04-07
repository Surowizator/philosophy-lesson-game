<template>
  <div class="decision" @mouseup="dragUp">
    <p class="question">
      {{ decision.question }}
    </p>
    <div class="card" @mousedown="dragDown">
      <p class="card-text">
        {{ turnedL ? decision.option1.text : turnedR ? decision.option2.text : '' }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Decide',
  data() {
    return {
      mouseStart: 0,
      clicked: false,
      turnedL: false,
      turnedR: false,
      overL: false,
      overR: false
    };
  },
  computed: mapGetters(['getDecisions']),
  created() {
    this.decision = this.getDecisions[Math.floor(Math.random() * this.getDecisions.length)];
  },
  methods: {
    dragDown(e) {
      this.clicked = true;
      this.mouseStart = e.clientX;
    },
    dragUp(e) {
      if (e.clientX - this.mouseStart > 30) {
        if (this.turnedR) {
          this.overR = true;
        } else {
          this.turnedR = true;
          this.turnedL = false;
        }
      } else if (e.clientX - this.mouseStart < -30) {
        if (this.turnedL) {
          this.overL = true;
        } else {
          this.turnedL = true;
          this.turnedR = false;
        }
      }
      this.clicked = false;
    }
  }
};
</script>
