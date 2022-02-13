<template>
  <nav class="nav">
    <my-button @click="$router.push('/')">To main</my-button>
    <my-button @click="$router.push('/posts')">To posts</my-button>
    <my-button @click="$router.push('/about')">To about</my-button>
    <my-button @click="$router.push('/store')">To posts with store</my-button>
    <my-button @click="$router.push('/composition')">To posts with composition API</my-button>
  </nav>
</template>

<script>
import MyButton from './UI/MyButton.vue'
export default {
  components: { MyButton },

}
</script>

<style lang="scss" scoped>

</style>