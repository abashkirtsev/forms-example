import Vue from "vue";

import { getTodos, putTodos } from "../api/todos";

/*
 * Public
 */
export const GETTERS = {
  IS_CHANGED: "IS_CHANGED",
  IS_LOADED: "IS_LOADED",
  TODOS: "TODOS"
};
export const MUTATIONS = {
  ADD: "ADD",
  MODIFY: "MODIFY",
  REMOVE: "REMOVE",
  RESET_CHANGES: "RESET_CHANGES"
};
export const ACTIONS = {
  LOAD: "LOAD",
  SAVE: "SAVE"
};

/*
 * Private mutations
 */
const SET_LOADING = "P__SET_LOADING";
const SET_ORIGIN = "P__SET_ORIGIN";
const SET_SAVING = "P__SET_SAVING";

export default {
  namespaced: true,

  state: {
    changes: {},
    createdTodosCounter: 1,
    isLoading: false,
    isSaving: false,
    origin: null,
    originVersion: null
  },

  getters: {
    [GETTERS.IS_CHANGED](state) {
      return Object.keys(state.changes).length > 0;
    },

    [GETTERS.IS_LOADED](state) {
      return state.origin !== null;
    },

    [GETTERS.TODOS](state) {
      const result = Object.assign({}, state.origin, state.changes);
      return Object.entries(result)
        .filter(([, value]) => value !== undefined)
        .reduce((acc, [id, value]) => {
          acc[id] = value;
          return acc;
        }, {});
    }
  },

  mutations: {
    [MUTATIONS.ADD](state, text) {
      const localId = `new:${state.createdTodosCounter++}`;
      Vue.set(state.changes, localId, { text, checked: false });
    },

    [MUTATIONS.MODIFY](state, { id, modification }) {
      const origin = state.origin[id];
      const change = state.changes[id];

      if (origin === undefined && change === undefined) {
        return;
      }

      if (change === undefined) {
        Vue.set(state.changes, id, Object.assign({}, origin, modification));
        return;
      }

      Object.assign(change, modification);

      const isTodosEqual = (t1, t2) => {
        if (t1 === undefined && t2 === undefined) {
          return true;
        }

        if (t1 === undefined || t2 === undefined) {
          return false;
        }

        if (t1.text !== t2.text) {
          return false;
        }

        if (t1.checked !== t2.checked) {
          return false;
        }

        return true;
      };

      if (isTodosEqual(origin, change)) {
        Vue.delete(state.changes, id);
      } else {
        Vue.set(state.changes, id, change);
      }
    },

    [MUTATIONS.REMOVE](state, id) {
      if (state.origin[id] !== undefined) {
        Vue.set(state.changes, id, undefined);
        return;
      }

      Vue.delete(state.changes, id);
    },

    [MUTATIONS.RESET_CHANGES](state) {
      state.changes = {};
    },

    // private
    [SET_LOADING](state, value) {
      state.isLoading = value;
    },
    [SET_ORIGIN](state, { todos, version }) {
      state.changes = {};
      state.origin = todos;
      state.version = version;
    },
    [SET_SAVING](state, value) {
      state.isSaving = value;
    }
  },

  actions: {
    async [ACTIONS.LOAD]({ state, getters, commit }) {
      if (state.isLoading || getters[GETTERS.IS_LOADED]) {
        return;
      }

      commit(SET_LOADING, true);

      try {
        const { todos, version } = await getTodos();
        commit(SET_ORIGIN, { todos, version });
      } catch (error) {
        console.error(error);
      }

      commit(SET_LOADING, false);
    },

    async [ACTIONS.SAVE]({ state, getters, commit }) {
      if (state.isSaving || !getters[GETTERS.IS_CHANGED]) {
        return;
      }

      commit(SET_SAVING, true);

      try {
        const { todos, version } = await putTodos(
          getters[GETTERS.TODOS],
          state.originVersion
        );
        commit(SET_ORIGIN, { todos, version });
      } catch (error) {
        console.error(error);
      }

      commit(SET_SAVING, false);
    }
  }
};
