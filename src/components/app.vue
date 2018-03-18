<template>
  <div id="app">
    <section class="todoapp">
      <VLoader v-if="isLoading || isSaving" />

      <header class="header">
        <h1>todos</h1>
        <TodoNew />
      </header>

      <TodoList />
      <TodoFooter />
    </section>

    <footer class="info">
      <p>Double-click to edit a todo</p>
    </footer>
  </div>
</template>

<script>
import { mapState } from "vuex";

import TodoFooter from "./blocks/todo-footer";
import TodoList from "./blocks/todo-list";
import TodoNew from "./blocks/todo-new";
import VLoader from "./controls/loader";

export default {
  components: { TodoFooter, TodoList, TodoNew, VLoader },

  computed: mapState("todos", ["isLoading", "isSaving"])
};
</script>
