<template>
  <form @submit.prevent>
    <my-input v-model="post.title" placeholder="Post title"/>
    <my-input v-model="post.desc" placeholder="Post desc"/>
    <my-button @click="createPost">
      Create post
    </my-button>
  </form>
</template>

<script>
import MyInput from './UI/MyInput.vue'
export default {
  components: { MyInput },
  data() {
    return {
      post: {
        title: '',
        desc: '',
      }
    }},
  methods: {
    createPost() {
      this.post.id = Date.now()
      this.$emit('create', this.post)
      this.post = {
        title: '',
        desc: '',
      }
    }
  },
}
</script>

<style>

</style>