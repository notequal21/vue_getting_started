<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'my-button',
}
</script>

<style lang="scss" scoped>
  .btn {
    cursor: pointer;
    border: 1px solid blueviolet;
  }
</style>