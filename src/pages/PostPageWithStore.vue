<template>
  <div>
    <div>
      <my-button @click="$store.commit('incrementLikes')">Like</my-button>
      <my-button @click="$store.commit('decrementLikes')">Dislike</my-button>
    </div>
    <my-input v-focus :model-value="searchQuery" @update:model-value="setSearchQuery" placeholder="Search..."/>
    <my-select :model-value="selectedSort" @update:model-value="setSelectedSort" :options="sortOptions"/>
    <my-button @click="showModal">Create post</my-button>
    <my-modal v-model:show="modalActive">
      <post-form @create="createPost"/>
    </my-modal>
    <post-list v-if="!isPostsLoading" :posts="sortedAndSearchedPosts" @remove="removePost" />
    <div v-else>Loading ...</div>
    <div v-intersection="loadMorePosts" class="observer"></div>
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
import MyButton from '@/components/UI/MyButton.vue'
import MySelect from '@/components/UI/MySelect.vue'
import MyInput from '@/components/UI/MyInput.vue'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

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
      modalActive: false,
    }},
  methods: {
    ...mapMutations({
      setPage: 'post/setPgae',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort',
    }),
    ...mapActions({
      loadMorePosts: 'post/loadMorePosts',
      fetchPosts: 'post/fetchPosts',
    }),
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

    // setPage(pageNumber) {
    //   this.page = pageNumber
    // }
  },
  mounted() {
    this.fetchPosts()
    this.$refs.observer
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isPostsLoading: state => state.post.isPostsLoading,
      selectedSort: state => state.post.selectedSort,
      searchQuery: state => state.post.searchQuery,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages,
      sortOptions: state => state.post.sortOptions,
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts',
    })
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
    background-color: transparent;
  }
</style>