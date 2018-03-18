<template>
  <input
    class="new-todo"
    placeholder="What needs to be done?"
    autofocus
    v-model="value"
    @keyup.enter="addItem"
  >
</template>

<script>
import { mapActions, mapMutations } from "vuex";

import { ACTIONS, MUTATIONS } from "../../store/module-todos";

export default {
  data() {
    return {
      value: ""
    };
  },

  methods: {
    ...mapActions("todos", {
      load: ACTIONS.LOAD
    }),

    ...mapMutations("todos", {
      add: MUTATIONS.ADD
    }),

    addItem() {
      this.add(this.value);
      this.value = "";
    }
  },

  mounted() {
    this.load();
  }
};
</script>
