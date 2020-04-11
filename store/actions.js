export default {
  changeValues: ({ commit }, option) => commit('values', option),
  deleteDecision: ({ commit }, decision) => commit('delDecision', decision)
};
