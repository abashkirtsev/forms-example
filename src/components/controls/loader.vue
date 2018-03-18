<template>
  <div class="filler">
    <div class="indicator" />
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.filler {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0.9;
  background-color: white;
  z-index: 5;
}

.indicator {
  display: block;
  width: 2rem;
  height: 2rem;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 2rem;
  border-left: 2px solid #5dc2af;
  box-sizing: border-box;
  animation: rotation 1s infinite linear;
}

@keyframes rotation {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
