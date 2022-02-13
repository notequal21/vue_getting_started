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
    <div ref="observer" class="observer"></div>
    <!-- <div class="page__wrapper">
      <div 
      v-for="pageNumber in totalPages" 
      class="page" 
      :class="{'page-current': page === pageNumber}" 
      :key="pageNumber"
      @click="setPage(pageNumber)">
        {{pageNumber}}
      </div>
    </div>  -->
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
      page: 1,
      limit: 10,
      totalPages: 0,
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
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`, {
          params: {
            _page: this.page,
            _limit: this.limit,
          }
        })
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = response.data
        this.isPostsLoading = false
      } catch (e) {
        alert('ERROR')
      } 
    },
    async loadMorePosts() {
      try {
        this.page += 1
        // this.isPostsLoading = true
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`, {
          params: {
            _page: this.page,
            _limit: this.limit,
          }
        })
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = [...this.posts, ...response.data]
      } catch (e) {
        alert('ERROR')
      } finally {
        // this.isPostsLoading = false
      }
    },
    // setPage(pageNumber) {
    //   this.page = pageNumber
    // }
  },
  mounted() {
    this.fetchPosts()
    this.$refs.observer
    let options = {
      rootMargin: '0px',
      threshold: 1.0
    }
    let callback = (entries, observer) => {
      if (entries[0].isIntersecting && this.posts.length < this.totalPages) {
        this.loadMorePosts()
      }
    }
    let observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer)
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
  watch: {
    // page() {
    //   this.fetchPosts()
    // }
  }
}
</script>

<style lang="scss" scoped>
  .page {
    margin: 0 10px 0 0;
    cursor: pointer;
    &-current {
      font-size: 22px;
    }
    &__wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 20px 0 0 0;
    }
  }
  .observer {
    height: 30px;
    background-color: red;
  }
</style>