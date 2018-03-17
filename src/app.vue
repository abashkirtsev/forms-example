<template>
  <div id="app">
    <section class="todoapp">
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
import BlockFooter from "./components/block-footer";
import BlockList from "./components/block-list";
import BlockNew from "./components/block-new";

export default {
  components: { BlockFooter, BlockList, BlockNew }
};
</script>
