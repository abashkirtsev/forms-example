<template>
  <footer class="footer">
    <span class="todo-count">
      <strong>{{ totalItemsNumber - completedItemIds.length }}</strong> item left
    </span>
    <button
      class="action reset"
      :disabled="!isChanged"
      @click="reset"
    >
      Reset
    </button>
    <button
      class="action save"
      :disabled="!isChanged"
      @click="save"
    >
      Save
    </button>
    <button
      class="action clear-completed"
      :disabled="completedItemIds.length === 0"
      @click="clearCompleted"
    >
      Clear completed
    </button>
  </footer>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

import { ACTIONS, GETTERS, MUTATIONS } from "../../store/module-todos";

export default {
  computed: {
    ...mapGetters("todos", {
      todos: GETTERS.TODOS,
      isChanged: GETTERS.IS_CHANGED
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
      load: ACTIONS.LOAD,
      save: ACTIONS.SAVE
    }),

    ...mapMutations("todos", {
      remove: MUTATIONS.REMOVE,
      reset: MUTATIONS.RESET_CHANGES
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

<style scoped>
.save,
.reset {
  position: relative;
  margin: 0 1rem;
  cursor: pointer;
}

.save:hover {
  text-decoration: underline;
  color: #5dc2af;
}

.reset:hover {
  text-decoration: underline;
  color: #af5b5e;
}

.action[disabled] {
  cursor: default;
  text-decoration: none;
  color: #d9d9d9;
}
</style>
