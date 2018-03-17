<template>
  <section
    class="main"
    v-if="keys.length > 0"
  >
    <input
      id="toggle-all"
      class="toggle-all"
      type="checkbox"
      :checked="isAllChacked"
      @change="checkAll($event.target.checked)"
    >
    <label for="toggle-all">
      Mark all as complete
    </label>
    <ul class="todo-list">
      <li
        v-for="(item, id) in todos"
        :class="{
          'editing': editingId === id,
          'completed': item.checked
        }"
        :key="id"
      >
        <input
          class="edit"
          v-if="editingId === id"
          v-focus="editingId === id"
          :value="item.text"
          @blur="editingId = undefined"
          @input="edit(id, $event.target.value)"
          @keypress.enter="editingId = undefined"
        />
        <div
          class="view"
          v-else
          @dblclick="editingId = id"
        >
          <input
            class="toggle"
            type="checkbox"
            :checked="item.checked"
            @change="check(id, $event.target.checked)"
          >
          <label>{{ item.text }}</label>
          <button
            class="destroy"
            @click="remove(id)"
          />
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

import Focus from "../directives/focus";
import { ACTIONS, GETTERS, MUTATIONS } from "../store/module-todos";

export default {
  directives: { Focus },

  data() {
    return {
      editingId: undefined
    };
  },

  computed: {
    ...mapGetters("todos", {
      todos: GETTERS.TODOS
    }),

    isAllChacked() {
      return Object.values(this.todos).every(t => t.checked);
    },

    keys() {
      return Object.keys(this.todos);
    }
  },

  methods: {
    ...mapActions("todos", {
      load: ACTIONS.LOAD
    }),

    ...mapMutations("todos", {
      modify: MUTATIONS.MODIFY,
      remove: MUTATIONS.REMOVE
    }),

    check(id, value) {
      this.modify({ id, modification: { checked: value } });
    },

    checkAll(value) {
      this.keys.forEach(id => this.check(id, value));
    },

    edit(id, text) {
      this.modify({ id, modification: { text } });
    }
  },

  mounted() {
    this.load();
  }
};
</script>
