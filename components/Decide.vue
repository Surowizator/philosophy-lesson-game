<template>
  <div class="decision" @mouseup="dragUp" @touchmove="mobileMove" @touchend="mobileEnd">
    <div v-show="displayCard">
      <p class="question">
        {{ decision.question ? decision.question : '' }}
      </p>
      <div
        v-on-clickout="returnFocus"
        class="card"
        tabindex="0"
        @mousedown="dragDown"
        @keyup="dragKey"
        @touchstart="mobileStart"
      >
        <p class="card-text">
          {{ turnedL ? decision.option1.text : turnedR ? decision.option2.text : '' }}
        </p>
      </div>
    </div>
    <div v-show="displayLost">
      <p class="gameEnd">Przegrałeś :(</p>
    </div>
    <div v-show="displayWon">
      <p class="gameEnd">Wygrałeś!</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { directive as onClickout } from 'vue-clickout';
import { gsap } from 'gsap';

export default {
  name: 'Decide',
  directives: {
    onClickout
  },
  data() {
    return {
      mouseStart: 0,
      touchStart: 0,
      touchEnd: 0,
      clicked: false,
      turnedL: false,
      turnedR: false,
      overL: false,
      overR: false,
      decision: {}
    };
  },
  computed: {
    ...mapGetters(['getDecisions', 'getValuesLevels']),
    displayCard() {
      return Boolean(this.getValuesLevels && this.decision.question);
    },
    displayLost() {
      return Boolean(this.decision.question && !this.displayCard);
    },
    displayWon() {
      return Boolean(this.getValuesLevels && !this.displayCard);
    }
  },
  watch: {
    turnedL() {
      if (this.turnedL) {
        gsap.to('.card', { rotate: -15, x: -30, duration: 1 });
      }
    },
    turnedR() {
      if (this.turnedR) {
        gsap.to('.card', { rotate: 15, x: 30, duration: 1 });
      }
    },
    overL() {
      if (this.overL) {
        this.turnedL = false;
        this.turnedR = false;
        this.overL = false;
        this.overR = false;
        const tl = gsap.timeline();
        tl.to('.card', { rotate: -40, x: -90, y: 500, opacity: 0, duration: 0.7, ease: 'power4 out' });
        tl.to('.card', { rotate: 0, x: 0, duration: 0.3 });
        tl.to('.card', { y: 0, opacity: 1, duration: 0.7, ease: 'power4 out' });
        this.changeValues(this.decision.option1);
        this.deleteDecision(this.decision);
        this.decision = this.getDecisions[Math.floor(Math.random() * this.getDecisions.length)];
        if (!this.decision) {
          this.decision = {};
          document.querySelectorAll('.gameEnd').forEach(e => e.classList.toggle('gameEnd'));
        }
        if (!this.getValuesLevels) {
          document.querySelectorAll('.gameEnd').forEach(e => e.classList.toggle('gameEnd'));
        }
      }
    },
    overR() {
      if (this.overR) {
        this.turnedL = false;
        this.turnedR = false;
        this.overL = false;
        this.overR = false;
        const tl = gsap.timeline();
        tl.to('.card', { rotate: 40, x: 90, y: 500, opacity: 0, duration: 0.7, ease: 'power4 out' });
        tl.to('.card', { rotate: 0, x: 0, duration: 0.3 });
        tl.to('.card', { y: 0, opacity: 1, duration: 0.7, ease: 'power4 out' });
        this.changeValues(this.decision.option2);
        this.deleteDecision(this.decision);
        this.decision = this.getDecisions[Math.floor(Math.random() * this.getDecisions.length)];
        if (!this.decision) {
          this.decision = {};
          document.querySelectorAll('.gameEnd').forEach(e => e.classList.toggle('gameEnd'));
        }
        if (!this.getValuesLevels) {
          document.querySelectorAll('.gameEnd').forEach(e => e.classList.toggle('gameEnd'));
        }
      }
    }
  },
  mounted() {
    this.decision = this.getDecisions[Math.floor(Math.random() * this.getDecisions.length)];
    document.querySelector('.card').focus();
  },
  methods: {
    dragDown(e) {
      this.clicked = true;
      this.mouseStart = e.clientX;
    },
    dragUp(e) {
      if (this.clicked && e.clientX - this.mouseStart > 30) {
        if (this.turnedR) {
          this.overR = true;
        } else {
          this.turnedR = true;
          this.turnedL = false;
        }
      } else if (this.clicked && e.clientX - this.mouseStart < -30) {
        if (this.turnedL) {
          this.overL = true;
        } else {
          this.turnedL = true;
          this.turnedR = false;
        }
      }
      this.clicked = false;
    },
    dragKey(e) {
      if (e.key === 'ArrowRight') {
        if (this.turnedR) {
          this.overR = true;
        } else {
          this.turnedR = true;
          this.turnedL = false;
        }
      } else if (e.key === 'ArrowLeft') {
        if (this.turnedL) {
          this.overL = true;
        } else {
          this.turnedL = true;
          this.turnedR = false;
        }
      }
    },
    mobileStart(e) {
      this.touchStart = e.touches[0].pageX;
    },
    mobileMove(e) {
      this.touchEnd = e.touches[0].pageX;
    },
    mobileEnd() {
      if (this.touchEnd - this.touchStart > 15) {
        if (this.turnedR) {
          this.overR = true;
        } else {
          this.turnedR = true;
          this.turnedL = false;
        }
      } else if (this.touchEnd - this.touchStart < -15) {
        if (this.turnedL) {
          this.overL = true;
        } else {
          this.turnedL = true;
          this.turnedR = false;
        }
      }
    },
    returnFocus() {
      document.querySelector('.card').focus();
    },
    ...mapActions(['changeValues', 'deleteDecision'])
  }
};
</script>
