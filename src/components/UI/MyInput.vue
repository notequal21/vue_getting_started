<template>
  <input :value="modelValue" class="input" type="text" @input="updateInput">
</template>

<script>
export default {
  name: 'my-input',
  props: {
    modelValue: [String, Number]
  },
  methods: {
    updateInput(e) {
      this.$emit('update:modelValue', e.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
  .input {
    border: 1px solid blueviolet;
  }
</style>