<template>
  <div>
    <my-input v-focus v-model="searchQuery" placeholder="Search..."/>
    <my-select v-model="selectedSort" :options="sortOptions"/>
    <my-button @click="showModal">Create post</my-button>
    <my-modal v-model:show="modalActive">
      <post-form />
    </my-modal>
    <post-list v-if="!isPostsLoading" :posts="sortedAndSearchedPosts" />
    <div v-else>Loading ...</div>
  </div>
</template>

<script>
import PostForm from '@/components/PostForm'
import PostList from '@/components/PostList'
import axios from 'axios'
import MyButton from '@/components/UI/MyButton.vue'
import MySelect from '@/components/UI/MySelect.vue'
import MyInput from '@/components/UI/MyInput.vue'
import {ref} from 'vue'
import { usePosts } from '../hooks/usePosts'
import useSortedPosts from '../hooks/useSortedPosts'
import useSortedAndSearchedPosts from '../hooks/useSortedAndSearchedPosts'

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
      sortOptions: [
        {value: 'title', name: 'по названию'},
        {value: 'body', name: 'по содержиомому'}
      ]
  }},
  setup(props) {
    const {posts, totalPages, isPostsLoading} = usePosts(10)
    const {sortedPosts, selectedSort} = useSortedPosts(posts)
    const {searchQuery, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts)

    return {
      posts, 
      totalPages,
      isPostsLoading,
      sortedPosts,
      selectedSort,
      searchQuery, 
      sortedAndSearchedPosts,
    }
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