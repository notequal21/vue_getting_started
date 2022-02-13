<template>
  <div>
    <my-input v-model="searchQuery" placeholder="Search..."/>
    <my-select v-model="selectedSort" :options="sortOptions"/>
    <my-button @click="showModal">Create post</my-button>
    <my-modal v-model:show="modalActive">
      <post-form @create="createPost"/>
    </my-modal>
    <post-list v-if="!isPostsLoading" :posts="sortedAndSearchedPosts" @remove="removePost" />
    <div v-else>Loading ...</div>
  </div>
</template>

<script>
import PostForm from '@/components/PostForm'
import PostList from '@/components/PostList'
import axios from 'axios'
import MyButton from './components/UI/MyButton.vue'
import MySelect from './components/UI/MySelect.vue'
import MyInput from './components/UI/MyInput.vue'

export default {
  components: {
    PostForm,
    PostList,
    MyButton,
    MySelect,
    MyInput
},
  data() {
    return {
      posts: [],
      modalActive: false,
      isPostsLoading: false,
      selectedSort: '',
      searchQuery: '', 
      sortOptions: [
        {value: 'title', name: 'по названию'},
        {value: 'body', name: 'по содержиомому'}
      ]
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
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => {
        return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      })  
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  },
}
</script>

<style lang="scss" scoped>

</style>