<template>
  <div class="modal" v-if="show" @click.stop="closeModal">
    <!-- <div class="modal__bg" ></div> -->
    <div @click.stop class="modal-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import toggleMixin from "@/mixins/toggleMixin";

export default {
  name: 'my-modal',
  mixins: [toggleMixin]
}
</script>

<style lang="scss" scoped>
  .modal {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba($color: #000000, $alpha: 0.3);
    &-content {
      position: absolute;
      z-index: 1;
      top: 50%;
      left: 50%;
      min-width: 100px;
      min-height: 50px;
      transform: translate(-50%, -50%);
      padding: 25px;
      background-color: #fff;
    }
  }
</style>