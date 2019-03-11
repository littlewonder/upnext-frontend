<template>
  <span class="loading">
      <span>.</span>
      <span>.</span>
      <span>.</span>
  </span>
</template>

<script>
export default {
    name: 'loading-ellipsis'
}
</script>


<style scoped>
/* https://codepen.io/xwildeyes/pen/KpqVzN?editors=0100#0 */
@keyframes blink {
  0% {
    opactiy: .2;
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: .2;
  }
}

.loading span {
  animation-name: blink;
  animation-duration: 1.4s;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  color: white;
  font-weight: bold;
  font-size: 2em;
}

.loading span:nth-child(2) {
  animation-delay: .2s
}

.loading span:nth-child(3) {
  animation-delay: .4s;
}
</style>
