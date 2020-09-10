import CategoryResource from '@/api/category';

const categoryResource = new CategoryResource();

const state = {
  id: null,
  title: '',
  number_of_services: null,
  sort_id: null,
  services: [],
};

const mutations = {
  SET_ID: (state, id) => {
    state.id = id;
  },
  SET_TITLE: (state, title) => {
    state.title = title;
  },
  SET_NUMBER_OF_SERVICES: (state, number_of_services) => {
    state.number_of_services = number_of_services;
  },
  SET_SORT_ID: (state, sort_id) => {
    state.sort_id = sort_id;
  },
  SET_SERVICES: (state, services) => {
    state.services = services;
  },
};

const actions = {
  // get category
  get({ commit }, id) {
    return new Promise((resolve, reject) => {
      categoryResource.get(id)
        .then(response => {
          const { id, title, number_of_services, sort_id, services } = response.data.category;

          commit('SET_ID', id);
          commit('SET_TITLE', title);
          commit('SET_NUMBER_OF_SERVICES', number_of_services);
          commit('SET_SORT_ID', sort_id);
          commit('SET_SERVICES', services);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  setNumberOfServices({ commit }, number_of_services) {
    commit('SET_NUMBER_OF_SERVICES', number_of_services);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
