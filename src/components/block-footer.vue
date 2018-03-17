<template>
  <footer
    class="footer"
    v-if="totalItemsNumber > 0"
  >
    <span class="todo-count">
      <strong>{{ totalItemsNumber - completedItemIds.length }}</strong> item left
    </span>
    <button
      class="clear-completed"
      v-if="completedItemIds.length > 0"
      @click="clearCompleted"
    >
      Clear completed
    </button>
  </footer>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

import Focus from "../directives/focus";
import { ACTIONS, GETTERS, MUTATIONS } from "../store/module-todos";

export default {
  computed: {
    ...mapGetters("todos", {
      todos: GETTERS.TODOS
    }),

    completedItemIds() {
      return Object.entries(this.todos)
        .filter(([, value]) => value.checked)
        .map(([id]) => id);
    },

    totalItemsNumber() {
      return Object.keys(this.todos).length;
    }
  },

  methods: {
    ...mapActions("todos", {
      load: ACTIONS.LOAD
    }),

    ...mapMutations("todos", {
      remove: MUTATIONS.REMOVE
    }),

    clearCompleted() {
      this.completedItemIds.forEach(id => this.remove(id));
    }
  },

  mounted() {
    this.load();
  }
};
</script>
