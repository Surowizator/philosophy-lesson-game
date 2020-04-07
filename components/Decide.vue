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
      clicked: false,
      mouseStart: 0,
      turnedL: false,
      turnedR: false
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
      console.log('down');
    },
    dragUp(e) {
      console.log('up');
      if (e.clientX - this.mouseStart > 30) {
        this.turnedR = true;
        this.turnedL = false;
        console.log('move');
      } else if (e.clientX - this.mouseStart < -30) {
        this.turnedL = true;
        this.turnedR = false;
        console.log('move');
      }
      this.clicked = false;
    }
  }
};
</script>
