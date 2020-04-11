export default {
  values: (state, option) => {
    if (option.up === 'learning') {
      state.learning += 1;
    } else if (option.up === 'joy') {
      state.joy += 1;
    } else if (option.up === 'money') {
      state.money += 1;
    } else {
      state.sanity += 1;
    }

    if (option.down === 'learning') {
      state.learning -= 1;
    } else if (option.down === 'joy') {
      state.joy -= 1;
    } else if (option.down === 'money') {
      state.money -= 1;
    } else {
      state.sanity -= 1;
    }
  },
  delDecision: (state, decision) => (state.decisions = state.decisions.filter(val => val !== decision))
};
