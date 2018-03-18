<template>
  <div id="app">
    <section class="todoapp">
      <VLoader v-if="isLoading || isSaving" />

      <header class="header">
        <h1>todos</h1>
        <BlockNew />
      </header>

      <BlockList />
      <BlockFooter />
    </section>

    <footer class="info">
      <p>Double-click to edit a todo</p>
    </footer>
  </div>
</template>

<script>
import { mapState } from "vuex";

import BlockFooter from "./components/block-footer";
import BlockList from "./components/block-list";
import BlockNew from "./components/block-new";
import VLoader from "./components/controls/loader";

export default {
  components: { BlockFooter, BlockList, BlockNew, VLoader },

  computed: mapState("todos", ["isLoading", "isSaving"])
};
</script>
