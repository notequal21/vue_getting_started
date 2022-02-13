<template>
  <div>
    <my-button @click="showModal">Create post</my-button>
    <my-modal v-model:show="modalActive">
      <post-form @create="createPost"/>
    </my-modal>
    <post-list v-if="!isPostsLoading" :posts="posts" @remove="removePost" />
    <div v-else>Loading ...</div>
  </div>
</template>

<script>
import PostForm from '@/components/PostForm'
import PostList from '@/components/PostList'
import axios from 'axios'
import MyButton from './components/UI/MyButton.vue'

export default {
  components: {
    PostForm,
    PostList,
    MyButton
},
  data() {
    return {
      posts: [],
      modalActive: false,
      isPostsLoading: false,
    }},
  methods: {
    createPost(post) {
      this.posts.push(post)
      this.modalActive = false
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id) 
    },
    showModal() {
      this.modalActive = true
    },
    async fetchPosts() {
      try {
        this.isPostsLoading = true
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
        this.posts = response.data
        this.isPostsLoading = false
      } catch (e) {
        alert('ERROR')
      } 
    }
  },
  mounted() {
    this.fetchPosts()
  }
}
</script>

<style lang="scss" scoped>

</style>