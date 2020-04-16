export default {
  getDecisions: state => state.decisions,
  getLearning: state => state.learning,
  getJoy: state => state.joy,
  getMoney: state => state.money,
  getSanity: state => state.sanity,
  getValuesLevels: ({ learning, joy, money, sanity }) => {
    if (learning < 6 && learning > 0 && joy < 6 && joy > 0 && money < 6 && money > 0 && sanity < 6 && sanity > 0) {
      return true;
    } else {
      return false;
    }
  }
};
