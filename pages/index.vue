<template>
  <div class="container">
    <Header />
    <Values />
    <Decide />
  </div>
</template>

<script>
import Header from '~/components/Header';
import Values from '~/components/Values';
import Decide from '~/components/Decide';

export default {
  components: {
    Header,
    Values,
    Decide
  }
};
</script>
