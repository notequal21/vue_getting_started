<template>
  <div>
    <my-button @click="showModal">Create post</my-button>
    <my-modal v-model:show="modalActive">
      <post-form @create="createPost"/>
    </my-modal>
    <post-list :posts="posts" @remove="removePost" />
  </div>
</template>

<script>
import PostForm from '@/components/PostForm'
import PostList from '@/components/PostList'

export default {
  components: {
    PostForm, 
    PostList,
  },
  data() {
    return {
      posts: [
        {id: 0, title: 'Пост о JS #1', desc: 'lorem lorem lorem lorem lorem lorem'},
        {id: 1, title: 'Пост о JS #2', desc: 'lorem lorem lorem '},
        {id: 2, title: 'Пост о JS #3', desc: 'lorem lorem lorem lorem lorem lorem lorem lorem'},
      ],
      modalActive: false,
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
    }
  },
}
</script>

<style lang="scss" scoped>

</style>