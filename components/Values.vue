<template>
  <div class="values">
    <div class="val">
      <img src="~assets/img/learning.svg" alt="książka" />
      <div id="learning" class="fill"></div>
    </div>
    <div class="val">
      <img src="~assets/img/joy.svg" alt="serce" />
      <div id="joy" class="fill"></div>
    </div>
    <div class="val">
      <img src="~assets/img/money.svg" alt="pieniądze" />
      <div id="money" class="fill"></div>
    </div>
    <div class="val">
      <img src="~assets/img/sanity.svg" alt="mózg" />
      <div id="sanity" class="fill"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { gsap } from 'gsap';

export default {
  name: 'Values',
  computed: mapGetters(['getLearning', 'getJoy', 'getMoney', 'getSanity']),
  watch: {
    getLearning() {
      gsap.to('#learning', { y: `${100 - this.getLearning * 20}%`, duration: 0.2 });
    },
    getJoy() {
      gsap.to('#joy', { y: `${100 - this.getJoy * 20}%`, duration: 0.2 });
    },
    getMoney() {
      gsap.to('#money', { y: `${100 - this.getMoney * 20}%`, duration: 0.2 });
    },
    getSanity() {
      gsap.to('#sanity', { y: `${100 - this.getSanity * 20}%`, duration: 0.2 });
    }
  },
  mounted() {
    document.querySelector('#learning').style.transform = `translateY(${100 - this.getLearning * 20}%`;
    document.querySelector('#joy').style.transform = `translateY(${100 - this.getLearning * 20}%`;
    document.querySelector('#money').style.transform = `translateY(${100 - this.getLearning * 20}%`;
    document.querySelector('#sanity').style.transform = `translateY(${100 - this.getLearning * 20}%`;
    document.querySelector('#learning').style.opacity = 1;
    document.querySelector('#joy').style.opacity = 1;
    document.querySelector('#money').style.opacity = 1;
    document.querySelector('#sanity').style.opacity = 1;
  }
};
</script>
