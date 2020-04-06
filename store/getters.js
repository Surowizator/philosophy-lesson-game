export default {
  getDecision(state) {
    const index = Math.floor(Math.random() * state.decisions.length);
    return [state.decisions[index], index];
  }
};
